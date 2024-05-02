import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonPost() {
  return (
    <div className="space-y-2 p-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[300px]" />
        </div>
      </div>
      <Skeleton className="w-full h-40 rounded-md" />
    </div>
  );
}
