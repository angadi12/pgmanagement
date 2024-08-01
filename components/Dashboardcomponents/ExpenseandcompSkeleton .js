import React from "react";
import { Skeleton } from "@nextui-org/react";

const ExpenseandcompSkeleton = () => {
  return (
    <div className="flex w-full justify-center items-start h-full">
      <div className="flex flex-col gap-4 justify-start items-start w-full h-full">
      <div className="w-full flex justify-between items-center  ">
          <p className="text-sm font-bold">Expense Breakdown</p>
          <p className="text-sm font-bold ">Active Complaints</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-6 justify-center place-content-center items-start mx-auto w-full h-full ">
          <div className="flex flex-col gap-6 justify-between w-full h-full rounded-lg">
            <div>
              <Skeleton className="h-40 w-full rounded-lg" />
            </div>
            <div className="w-full h-full grid px-2 gap-2 py-2 grid-cols-2 justify-center place-content-center items-center mx-auto rounded-md ring-1 ring-gray-200">
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 justify-around items-start w-full h-full rounded-lg">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};


export default ExpenseandcompSkeleton 