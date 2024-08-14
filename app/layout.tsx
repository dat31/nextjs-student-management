import "@/app/ui/global.css";

import { jakarta } from "@/app/ui/fonts";
import { Metadata } from "next";
import Header from "./ui/header";
import NextAuthProvider from "./ui/next-auth-provider";
import Footer from "./ui/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} antialiased`}>
        <NextAuthProvider>
          <Header />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}

export const experimental_ppr = true;

export const metadata: Metadata = {
  title: {
    template: "%s | Da Nang Real Estate",
    default: "Da Nang Real Estate - Online real estate platform",
  },
  description: "Da Nang Real Estate",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
  keywords: [
    "real estate da nang",
    "da nang house",
    "da nang apartment",
    "da nang hotel",
  ],
};
