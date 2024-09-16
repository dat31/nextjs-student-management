import { getSignedUrl } from "@/app/lib/s3";
import { Prisma, PropertyType } from "@prisma/client";
import PropertyItem from "./property-item";
import prisma from "@/app/lib/prisma";
import dynamic from "next/dynamic";
import PropertyListSkeleton from "./property-list-sekeleton";

const PropertyListMobile = dynamic(() => import("./property-listing-mobile"), {
  ssr: false,
  loading: () => <PropertyListSkeleton />,
});

export default async function PropertyList({
  // type = PropertyType.APARTMENT,
  args = { take: 6 },
}: // isMobile = false /**TODO: HANDLE MOBILE */,
{
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
