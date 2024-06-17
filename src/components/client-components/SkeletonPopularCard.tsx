import { Skeleton } from '../ui/skeleton';

const SkeletonPopularCard = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-[150px]" />
        <Skeleton className="h-3 w-[100px]" />
      </div>
    </div>
  );
};

export default SkeletonPopularCard;
