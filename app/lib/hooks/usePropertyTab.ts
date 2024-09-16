import { TransactionType } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function usePropertyTabs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [activeTab, setActiveTab] = useState(
    () => searchParams.get("type") || TransactionType.RENT
  );

  const onTabChange = (tab: TransactionType) => {
    const params = new URLSearchParams();
    if (tab === searchParams.get("type")) {
      return;
    }
    setActiveTab(tab);
    params.set("type", tab);
    replace(`${pathname}?${params.toString()}`);
  };

  return { onTabChange, activeTab };
}

export const tabs = [
  { title: "Rent", value: TransactionType.RENT },
  { title: "Buy", value: TransactionType.BUY },
  { title: "Sell", value: TransactionType.SELL },
];
