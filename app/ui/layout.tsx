"use client";

import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => (
  <div className="container mx-auto py-12 xl:py-22">{children}</div>
);

export default Layout;
