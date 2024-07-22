import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import pglogo from "../../public/Loginasset/pglogo.png"
import { FaPhoneAlt } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

const Branchcard = ({data}) => {
  return (
    <div className="w-full boxshadow h-40 flex justify-between items-center p-3 rounded-md">
      <div className="h-full justify-between items-start flex flex-col">
        <div className="flex justify-start gap-2 items-start">
          <Image className="object-contain h-14 w-14" src={pglogo} alt="pglogo" />
          <div className="flex flex-col justify-start items-start ">
            <p className="font-bold text-lg capitalize">{data.Branchname}</p>
            <p className="flex items-center justify-start gap-2 text-xs text-gray-500"><FaLocationDot/>{data.Address}</p>
          </div>
        </div>

        <div className="flex justify-start items-center w-full gap-4 ">
          <div className="bg-[#E8EAF1] flex items-center gap-2 justify-center p-1 rounded-md">
            <p className="flex items-center text-xs font-semibold gap-2"><IoPeople/>1 Admin</p>
          </div>
          <div className="bg-[#E8EAF1] flex items-center gap-2 justify-center p-1 rounded-md">
            <p className="flex items-center text-xs font-semibold gap-2"><FaBed/>52 Tenants</p>
          </div>
        </div>
      </div>
      <div className="h-full justify-between items-start flex flex-col">
        <div className="flex justify-start items-center ">
          <p  className="flex items-center text-xs font-semibold gap-2 text-[#205093]"><FaPhoneAlt/>+91-{data.Number}</p>
        </div>
        <div>
          <Button className="bg-white ring-1 h-8 ring-[#025EFF] text-[#025EFF] text-sm font-bold rounded-sm">Manage Details</Button>
        </div>
      </div>
    </div>
  );
};

export default Branchcard;
