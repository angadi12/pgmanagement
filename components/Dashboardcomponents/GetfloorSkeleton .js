import React from 'react';
import { Skeleton, Divider } from "@nextui-org/react";

const GetfloorSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 justify-start items-start w-full h-full mt-2">
     <div className="w-full flex justify-between items-center  ">
          <p className="text-sm font-bold">Available Rooms</p>
          <p className="text-sm font-bold text-[#8B8B8B]">Floor 1</p>
        </div>
      <div className="grid grid-cols-1 mt-1 gap-6 justify-center place-content-center items-center mx-auto w-full">
        <div className="ring-1 ring-gray-300 w-full px-4 h-44 rounded-lg flex justify-around items-center gap-4">
          <div className="grid grid-cols-5 gap-3 items-start">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-12 rounded-md" />
            ))}
          </div>
          <Divider className="h-32" orientation="vertical" />
          <div className="flex flex-col justify-between items-start gap-4">
            <div className="flex flex-col justify-start items-start">
              <Skeleton className="h-5 w-24 rounded-lg" />
              <Skeleton className="h-4 w-20 mt-1 rounded-lg" />
            </div>
            <div className="flex flex-col justify-start items-start w-full gap-1">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-4 w-32 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetfloorSkeleton;
