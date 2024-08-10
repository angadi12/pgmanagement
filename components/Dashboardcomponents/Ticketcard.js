"use client";
import React, { useEffect, useState } from 'react'
import { fetchTicketsByBranch } from "@/lib/SupportSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoIosWarning } from "react-icons/io";
import {  Divider } from "@nextui-org/react";

const Ticketcard = () => {
    const dispatch = useDispatch();

    const { tickets } = useSelector((state) => state.tickets);
  
    const selectedBranchId = useSelector(
      (state) => state.branches.selectedBranchId
    );
  
    const [resolvedCount, setResolvedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);



    // useEffect(() => {
    //     dispatch(fetchTicketsByBranch(selectedBranchId));
    //   }, [selectedBranchId]);

      const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

      useEffect(() => {
        if (isValidObjectId(selectedBranchId)) {
          dispatch(fetchTicketsByBranch(selectedBranchId));
        }
      }, [selectedBranchId, dispatch]);

      useEffect(() => {
        if (tickets) {
          setResolvedCount(
            tickets?.filter((ticket) => ticket.status === "resolved").length
          );
          setPendingCount(
            tickets?.filter((ticket) => ticket.status === "pending").length
          );
        }
      }, [tickets]);
    
    
  return (
    <div className="boxshadow  rounded-lg flex md:justify-center lg:justify-center justify-between md:items-center lg:items-center items-start gap-2 py-4 px-4 md:px-0 lg:px-0 md:h-36 lg:h-36 md:flex-col lg:flex-col">
              <div className="h-14 w-14 rounded-full bg-[#FFA200] text-white flex justify-center items-center">
                <IoIosWarning size={24} />
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="flex gap-1 items-center">
                  <div className="flex flex-col justify-center items-center gap-1">
                    <p className="text-[0.6rem] font-semibold text-[#ED0000]">
                      Pending
                    </p>
                    <p className="font-bold text-xs">{pendingCount}</p>
                  </div>
                  <Divider className="h-6" orientation="vertical" />
                  <div className="flex flex-col justify-center items-center gap-1">
                    <p className="text-[0.6rem] font-semibold text-[#00A61C]">
                      Resolved
                    </p>
                    <p className="font-bold text-xs">{resolvedCount}</p>
                  </div>
                </div>
                <p className="md:text-xs lg:text-xs text-tiny font-semibold text-[#8B8B8B]">
                  Complaints Received
                </p>
              </div>
            </div>
  )
}

export default Ticketcard