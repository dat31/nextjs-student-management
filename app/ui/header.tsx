import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import { PropsWithChildren } from "react";
import Nav from "./nav";
import Drawer from "./drawer";

export default async function Header() {
  const session = await auth();
  return (
    <header className="bg-primary-light-3">
      <div className="container px-6 md:px-12 mx-auto h-17 md:h-24 flex justify-between items-center ">
        <nav className="px-0 flex items-center md:px-14 flex-1 gap-12">
          <Link href={"/"} className="font-bold text-xl">
            Da Nang Real Estate
          </Link>
          <Nav />
          <Drawer />
        </nav>
        <AuthForm>
          <button className="py-3 px-6 bg-primary font-bold text-base leading-[150%] text-[#ffffff]">
            {session ? "Sign out" : "Sign in"}
          </button>
        </AuthForm>
      </div>
    </header>
  );
}

async function AuthForm({ children }: PropsWithChildren) {
  const session = await auth();

  return (
    <form
      className="hidden md:block"
      action={async () => {
        "use server";
        if (session) {
          await signOut();
        } else {
          await signIn("auth0", { redirectTo: "/" });
        }
      }}
    >
      {children}
    </form>
  );
}
