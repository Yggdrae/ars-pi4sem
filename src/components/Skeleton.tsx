import React from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
}

export const Skeleton = ({
  width = "w-full",
  height = "h-4",
  rounded = "rounded-md",
  className = "",
}: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse bg-neutral-700/40 ${width} ${height} ${rounded} ${className}`}
    />
  );
};
