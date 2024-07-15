import React from "react";
import Revenueovr from "../Chartcomponent/Revenueovr";

const Revenueoverview = () => {
  return (
    <div className="flex w-full justify-center items-center  h-auto">
      <div className="flex flex-col gap-4 justify-start items-start w-full">
        <div className="w-full flex justify-between items-center  ">
          <p className="text-sm font-bold">Revenue Overview</p>
          <p className="text-sm font-bold text-[#8B8B8B]">Week</p>
        </div>
        <div className="grid grid-cols-1 gap-6 justify-start place-content-center items-start mx-auto w-full ">
          <Revenueovr />
        </div>
      </div>
    </div>
  );
};

export default Revenueoverview;
