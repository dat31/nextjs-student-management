import { PropsWithChildren } from "react";
import Layout from "../ui/layout/layout";

export default function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <Layout
      headline="Profile"
      description="Manage your account settings and set e-mail preferences."
    >
      {children}
    </Layout>
  );
}
