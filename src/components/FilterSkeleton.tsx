import React from "react";
import { Skeleton } from "./Skeleton";
import { VStack } from "./VStack";
import { HStack } from "./HStack";
import Card from "./Card";

export const FilterSkeleton = () => {
  return (
    <Card className="w-full md:w-1/3 lg:w-1/4 p-4 mb-6 md:mb-0">
      <HStack className="justify-between items-end mb-4">
        <Skeleton width="w-24" height="h-6" />
        <Skeleton width="w-16" height="h-6" />
      </HStack>

      <VStack className="gap-2 mb-4">
        <Skeleton width="w-28" height="h-4" />
        <HStack className="flex-wrap gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} width="w-12" height="h-8" />
          ))}
        </HStack>
      </VStack>

      <VStack className="gap-2 mb-4">
        <Skeleton width="w-20" height="h-4" />
        <HStack className="flex-wrap gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} width="w-12" height="h-8" />
          ))}
        </HStack>
      </VStack>

      <VStack className="gap-2">
        <Skeleton width="w-24" height="h-4" />
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} width="w-full" height="h-10" rounded="rounded-lg" />
        ))}
      </VStack>
    </Card>
  );
};
