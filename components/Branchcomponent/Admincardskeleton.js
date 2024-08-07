"use client";
import { Skeleton, Card } from "@nextui-org/react";
import React from "react";

const Admincardskeleton = () => {
  return (
    <Card className="w-full relative h-full rounded-md flex flex-col justify-center  items-center p-4 overflow-visible">
      <Skeleton className="rounded-full mx-auto -mt-16 w-24 h-24 mb-4"></Skeleton>

      <Skeleton className="mb-2 h-4 w-11/12"></Skeleton>
      <Skeleton className="mb-2 h-4 w-11/12"></Skeleton>
      <Skeleton className="mb-2 h-6 w-20 rounded-full"></Skeleton>

      <Skeleton className="space-y-4 w-full h-20"></Skeleton>

      <Skeleton className="w-full h-10 space-y-2 "></Skeleton>
    </Card>
  );
};

export default Admincardskeleton;
