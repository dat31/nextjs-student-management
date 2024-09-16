import { Suspense } from "react";
import PropertyListSkeleton from "@/app/ui/landing/property-listing-section/property-list-sekeleton";
import Filter from "@/app/ui/property/filter";

export default function Loading() {
  return (
    <>
      <Suspense>
        <Filter />
      </Suspense>
      <PropertyListSkeleton />
    </>
  );
}
