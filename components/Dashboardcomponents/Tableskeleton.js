import React from "react";
import {Card, Skeleton} from "@nextui-org/react";

const Tableskeleton = () => {
  return (
    <div className="flex w-full justify-start items-start  h-auto">
    <div className="flex flex-col gap-2 justify-start items-start w-full">
      <div className="w-full flex justify-between items-center  ">
      <p className="text-sm font-bold">Tenant Status</p>
      <p className="text-sm font-bold text-[#8B8B8B]"></p>
      </div>
      <div className="flex flex-col justify-start items-start w-full  ">
        <Skeleton className="w-full flex justify-between items-center h-14  p-2 rounded-t-md ">
        {/* <Skeleton className="w-20 h-8 rounded-sm bg-[#205093]" />
        <Skeleton className="w-20 h-8 rounded-sm bg-[#205093]" /> */}
        </Skeleton>
        <div className="w-full flex flex-col gap-2 h-80 rounded-b-md boxshadow mx-auto">
        <Skeleton className="w-11/12 h-8 mt-4 mx-auto rounded-md" />
        <Skeleton className="w-11/12 h-8  mx-auto rounded-md" />
        <Skeleton className="w-11/12 h-8  mx-auto rounded-md" />
        <Skeleton className="w-11/12 h-8  mx-auto rounded-md" />
        <Skeleton className="w-11/12 h-8  mx-auto rounded-md" />
        <Skeleton className="w-11/12 h-8  mx-auto rounded-md" />
          <div className="flex justify-center items-center w-full mt-2">
          <Skeleton className="w-24 h-8  mx-auto rounded-md" />

          </div>
        </div>
      </div>
    </div>
  </div>

  );
};

export default Tableskeleton;
