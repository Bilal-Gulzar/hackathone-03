import React from 'react'
import { Skeleton } from '../ui/skeleton';

export default function SearchSkeleton() {
  return (
      <div className="absolute flex gap-2 items-center top-12 left-0 w-full p-2  shadow-lg bg-white z-10  ">
        <Skeleton className="size-12 shrink-0" />
        <div className="flex flex-col w-full gap-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-[60%] h-4" />
        </div>
    </div>
  );
}
