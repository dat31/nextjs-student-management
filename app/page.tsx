import Hero from "@/app/ui/landing/hero";
import BenefitsSection from "@/app/ui/landing/benefit-section";
import ForTenantsAndLandlordsSection from "@/app/ui/landing/for-tenants-and-landlords-section";
import CTA from "@/app/ui/landing/cta";
import PropertyListingSection from "@/app/ui/landing/property-listing-section";
import { PropertyType } from "@prisma/client";

export default async function Page({
  searchParams: { type },
}: {
  searchParams: { type: PropertyType };
}) {
  return (
    <main>
      <Hero />
      <BenefitsSection />
      <PropertyListingSection type={type} />
      <ForTenantsAndLandlordsSection />
      <CTA />
    </main>
  );
}
