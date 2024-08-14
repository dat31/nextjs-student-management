import PropertyListSkeleton from "../../ui/landing/property-listing-section/property-list-sekeleton";
import Layout from "../../ui/layout";
import Filter from "../../ui/property/filter";

export default function Loading() {
  return (
    <div className="bg-gradient-to-b from-[#ffffff] to-primary-light-3">
      <Layout>
        <Filter />
        <PropertyListSkeleton />
      </Layout>
    </div>
  );
}
