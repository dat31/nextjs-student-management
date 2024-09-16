import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="relative aspect-video mb-4 skeleton" />
      <Skeleton className="h-8 mb-2 w-[50%]" />
      <Skeleton className="h-6 mb-8 w-[75%]" />
    </>
  );
}
