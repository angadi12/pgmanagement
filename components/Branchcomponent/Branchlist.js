import React from 'react'
import Branchcard from './Branchcard'
import { FaCirclePlus } from "react-icons/fa6";
import { Button } from '@nextui-org/react';

const Branchlist = () => {
  return (
    <div className='w-full grid grid-cols-2 justify-center items-center place-content-center mx-auto gap-6'>
        <Branchcard/>
        <Branchcard/>
        <Branchcard/>
        <Button className="w-full  h-40 flex justify-center ring-2 ring-[#205093] bg-[#B9D6FF59]  items-center p-3 rounded-md">
         <FaCirclePlus size={40} className='text-[#205093]'/>
    </Button>
    </div>
  )
}

export default Branchlist