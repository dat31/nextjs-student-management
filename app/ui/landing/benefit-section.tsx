import {
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  HomeIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";

type Benefit = {
  title: string;
  content: string;
  icon: ReactElement;
};

const benefits = [
  {
    title: "Property Insurance",
    content:
      "We offer our customer property protection of liability coverage and insurance for their better life.",
    icon: <HomeIcon />,
  },
  {
    title: "Best Price",
    content:
      "Not sure what  you should be charging for your property? No need to worry, let us do the numbers for you.",
    icon: <CurrencyDollarIcon />,
  },
  {
    title: "Lowest Commission",
    content:
      "You no longer have to negotiate commissions and haggle with other agents it only cost 2%!",
    icon: <ArrowTrendingDownIcon />,
  },
  {
    title: "Overall Control",
    content:
      "Get a virtual tour, and schedule visits before you rent or buy any properties. You get overall control.",
    icon: <MapPinIcon />,
  },
];

export default function BenefitsSection() {
  return (
    <section className="container mx-auto py-25 flex flex-col xl:flex-row gap-16">
      <div className="dark:bg-neutral-50 flex flex-col xl:flex-col lg:flex-row  bg-primary-light">
        <div className="p-10 pb-0">
          <p className="font-bold text-3xl mb-4 leading-[125%] tracking-[-1px]">
            The new way to find your new home
          </p>
          <p className="font-medium mb-8 text-base  leading-[160%]">
            Find your dream place to live in with more than 10k+ properties
            listed.
          </p>
          <Link
            className="py-2.5 bg-primary text-secondary px-4 text-sm font-bold leading-[140%]"
            href={"/property"}
          >
            Browse Properties
          </Link>
        </div>

        <div className="xl:w-104 xl:pl-14 md:mt-auto overflow-hidden">
          <Image
            priority
            src={"/assets/home.svg"}
            alt="The new way to find your new home"
            width={500}
            height={400}
            className="ml-auto w-auto h-auto"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-0 md:gap-x-6 gap-y-6 md:gap-y-16">
        {benefits.map((benefit, index) => (
          <BenefitItem {...benefit} key={index} />
        ))}
      </div>
    </section>
  );
}

function BenefitItem({ title, content, icon }: Benefit) {
  return (
    <div className="flex gap-6 flex-row md:flex-col">
      <div className="h-16 w-16 rounded-full bg-primary-light-2 shrink-0 p-4 text-black">
        {icon}
      </div>
      <div>
        <p className="font-bold text-2xl leading-[150%] mb-4">{title}</p>
        <p className="text-base font-normal leading-[160%] text-dark-gray">
          {content}
        </p>
      </div>
    </div>
  );
}
