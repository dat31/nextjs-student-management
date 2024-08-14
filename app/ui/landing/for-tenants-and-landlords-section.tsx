"use client";

import useEmblaCarousel from "embla-carousel-react";
import styles from "./landing.module.css";
import { HomeIcon, PaperClipIcon, PlayIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, ReactElement } from "react";

type Feature = {
  title: string;
  content: string;
  icon: ReactElement;
};

const features: Feature[] = [
  {
    title: "Virtual home tour",
    content:
      "You can communicate directly with landlords and we provide you with virtual tour before you buy or rent the property.",
    icon: <PlayIcon />,
  },
  {
    title: "Find the best deal",
    content:
      "Browse thousands of properties, save your favorites and set up search alerts so you don’t miss the best home deal!",
    icon: <HomeIcon />,
  },
  {
    title: "Get ready to apply",
    content:
      "Find your dream house? You just need to do a little to no effort and you can start move in to your new dream home!",
    icon: <PaperClipIcon />,
  },
];

const statsItems = [
  { number: "7.4%", text: "Property Return Rate" },
  { number: "3.856", text: "Property in Sell & Rent" },
  { number: "2.540", text: "Daily Completed Transactions" },
];

export default function ForTenantsAndLandlordsSection() {
  const [emblaRef] = useEmblaCarousel({});

  return (
    <section className="flex gap-16 flex-col py-25 pr-0">
      <div className="flex flex-col text-center md:text-left lg:flex-row justify-between container mx-auto gap-6 lg:gap-0">
        <div className="font-bold  text-3xl lg:text-4.5xl leading-[140%] w-full lg:w-[444px] lg:h-[112px]">
          <span>We make it easy for</span>{" "}
          <span className="text-primary">tenants</span> <span>and</span>{" "}
          <span className="text-primary">landlords.</span>
        </div>
        <p className="w-full lg:w-[406px] ">
          {`Whether it’s selling your current home, getting financing, or buying
        a new home, we make it easy and efficient. The best part? you’ll
        save a bunch of money and time with our services.`}
        </p>
      </div>
      <div className="container mx-auto pr-0 hidden md:block">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8">
            {features.map((feature, index) => (
              <FeatureItem key={index} index={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto gap-6 grid grid-cols-1 md:hidden">
        {features.map((feature, index) => (
          <FeatureItem key={index} index={index} {...feature} />
        ))}
      </div>
      <hr />
      <div className="container text-center mx-auto flex flex-col sm:flex-row gap-13 justify-center items-center">
        {statsItems.map((item, index) => (
          <Fragment key={index}>
            <StatsItem {...item} />
            {index < statsItems.length - 1 && <Divider />}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

function FeatureItem({
  index,
  title,
  content,
  icon,
}: { index: number } & Feature) {
  return (
    <div
      className={"p-8 flex flex-col md:flex-row gap-6 cursor-pointer ".concat(
        styles.slide
      )}
    >
      <div
        className={clsx(
          "w-16 h-16 p-4 rounded-full icon-wrapper flex-shrink-0 ",
          {
            "bg-secondary-dark": index === 0,
            "bg-primary-light-3 text-primary": index === 1,
            "bg-[#ffffff] text-primary": index === 2,
          }
        )}
      >
        {icon}
      </div>
      <div
        className={clsx({
          "text-black": index === 1,
        })}
      >
        <p className="mb-4 font-bold text-2xl leading-[150%]">{title}</p>
        <p className="text-base leading-[160%]">{content}</p>
      </div>
    </div>
  );
}

function StatsItem({ number, text }: { number: string; text: string }) {
  return (
    <div>
      <p className="font-bold text-4.5xl leading-[140%] mb-2">{number}</p>
      <p className="text-base font-medium leading-[160%]">{text}</p>
    </div>
  );
}

function Divider() {
  return (
    <>
      <hr className="w-16 block sm:hidden" />
      <div className="w-px h-16 hidden sm:block bg-[#ffffff] dark:bg-white my-auto" />
    </>
  );
}
