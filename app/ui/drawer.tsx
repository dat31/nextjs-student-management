"use client";

import * as React from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Drawer as ShadcnDrawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Drawer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <ShadcnDrawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className="ml-auto block md:hidden">
        <HamburgerMenuIcon />
      </DrawerTrigger>
      <DrawerContent className="rounded-none">
        <DrawerTitle></DrawerTitle>
        <DrawerDescription></DrawerDescription>
        <div className="w-full block md:hidden">
          <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
              <Link href={"/property/create"} legacyBehavior>
                <div>
                  <div className="text-base font-medium leading-none">
                    Sell property
                  </div>
                  <p className="line-clamp-2 leading-snug text-muted-foreground">
                    Easily sell your properties in few steps.
                  </p>
                </div>
              </Link>
            </li>
            <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
              <Link href={"/property"} legacyBehavior>
                <div>
                  <div className="text-base font-medium leading-none">
                    Search property
                  </div>
                  <p className="line-clamp-2 leading-snug text-muted-foreground">
                    Quickly find properties based on specific criteria.
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </DrawerContent>
    </ShadcnDrawer>
  );
}
