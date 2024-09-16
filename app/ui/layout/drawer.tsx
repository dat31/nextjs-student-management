import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, CreditCard, Home, Search } from "lucide-react";
import Link from "next/link";
import { ExitIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { auth, signOut } from "@/auth";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const userMenuItems: MenuItem[] = [
  {
    label: "Profile",
    href: "/profile",
    icon: <User className="mr-2 h-4 w-4" />,
  },
  {
    label: "Billing",
    href: "/billing",
    icon: <CreditCard className="mr-2 h-4 w-4" />,
  },
];

const propertyMenuItems: MenuItem[] = [
  {
    label: "Create Property",
    href: "/property/create",
    icon: <Home className="mr-2 h-4 w-4" />,
  },
  {
    label: "Search Property",
    href: "/property",
    icon: <Search className="mr-2 h-4 w-4" />,
  },
];

export default async function DrawerMenu() {
  const { user } = (await auth()) || {};

  return (
    <Sheet>
      <SheetTrigger asChild className="block md:hidden">
        <HamburgerMenuIcon />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle />
          <SheetDescription />
        </SheetHeader>
        <div className="flex flex-col mt-4 gap-4">
          {user && (
            <>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={user?.image as string}
                    alt={user.name as string}
                  />
                  <AvatarFallback>
                    {(user.name as string).charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">User</h3>
                {userMenuItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center py-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <form
                    action={async () => {
                      "use server";
                      console.log("call server action");
                      await signOut();
                    }}
                  >
                    <Button
                      type="submit"
                      variant={"ghost"}
                      className="px-0 py-2 text-muted-foreground justify-start flex items-center w-full"
                    >
                      <ExitIcon className="mr-2 h-4 w-4" />
                      <p>Logout</p>
                    </Button>
                  </form>
                </SheetClose>
              </div>
            </>
          )}
          <div>
            <h3 className="mb-2 text-sm font-semibold">Property</h3>
            {propertyMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
