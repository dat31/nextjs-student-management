"use client";

import usePropertyTabs, { tabs } from "@/app/lib/hooks/usePropertyTab";
import {
  CurrencyDollarIcon,
  HomeIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { TransactionType } from "@prisma/client";
import clsx from "clsx";

const iconMap = {
  [TransactionType.BUY]: CurrencyDollarIcon,
  [TransactionType.RENT]: KeyIcon,
  [TransactionType.SELL]: HomeIcon,
};

export default function PropertyTypeTab() {
  const { activeTab, onTabChange } = usePropertyTabs();

  return (
    <div className="h-16 mb-12 inline-flex gap-2 self-start p-2 bg-primary-light-3">
      {tabs.map((tab) => (
        <TabItem
          tab={tab}
          key={tab.value}
          isActive={activeTab === tab.value}
          onClick={onTabChange}
        />
      ))}
    </div>
  );
}

function TabItem({
  onClick,
  isActive,
  tab: { title, value },
}: {
  onClick: (tab: TransactionType) => void;
  isActive: boolean;
  tab: {
    title: string;
    value: TransactionType;
  };
}) {
  const Icon = iconMap[value as TransactionType];
  return (
    <div
      onClick={() => onClick(value as TransactionType)}
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
