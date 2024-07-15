import React from "react";
import { IoPeople } from "react-icons/io5";
import { FaB, FaBed } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { Button, Divider } from "@nextui-org/react";
import { FaCircle } from "react-icons/fa6";

const Overallstatus = () => {
  return (
    <div className="flex flex-col gap-4 w-full justify-start items-start  h-auto">
      <div className="flex flex-col gap-2 justify-center items-center w-full">
        <div className="w-full flex justify-between items-center  ">
          <p className="text-sm font-bold">Overall Status</p>
          <p className="text-sm font-bold text-[#16C133]">Live</p>
        </div>
        <div className="grid grid-cols-3 gap-6 justify-around items-center mx-auto w-full ">
          <div className="boxshadow  rounded-lg flex justify-center items-center gap-2 py-4 h-36 flex-col">
            <div className="h-14 w-14 rounded-full bg-[#205093] text-white flex justify-center items-center">
              <IoPeople size={24} />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold">72</p>
              <p className="text-xs font-semibold text-[#8B8B8B]">
                Total Tenants
              </p>
            </div>
          </div>
          <div className="boxshadow rounded-lg flex justify-center items-center gap-2 py-4 h-36 flex-col">
            <div className="h-14 w-14 rounded-full bg-[#1B9D31] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold">72</p>
              <p className="text-xs font-semibold text-[#8B8B8B]">
                Vacant Beds
              </p>
            </div>
          </div>
          <div className="boxshadow rounded-lg flex justify-center items-center gap-2 py-4 h-36 flex-col">
            <div className="h-14 w-14 rounded-full bg-[#FFA200] text-white flex justify-center items-center">
              <IoIosWarning size={24} />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex gap-1 items-center">
                <div className="flex flex-col justify-center items-center gap-1">
                  <p className="text-[0.6rem] font-semibold text-[#ED0000]">
                    Pending
                  </p>
                  <p className="font-bold text-xs">12</p>
                </div>
                <Divider className="h-6" orientation="vertical" />
                <div className="flex flex-col justify-center items-center gap-1">
                  <p className="text-[0.6rem] font-semibold text-[#00A61C]">
                    Resolved
                  </p>
                  <p className="font-bold text-xs">12</p>
                </div>
              </div>
              <p className="text-xs font-semibold text-[#8B8B8B]">
                Complaints Received
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-start items-start w-full">
        <div className="w-full flex justify-between items-center  ">
          <p className="text-sm font-bold">Available Rooms</p>
          <p className="text-sm font-bold text-[#8B8B8B]">Floor 1</p>
        </div>
        <div className="grid grid-cols-1 gap-6 justify-center place-content-center items-center mx-auto w-full ">
          <div className="ring-1 ring-gray-300  w-full px-4 h-44 rounded-lg flex justify-around items-center gap-4">
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
            <Divider className="h-32" orientation="vertical" />
            <div className="flex flex-col justify-between items-start gap-4">
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
      </div>
    </div>
  );
};

export default Overallstatus;
