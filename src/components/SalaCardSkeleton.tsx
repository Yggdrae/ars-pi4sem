
import { Skeleton } from "./Skeleton";
import { VStack } from "./VStack";

export const SalaCardSkeleton = () => {
  return (
    <VStack className="w-full sm:w-[48%] lg:w-[40%] xl:w-[32%] max-h-[50vh] p-4 rounded-2xl bg-[#2A2A2A] border border-content-primary/20">
      <Skeleton height="h-56 sm:h-64" width="w-full" />
      <VStack className="mt-4 gap-2">
        <Skeleton height="h-5" width="w-2/3" />
        <Skeleton height="h-4" width="w-1/2" />
        <div className="flex gap-2">
          <Skeleton height="h-6" width="w-20" />
          <Skeleton height="h-6" width="w-24" />
        </div>
        <Skeleton height="h-10" width="w-full" rounded="rounded-full" />
      </VStack>
    </VStack>
  );
};
