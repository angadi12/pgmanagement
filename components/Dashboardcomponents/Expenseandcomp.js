import React from "react";
import electricity from "../../public/Loginasset/electricity.png";
import Circle from "../../public/Loginasset/Circle.png";
import wifi from "../../public/Loginasset/wifi.png";
import water from "../../public/Loginasset/water.png";
import Expensebreak from "../Chartcomponent/Expensebreak";
import Image from "next/image";
import { FaCircle } from "react-icons/fa6";

const Expenseandcomp = () => {
  return (
    <div className="flex w-full justify-center items-start  h-full">
      <div className="flex flex-col gap-4 justify-start items-start w-full h-full">
        <div className="w-full flex justify-between items-center  ">
          <p className="text-sm font-bold">Expense Breakdown</p>
          <p className="text-sm font-bold ">Active Complaints</p>
        </div>
        <div className="grid grid-cols-2 gap-6 justify-center place-content-center items-start mx-auto w-full h-full ">
          <div className=" flex flex-col gap-6 justify-between   w-full h-full rounded-lg">
            <div>
              <Expensebreak />
            </div>
            <div className="w-full h-full grid px-4 py-2 grid-cols-2 justify-center place-content-center items-center mx-auto  rounded-md ring-1 ring-gray-200">
              <div className="flex flex-col justify-start items-start w-full">
                <p className="flex gap-1 items-center text-xs ">
                  <FaCircle className="text-[#0096FF]" /> Water Bill
                </p>
                <p className="text-[#0096FF] text-[0.5rem]">Rs/- 3000</p>
              </div>
              <div className="flex flex-col justify-start items-start">
                <p className="flex gap-1 items-center text-xs ">
                  <FaCircle className="text-[#FFA100]" />
                  Electricity Bill
                </p>
                <p className="text-[#FFA100] text-[0.5rem]">Rs/- 3000</p>
              </div>
              <div className="flex flex-col justify-start items-start">
                <p className="flex gap-1 items-center text-xs ">
                  <FaCircle className="text-[#ED6300]" /> Internet Bill
                </p>
                <p className="text-[##ED6300] text-[0.5rem]">Rs/- 3000</p>
              </div>
              <div className="flex flex-col justify-start items-start">
                <p className="flex gap-1 items-center text-xs ">
                  <FaCircle className="text-[#9747FF]" /> Gas Bill
                </p>
                <p className="text-[#9747FF] text-[0.5rem]">Rs/- 3000</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 justify-around items-start  w-full h-full  rounded-lg">
            <div className="w-full h-auto py-3 bg-[#FFA100]  rounded-md ring-1 ring-gray-200 flex justify-around items-center px-4">
              <div className=" w-14 h-14 rounded-full relative flex justify-center items-center ">
                <Image src={Circle} alt="cicle" />
                <Image
                  src={electricity}
                  alt="electricity"
                  className="absolute"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Room: A7</p>
                <p className="text-xs font-medium text-white">
                  Electrical Issue
                </p>
              </div>
            </div>
            <div className="w-full h-auto py-3 bg-[#0096FF]  rounded-md ring-1 ring-gray-200 flex justify-around items-center px-4">
              <div className=" w-14 h-14 rounded-full relative flex justify-center items-center ">
                <Image src={Circle} alt="cicle" />
                <Image src={water} alt="electricity" className="absolute" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Room: A7</p>
                <p className="text-xs font-medium text-white">Plumbing Issue</p>
              </div>
            </div>
            <div className="w-full h-auto py-3 bg-[#ED6300]  rounded-md ring-1 ring-gray-200 flex justify-around items-center px-4">
              <div className=" w-14 h-14 rounded-full relative flex justify-center items-center ">
                <Image src={Circle} alt="cicle" />
                <Image src={wifi} alt="electricity" className="absolute" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Room: A7</p>
                <p className="text-xs font-medium text-white">Internet Issue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenseandcomp;
