import { BuildingOffice2Icon, UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import heroImg from "public/assets/hero_img.webp";
import SearchProperty from "./search-property";

export default function Hero() {
  return (
    <div className="bg-gradient-to-b from-primary-light-2">
      <div className="hero-wrapper container mx-auto pt-12 xl:pt-22 lg:pr-0 flex flex-col lg:flex-row">
        <div className="flex flex-col justify-between grow lg:flex-none pb-12 mr-0 lg:w-126 xl:w-136 lg:mr-2">
          <div>
            <div className="mb-12 text-center md:text-left">
              <p className="font-bold text-4.5xl lg:text-5xl xl:text-7xl leading-[110%] tracking-[-1px]">
                Buy, rent, or sell your property easily
              </p>
              <p className="text-xl font-medium leading-[160%] mt-8 tracking-[-0.5px]">
                A great platform to buy, sell, or even rent your properties
                without any commisions.
              </p>
            </div>
            <SearchProperty />
          </div>

          <div className="flex md:gap-10 gap-8">
            <div>
              <div className="w-16 h-16 bg-primary-light-2 text-black rounded-full mb-6 flex items-center  justify-center">
                <UserIcon className="w-8 h-8" />
              </div>
              <p className="font-bold mb-1 text-xl md:text-2xl leading-[150%] text-primary">
                50k+ renters
              </p>
              <p className="md:text-medium text-sm leading-[150%]">
                believe in our service
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-primary-light-2 rounded-full text-black mb-6 flex items-center  justify-center">
                <BuildingOffice2Icon className="w-8 h-8" />
              </div>
              <p className="font-bold mb-1 text-xl md:text-2xl leading-[150%] text-primary ">
                10k+ properties
              </p>
              <p className="text-medium text-sm leading-[150%] hidden md:block">
                and house ready for occupancy
              </p>
              <p className="block md:hidden text-medium text-sm leading-[150%]">
                ready for occupancy
              </p>
            </div>
          </div>
        </div>

        <div className="h-[calc(100vh - 96px - 88px)] grow relative hidden lg:block">
          <Image
            placeholder="blur"
            sizes="(max-width: 1023px) 0vw, (min-width: 1024px) 50vw"
            className="object-cover"
            fill
            src={heroImg}
            priority
            alt="Hero image"
          />
        </div>
      </div>
    </div>
  );
}
