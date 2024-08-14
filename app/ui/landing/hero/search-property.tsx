"use client";

import { tabs } from "@/app/lib/hooks/usePropertyTab";
import { CalendarIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import "./hero.css";
import { PropertyType } from "@/app/lib/definitions";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { formatDateToLocal } from "@/app/lib/utils";
import { browserMoreProperties } from "@/app/lib/actions";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function SearchProperty() {
  const [activeTab, setActiveTab] = useState(PropertyType.RENT);
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="h-48 mb-5">
      <div className="flex sm:inline-flex bg-[#ffffff] justify-stretch w-full sm:w-[297px]">
        {tabs.map((tab) => (
          <TabItem
            isActive={tab === activeTab}
            key={tab}
            title={tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>
      <form
        action={browserMoreProperties}
        className="hidden md:flex py-6 pl-8 pr-5 items-center z-10 absolute bg-[#ffffff] gap-6 lg:gap-10"
      >
        <div className="w-[148px]">
          <label
            htmlFor="address"
            className="text-base font-medium mb-1 leading-[150%]"
          >
            Location
          </label>
          <input
            id="address"
            name="address"
            defaultValue={"Hoa Xuan"}
            className="font-bold text-0.5xl leading-[145%] px-0 w-full border-none border-transparent focus:border-transparent focus:ring-0 focus:outline-none"
          />
        </div>
        <div className="h-10 w-px bg-neutral-100 " />
        <div className="w-53">
          <p className="text-base font-medium mb-1 leading-[150%]">When</p>
          <div className="flex items-center">
            <p className="font-bold text-0.5xl leading-[145%]">
              {date
                ? formatDateToLocal(date?.toLocaleDateString())
                : "Select Move-in Date"}
            </p>
            <Popover>
              <PopoverTrigger asChild>
                <CalendarIcon className="ml-4 w-4 h-4 cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  initialFocus
                  selected={date}
                  onSelect={setDate}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="h-10 w-px bg-neutral-100" />
        <button
          type="submit"
          className="bg-primary text-[#ffffff] px-8 py-4 font-bold text-base"
        >
          Browse Properties
        </button>
      </form>
      <form
        action={browserMoreProperties}
        className="md:hidden p-4 flex gap-4 bg-[#ffffff]"
      >
        <input className="flex-grow" name="address" defaultValue={"Hoa Xuan"} />
        <button className="bg-primary h-12 w-12 flex items-center justify-center">
          <MagnifyingGlassIcon width={20} height={20} color="#ffffff" />
        </button>
      </form>
    </div>
  );
}

function TabItem({
  isActive,
  onClick,
  title,
}: {
  isActive: boolean;
  title: string;
  onClick: VoidFunction;
}) {
  return (
    <div
      className="cursor-pointer transition-all flex-auto sm:flex-none"
      onClick={onClick}
    >
      <p
        className={clsx(
          "mx-8 my-4 text-0.5xl text-center leading-[145%] text-black",
          isActive && "font-bold text-primary"
        )}
      >
        {title}
      </p>

      <div
        className={clsx(
          "h-[3px] bg-primary  w-full mt-auto transition-all",
          isActive ? "block" : "hidden"
        )}
      />
    </div>
  );
}
