"use client"
import React from 'react'
import { Avatar, AvatarGroup } from "@nextui-org/react";

const Categorycard = ({data}) => {
  return (
    <div className="boxshadow  rounded-lg flex justify-between items-center gap-2 py-4 h-44 w-50 flex-col">
    <div>
      <p className="font-semibold">{data?.name}</p>
    </div>
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="bg-[#205093] h-14 flex justify-center items-center px-4 rounded-full">
        <AvatarGroup isBordered max={3} total={10}>
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
        </AvatarGroup>
      </div>
      <p className="text-xs font-bold text-gray-400">{data?.Staff?.length}&nbsp;Staffs</p>
    </div>
  </div>
  )
}

export default Categorycard