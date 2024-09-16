import { PropsWithChildren } from "react";
import Breadcrumb from "./breadcrumb";
import { cn } from "@/app/lib/utils";

type Props = {
  headline?: string;
  description?: string;
  className?: string;
} & PropsWithChildren;

export default function Layout({
  children,
  headline,
  description,
  className,
}: Props) {
  return (
    <div className={cn("container mx-auto py-8 xl:py-16 flex-grow", className)}>
      <Breadcrumb />
      {headline && description && (
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{headline}</h1>
          <p className="text-base text-muted-foreground">{description}</p>
        </div>
      )}
      <div className="pt-16">{children}</div>
    </div>
  );
}
