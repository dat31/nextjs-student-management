import GradientBg from "@/app/ui/layout/gradient-bg";
import Layout from "@/app/ui/layout/layout";
import { PropsWithChildren } from "react";

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <GradientBg>
      <Layout>{children}</Layout>
    </GradientBg>
  );
}
