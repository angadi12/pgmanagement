"use client";
import React, { useEffect } from 'react';
import electricity2 from '../../public/Loginasset/electricity.png';
import water from '../../public/Loginasset/water.png';
import internet from '../../public/Loginasset/wifi.png';
import Circle from '../../public/Loginasset/Circle.png';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTicketsByStatus } from '../../lib/SupportSlice';
import Activecompleintske from './Activecompleintske';
import {useRouter} from "next/navigation"

const categoryImages = {
  Electricity: electricity2,
  Water: water,
  Internet: internet,
};

const categoryColors = {
  Electricity: '#FFA100',
  Water: '#0096FF',
  Internet: 'white',
};

const Activecomplaint = () => {
  const router=useRouter()
  const dispatch = useDispatch();
  const { tickets, status, error } = useSelector((state) => state.tickets);
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );

 

  if (status === 'loading') {
    return <Activecompleintske/>
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  if (!tickets || tickets.length === 0) {
    return <p className="grid grid-cols-1 gap-5 text-center p-5 mx-auto  w-full h-full rounded-lg boxshadow">No active complaints</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 justify-around items-start w-full h-full rounded-lg">
      {tickets.slice(0,3).map((ticket) => {
        const categoryImage = categoryImages[ticket.Categoery] || null;
        const categoryColor = categoryColors[ticket.Categoery] || '#7B00D0';

        return (
          <div
          onClick={()=>router.push("/Maintenance")}
            key={ticket._id}
            className="w-full h-auto overflow-hidden py-3 rounded-md ring-1 ring-gray-200 flex justify-around items-center px-4"
            style={{ backgroundColor: categoryColor }}
          >
            <div className="w-14 h-14 rounded-full relative flex justify-center items-center">
              <Image src={Circle} alt='Circle' />
              <Image className='absolute' src={categoryImage} alt={ticket.Categoery} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Room: {ticket.room}</p>
              <p className="text-xs font-medium text-white text-wrap">Ticket Name:&nbsp;{ticket.TicketName}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Activecomplaint;
