import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PropertyType } from "../definitions";

export default function usePropertyTabs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [activeTab, setActiveTab] = useState(
    () => searchParams.get("type") || PropertyType.RENT
  );

  const onTabChange = (tab: PropertyType) => {
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

export const tabs = [PropertyType.RENT, PropertyType.BUY, PropertyType.SELL];
