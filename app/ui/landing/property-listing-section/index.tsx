import SectionWrapper from "./section-wrapper";
import { Suspense } from "react";
import PropertyList from "./property-list";
import PropertyListSkeleton from "./property-list-sekeleton";
import { headers } from "next/headers";
import { PropertyType } from "@prisma/client";

export default function PropertyListingSection({
  type = PropertyType.APARTMENT,
}: {
  type: PropertyType;
}) {
  const ua = headers().get("user-agent") as string;
  const isMobile = Boolean(
    ua.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );
  return (
    <SectionWrapper>
      <Suspense key={type} fallback={<PropertyListSkeleton />}>
        <PropertyList type={type} isMobile={isMobile} />
      </Suspense>
    </SectionWrapper>
  );
}
