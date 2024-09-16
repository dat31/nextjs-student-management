import Link from "next/link";
import Drawer from "./drawer";
import Nav from "./nav";
import UserNav from "./user-nav";
import { Suspense } from "react";

export default function Header() {
  return (
    <header className="bg-primary-light-3">
      <div className="container  mx-auto h-17 md:h-24 flex justify-between items-center ">
        <nav className="px-0 flex items-center  flex-1 gap-12 justify-between md:justify-start">
          <Link href={"/"} className="font-bold text-xl">
            Da Nang Real Estate
          </Link>
          <Nav />
          <Suspense>
            <Drawer />
          </Suspense>
          <Suspense>
            <UserNav />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
