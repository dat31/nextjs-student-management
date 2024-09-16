"use client";

import { Links } from "@/app/lib/constants";
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function Breadcrumb() {
  const pathname = usePathname();

  function generateBreadcrumbs() {
    const [asPathWithoutQuery] = pathname.split("?");
    return asPathWithoutQuery
      .split("/")
      .filter((v) => v.length > 0)
      .map((_, idx, arr) => {
        const href = "/" + arr.slice(0, idx + 1).join("/");
        return href;
      });
  }

  // Call the function to generate the breadcrumbs list
  const links = generateBreadcrumbs();
  return (
    <ShadcnBreadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={Links.HOME}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {links.map((href, index) => {
          const isLastLink = index + 1 === links.length;
          const LinkComponent = isLastLink ? BreadcrumbPage : BreadcrumbLink;
          return (
            <Fragment key={href}>
              <BreadcrumbItem>
                <LinkComponent href={href}>
                  {mapLinkToTitle(href)}
                </LinkComponent>
              </BreadcrumbItem>
              {!isLastLink && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </ShadcnBreadcrumb>
  );
}

function mapLinkToTitle(link: string) {
  switch (link) {
    case Links.PROPERTY:
      return "Property";
    case Links.CREATE_PROPERTY:
      return "Create Property";
    case Links.PROFILE:
      return "Profile";
    case Links.DASHBOARD:
      return "Dashboard";
    default:
      return "Detail";
  }
}
