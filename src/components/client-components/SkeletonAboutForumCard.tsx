import { Skeleton } from "../ui/skeleton";

const SkeletonAboutForumCard = () => {
  return (
    <div className="space-y-2 p-4">
      <div className="flex items-center space-x-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[120px]" />
        </div>
      </div>
      <Skeleton className="w-full h-40 rounded-md" />
      <Skeleton className="h-8 w-20" />
    </div>
  );
}

export default SkeletonAboutForumCard