import React from 'react'
import { Button, Divider, Input } from "@nextui-org/react";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import Image from "next/image";
import bluecircle from "../../public/Loginasset/bluecircle.png"
import { MdCurrencyRupee } from "react-icons/md";

const Staffcomplaint = () => {
  return (
    <div className="w-full flex flex-col gap-4 justify-start items-start p-4 mx-auto bg-[#F9F9F9] h-auto mt-2 rounded-sm">
        <div className="flex  justify-between items-center bg-white w-full p-3">
          <div className="w-full flex justify-evenly gap-4 items-center">
            <div className="flex justify-center items-center gap-4">
              <div className="h-14 w-14 rounded-full relative flex justify-center items-center">
                <Image
                  src={bluecircle}
                  alt="electricity"
                  className=" h-14 w-14 object-contain"
                />
                <div  className="absolute ">
                 <MdCurrencyRupee size={24} className='text-white'/>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400">
                  #tenant-ID-6754
                </p>
                <p className="text-sm font-semibold ">Salary Issue</p>
              </div>
            </div>
            <Divider orientation="vertical" className="h-14" />

            <div className="flex flex-col">
              <p className="text-xs font-semibold text-gray-400">
               Name: <span className="text-black font-semibold">Mithul M</span>
              </p>
              <p className="text-xs font-semibold text-gray-400">
                Description:
                <span className="text-black font-semibold">
              My Salary is delayed.
                </span>
              </p>
            </div>
            <Divider orientation="vertical" className="h-14" />

            <div>
              <Chip
                variant="flat"
                radius="sm"
                className="bg-[#D3FFDA] text-[#1B9D31]"
              >
                Solved
              </Chip>
            </div>
            <Divider orientation="vertical" className="h-14" />
            <div>
              <Chip
                variant="flat"
                radius="sm"
                className="bg-[#FFDFDF] text-[#ED0000]"
              >
                Pending
              </Chip>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Staffcomplaint