"use client";

import { PropertyType } from "@/app/lib/definitions";
import usePropertyTabs, { tabs } from "@/app/lib/hooks/usePropertyTab";
import {
  CurrencyDollarIcon,
  HomeIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const iconMap = {
  [PropertyType.BUY]: CurrencyDollarIcon,
  [PropertyType.RENT]: KeyIcon,
  [PropertyType.SELL]: HomeIcon,
};

export default function PropertyTypeTab() {
  const { activeTab, onTabChange } = usePropertyTabs();

  return (
    <div className="h-16 mb-12 inline-flex gap-2 self-start p-2 bg-primary-light-3">
      {tabs.map((tab) => (
        <TabItem
          key={tab}
          isActive={activeTab === tab}
          title={tab}
          onClick={onTabChange}
        />
      ))}
    </div>
  );
}

function TabItem({
  title,
  onClick,
  isActive,
}: {
  title: string;
  onClick: (tab: PropertyType) => void;
  isActive: boolean;
}) {
  const Icon = iconMap[title as PropertyType];
  return (
    <div
      onClick={() => onClick(title as PropertyType)}
      className={clsx(
        "flex gap-2 w-[98px] justify-center md:w-[115px] items-center cursor-pointer transition-all",
        {
          "bg-[#ffffff] text-primary font-bold": isActive,
          "text-secondary-dark": !isActive,
        }
      )}
    >
      <Icon width={20} height={20} className="mr-2" />
      <p className={clsx("text-lg", {})}>{title}</p>
    </div>
  );
}
