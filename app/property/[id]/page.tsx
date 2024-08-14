import prisma from "@/app/lib/prisma";
import { getSignedUrl } from "@/app/lib/s3";
import Image from "next/image";
import { serialize } from "next-mdx-remote/serialize";
import { Article } from "../../ui/property/article";
import { notFound } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";
import PropertyList from "@/app/ui/landing/property-listing-section/property-list";
import { PropertyType } from "@/app/lib/definitions";
import { Suspense } from "react";
import PropertyListSkeleton from "@/app/ui/landing/property-listing-section/property-list-sekeleton";
import { REVALIDATE_SECS } from "@/app/lib/constants";
import Layout from "@/app/ui/layout";
import { Metadata, ResolvingMetadata } from "next";
import { Property } from "@prisma/client";

export default async function PropertyDetail({
  params,
}: {
  params: { id: string };
}) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: {
      creator: true,
    },
  });

  if (!property) {
    return notFound();
  }

  const {
    name,
    address,
    noBathrooms,
    noBeds,
    price,
    width,
    height,
    createdAt,
    creator: { name: creatorName, image },
  } = property;

  const [imageUrl, mdxSource] = await Promise.all([
    getSignedUrl(property?.imageUrl as string),
    getSignedUrl(property?.contentUrl as string)
      .then(fetch)
      .then((mdxRes) => mdxRes.text())
      .then(serialize),
  ]);

  return (
    <Layout>
      <div>
        <p className="font-bold mb text-4.5xl lg:text-5xl xl:text-7xl leading-[110%] tracking-[-1px] mb-4">
          {name}
        </p>
        <p className="font-medium text-xl mb-8">{address}</p>
      </div>

      <Image
        className="mb-6"
        height={800}
        width={1200}
        sizes="95vw"
        priority
        src={imageUrl}
        alt={property?.name as string}
      />

      <div className="mb-6 flex gap-4">
        <Image
          width={64}
          height={64}
          src={image as string}
          alt="Dealer image"
        />
        <div className="text-base md:text-xl font-medium">
          <p>Published by {creatorName}</p>
          <p>at {formatDateToLocal(createdAt.toISOString().split("T")[0])}</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap gap-6 mb-6">
          <PropertyFeature value={formatCurrency(price)} unit="/month" />
          <PropertyFeature value={`${width}x${height}`} unit="sq.ft." />
          <PropertyFeature value={noBeds.toString()} unit="Bed(s)" />
          <PropertyFeature value={noBathrooms.toString()} unit="Bathroom(s)" />
          <div className="bg-primary-light py-4 px-6 text-xl  md:text-2xl font-bold flex gap-2 items-center">
            <span>Parking</span>
            <CheckCircleIcon
              width={32}
              height={32}
              className="text-green-500"
            />
          </div>

          <div className="bg-primary-light py-4 px-6 text-xl md:text-2xl font-bold flex gap-2 items-center">
            <span>Pet</span>
            <CheckCircleIcon
              width={32}
              height={32}
              className="text-green-500"
            />
          </div>
        </div>
        <div className="flex gap-6"></div>
      </div>

      <Article {...mdxSource} />

      <div className="mb-4 md:mb-8 mt-16 font-bold text-2xl md:text-3xl leading-[140%] track-[-1px]">
        Explore more property
      </div>
      <Suspense key={"suspense"} fallback={<PropertyListSkeleton />}>
        <PropertyList
          type={PropertyType.BUY}
          args={{ take: 6, where: { id: { not: params.id } } }}
        />
      </Suspense>
    </Layout>
  );
}

function PropertyFeature({ value, unit }: { value: string; unit: string }) {
  return (
    <div className="bg-primary-light py-4 px-6">
      <span className="text-xl sm:text-2xl md:text-3xl font-bold mr-2">
        {value}
      </span>
      <span className="text-base sm:text-xl">{unit}</span>
    </div>
  );
}

// export async function generateStaticParams() {
//   const properties = await prisma.property.findMany({ take: 6 });
//   return properties.map(({ id }) => ({ id }));
// }

export async function generateMetadata(
  {
    params: { id },
  }: {
    params: { id: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const property = (await prisma.property.findUnique({
    where: { id },
  })) as Property;

  if (!property) {
    return {};
  }
  const { thumbnailUrl, name, address } = property;
  const ogImg = await getSignedUrl(thumbnailUrl);
  const keywords = (await parent).keywords || [];
  return {
    title: name,
    description: address,
    openGraph: {
      images: [ogImg],
    },
    keywords: keywords.concat(name),
  };
}

// export const revalidate = REVALIDATE_SECS; /**6h */
