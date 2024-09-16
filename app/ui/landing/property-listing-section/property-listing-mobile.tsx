"use client";

import useEmblaCarousel from "embla-carousel-react";
import { PropsWithChildren } from "react";

export default function PropertyListMobile({ children }: PropsWithChildren) {
  const [emblaRef] = useEmblaCarousel({});
  return (
    <div
      className="overflow-hidden block lg:hidden -mr-6 sm:mr-0"
      ref={emblaRef}
    >
      <div className="flex gap-4">{children}</div>
    </div>
  );
}
