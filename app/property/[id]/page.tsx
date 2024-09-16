import prisma from "@/app/lib/prisma";
import { getSignedUrl } from "@/app/lib/s3";
import { serialize } from "next-mdx-remote/serialize";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PropertyListSkeleton from "@/app/ui/landing/property-listing-section/property-list-sekeleton";
// import { REVALIDATE_SECS } from "@/app/lib/constants";
import { Metadata, ResolvingMetadata } from "next";
import { Property, PropertyType } from "@prisma/client";
import ContactForm from "@/app/ui/property/contact-form";
import dynamic from "next/dynamic";
import PropertyDetail from "@/app/ui/property/detail";

const PropertyList = dynamic(
  () => import("@/app/ui/landing/property-listing-section/property-list"),
  { loading: () => <PropertyListSkeleton /> }
);

export default async function PropertyDetailPage({
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

  const { name } = property;

  const [imageUrl, mdxSource] = await Promise.all([
    getSignedUrl(property?.imageUrl as string),
    ...(property?.contentUrl
      ? [
          getSignedUrl(property?.contentUrl as string)
            .then(fetch)
            .then((mdxRes) => mdxRes.text())
            .then(serialize),
        ]
      : []),
  ]);

  return (
    <>
      <PropertyDetail mdx={mdxSource} property={property} imageUrl={imageUrl}>
        <Suspense>
          <ContactForm propertyName={name} />
        </Suspense>
      </PropertyDetail>
      <div className="mb-4 md:mb-8 mt-16 font-bold text-2xl md:text-3xl leading-[140%] track-[-1px]">
        Explore more property
      </div>
      <Suspense key={"suspense"} fallback={<PropertyListSkeleton />}>
        <PropertyList
          type={PropertyType.APARTMENT}
          args={{ take: 6, where: { id: { not: params.id } } }}
        />
      </Suspense>
    </>
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
