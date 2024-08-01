import React, { useEffect, useState } from "react";
import { FaB, FaBed } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa6";
import { Divider } from "@nextui-org/react";
import GetfloorSkeleton from "./GetfloorSkeleton ";

const Getfloor = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>

   {loading ?<GetfloorSkeleton/> :<div className="flex flex-col gap-2 justify-start items-start w-full h-full mt-2">
      <div className="w-full flex justify-between items-center  ">
        <p className="text-sm font-bold">Available Rooms</p>
        <p className="text-sm font-bold text-[#8B8B8B]">Floor 1</p>
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-1 grid-rows-1 mt-1 gap-6 justify-center place-content-center items-center mx-auto w-full ">
        <div className="ring-1 ring-gray-300  w-full px-4 md:h-44 lg:h-44 h-60 rounded-lg flex flex-col md:flex-row lg:flex-row justify-around items-center gap-4">
          <div className=" grid grid-cols-5 gap-3 items-start">
            <div className="h-12 w-12 rounded-md bg-[#FFA200] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
            <div className="h-12 w-12 rounded-md bg-[#FFA200] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
            <div className="h-12 w-12 rounded-md bg-[#FFA200] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
            <div className="h-12 w-12 rounded-md bg-[#1B9D31] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
            <div className="h-12 w-12 rounded-md bg-[#FFA200] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
            <div className="h-12 w-12 rounded-md bg-[#1B9D31] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
            <div className="h-12 w-12 rounded-md bg-[#1B9D31] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
            <div className="h-12 w-12 rounded-md bg-[#FFA200] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
            <div className="h-12 w-12 rounded-md bg-[#ED0000] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
            <div className="h-12 w-12 rounded-md bg-[#ED0000] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
          </div>
          <Divider className="h-32 hidden md:flex lg:flex" orientation="vertical" />
          <div className="flex md:flex-col lg:flex-col flex-row justify-between items-start md:gap-4 lg:gap-4 w-full md:w-auto lg:w-auto ">
            <div className="flex flex-col justify-start items-start">
              <p className="font-semibold">Floor 1</p>
              <p className="text-xs text-[#787878] font-medium">
                Total Rooms: 10
              </p>
            </div>
            <div className="flex flex-col justify-start items-start w-full gap-1">
              <p className="flex justify-center items-center gap-1 text-xs font-semibold">
                <FaCircle className="text-[#1B9D31]" />
                Available: 3
              </p>
              <p className="flex justify-center items-center gap-1 text-xs font-semibold">
                <FaCircle className="text-[#FFA200]" />
                On hold: 5
              </p>
              <p className="flex justify-center items-center gap-1 text-xs font-semibold">
                <FaCircle className="text-[#ED0000]" />
                Occupied: 2
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>}

    </>
  );
};

export default Getfloor;
