import React from 'react'
import Admincard from './Admincard'
import { FaCirclePlus } from "react-icons/fa6";
import { Button } from '@nextui-org/react';

const Adminlist = () => {
  return (
    <div className='w-full mx-auto grid grid-cols-3 justify-center items-start place-content-center content-stretch gap-4 mt-20'>
     <Admincard/>
     <Admincard/>
     <Button className='w-full h-full bg-[#B9D6FF59] ring-2 ring-[#205093] rounded-md'>
     <FaCirclePlus size={50} className='text-[#205093]'/>
     </Button>
    </div>
  )
}

export default Adminlist