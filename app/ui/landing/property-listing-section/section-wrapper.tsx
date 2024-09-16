import { ReactElement } from "react";
import PropertyTypeTab from "./property-tab-type";
import Link from "next/link";

export default function SectionWrapper({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <div className="bg-gradient-to-b from-[#ffffff] to-primary-light-3">
      <section className="container mx-auto pt-20 pb-25">
        <p className="mb-4 font-bold text-4.5xl leading-[140%] text-center track-[-1px]">
          Based on your location
        </p>
        <p className="text-center text-base mb-12 md:mb-16">
          Some of our picked properties near your location
        </p>
        <PropertyTypeTab />
        {children}
        <div className="mt-12 flex justify-center">
          <Link
            className="text-center w-full sm:w-auto bg-primary py-4 px-8 text-secondary text-base font-bold leading-[150%]"
            href={"/property"}
          >
            Browse more properties
          </Link>
        </div>
      </section>
    </div>
  );
}
