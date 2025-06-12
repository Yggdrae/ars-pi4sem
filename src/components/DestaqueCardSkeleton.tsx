import React from "react";
import { Skeleton } from "./Skeleton";

interface Props {
  className?: string;
}

export const DestaqueCardSkeleton = ({ className = "" }: Props) => {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl bg-[#2A2A2A] text-[#FFFFFF] border border-content-primary/20 ${className}`}
    >
      {/* Imagem */}
      <div className="relative w-full h-56 sm:h-64">
        <Skeleton width="w-full" height="h-full" />
        <div className="absolute top-2 right-2">
          <Skeleton width="w-20" height="h-6" rounded="rounded-full" />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-grow p-5 gap-2">
        <Skeleton width="w-2/3" height="h-6" />
        <Skeleton width="w-1/2" height="h-4" />
        <div className="flex gap-2 overflow-x-auto mb-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} width="w-20" height="h-6" rounded="rounded-lg" />
          ))}
        </div>
        <Skeleton width="w-full" height="h-10" rounded="rounded-lg" />
      </div>
    </div>
  );
};
