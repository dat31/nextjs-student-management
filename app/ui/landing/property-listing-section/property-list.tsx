import Image from "next/image";
import styles from "../landing.module.css";
import PropertyListMobile from "./property-listing-mobile";
import { PropertyType } from "@/app/lib/definitions";
import Link from "next/link";
import prisma from "@/app/lib/prisma";
import { getSignedUrl } from "@/app/lib/s3";
import { Prisma, Property } from "@prisma/client";
import { formatCurrency } from "@/app/lib/utils";
import { PropsWithChildren } from "react";

export default async function PropertyList({
  type = PropertyType.RENT,
  args = { take: 6 },
  isMobile = false /**TODO: HANDLE MOBILE */,
}: {
  type: PropertyType;
  args?: Prisma.PropertyFindManyArgs;
  isMobile?: boolean;
}) {
  const response = await prisma.property.findMany(args);

  const properties = await Promise.all(
    response.map((property) =>
      getSignedUrl(property.thumbnailUrl).then((thumbnailUrl) => ({
        ...property,
        thumbnailUrl,
      }))
    )
  );

  const children = properties.map((property) => (
    <PropertyItem key={property.id} {...property} />
  ));

  return (
    <>
      <div className="grid-cols-3 gap-x-6 gap-y-8 hidden lg:grid">
        {children}
      </div>
      <PropertyListMobile>{children}</PropertyListMobile>
    </>
  );
}

export function PropertyItem({
  thumbnailUrl,
  price,
  id,
  width,
  height,
  noBathrooms,
  noBeds,
  name,
  address,
}: Property) {
  return (
    <article className={"bg-[#ffffff] ".concat(styles["property-item"])}>
      <Link href={`/property/${id}`}>
        <div className="w-full h-50 relative">
          <Image
            priority
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 33vw"
            className="object-cover"
            fill
            src={thumbnailUrl}
            alt={name}
          />
        </div>

        <div className="py-8 px-6">
          <span className="font-extrabold text-2xl leading-[150%] mr-1">
            {formatCurrency(price)}
          </span>
          <span className="font-medium leading-[150%]">/month</span>
          <p className="mb-2 font-bold text-2xl leading-[150%]">{name}</p>
          <p className="mb-4 truncate">{address}</p>
          <hr className="mb-4" />
          <div className="flex gap-4">
            <span>
              <span>{noBeds} Beds</span>
            </span>
            <span className="hidden lg:block">
              <span>{noBathrooms} Bathrooms</span>
            </span>
            <span>
              <span>{`${width}x${height}`} m²</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function PropertyListDesktop({ children }: PropsWithChildren) {
  return (
    <div className="grid-cols-3 gap-x-6 gap-y-8 hidden lg:grid">{children}</div>
  );
}
