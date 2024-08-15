"use client";
import React, { useEffect, useState } from "react";
import { IoPeople } from "react-icons/io5";
import { FaB, FaBed } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { Button, Divider } from "@nextui-org/react";
import { Card, Skeleton } from "@nextui-org/react";
import { FaCircle } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardData,
  fetchDashboardEarnings,
} from "../../lib/DashboardSlice";
import Getfloor from "./Getfloor";
import Ticketcard from "./Ticketcard";


const Overallstatus = () => {
  const dispatch = useDispatch();
  const { data, earnings, loading, error } = useSelector(
    (state) => state.dashboard
  );
  const { tenants } = useSelector((state) => state.tenants);

  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );

 

  useEffect(() => {
    dispatch(fetchDashboardData());
    dispatch(fetchDashboardEarnings());
  }, [dispatch, selectedBranchId]);

  

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col gap-4 w-full justify-start items-start  h-full">
      {loading ? (
        <div className="flex flex-col gap-2 justify-center items-center w-full">
          <div className="w-full flex justify-between items-center  ">
            <p className="text-sm font-bold">Overall Status</p>
            <p className="text-sm font-bold text-[#16C133]">Live</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-1 md:gap-6 lg:gap-6 gap-2 justify-around items-center mx-auto w-full ">
            <Card className="boxshadow  rounded-lg flex md:justify-center lg:justify-center justify-between md:items-center lg:items-center items-start gap-2 py-4 px-4 md:px-0 lg:px-0 md:h-36 lg:h-36 h-24 md:flex-col lg:flex-col">
              <Skeleton className="w-14 h-14 rounded-full" />
              <Skeleton className="w-12 h-2 mt-2" />
              <Skeleton className="w-3/4 h-2 mt-1" />
            </Card>
            <Card className="boxshadow  rounded-lg flex md:justify-center lg:justify-center justify-between md:items-center lg:items-center items-start gap-2 py-4 px-4 md:px-0 lg:px-0 md:h-36 lg:h-36 h-24 md:flex-col lg:flex-col">
              <Skeleton className="w-14 h-14 rounded-full" />
              <Skeleton className="w-12 h-2 mt-2" />
              <Skeleton className="w-3/4 h-2 mt-1" />
            </Card>
            <Card className="boxshadow  rounded-lg flex md:justify-center lg:justify-center justify-between md:items-center lg:items-center items-start gap-2 py-4 px-4 md:px-0 lg:px-0 md:h-36 lg:h-36 h-24 md:flex-col lg:flex-col">
              <Skeleton className="w-14 h-14 rounded-full" />
              <Skeleton className="w-12 h-2 mt-2" />
              <Skeleton className="w-3/4 h-2 mt-1" />
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 justify-center items-center w-full">
          <div className="w-full flex justify-between items-center  ">
            <p className="text-sm font-bold">Overall Status</p>
            <p className="text-sm font-bold text-[#16C133] flex items-center gap-1">
              <FaCircle
                size={5}
                className="animate-ping duration-1000 text-red-600"
              />
              Live
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-1 md:gap-6 lg:gap-6 gap-2 justify-around items-center mx-auto w-full ">
            <div className="boxshadow  rounded-lg flex md:justify-center lg:justify-center justify-between md:items-center lg:items-center items-start gap-2 py-4 px-4 md:px-0 lg:px-0 md:h-36 lg:h-36 md:flex-col lg:flex-col">
              <div className="h-12 w-12 rounded-full bg-[#205093] text-white flex justify-center items-center">
                <IoPeople size={24} />
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="font-bold">{tenants?.length}</p>
                <p className="text-xs font-semibold text-[#8B8B8B]">
                  Total Tenants
                </p>
              </div>
            </div>
                <div className="boxshadow  rounded-lg flex md:justify-center lg:justify-center justify-between md:items-center lg:items-center items-start gap-2 py-4 px-4 md:px-0 lg:px-0 md:h-36 lg:h-36 md:flex-col lg:flex-col">
      <div className="h-12 w-12 rounded-full bg-[#00A61C] text-white flex justify-center items-center">
      <FaBed size={24} />
      </div>
      <div className="flex flex-col justify-center gap-1 items-center">
        <div className="flex gap-2 items-center">
          <div className="flex flex-col justify-center items-center gap-1">
            <p className="text-[0.6rem] font-semibold text-[#ED0000]">
              Occupied
            </p>
            <p className="font-bold text-xs">{data?.totalBooked}</p>
          </div>
          <Divider className="h-6" orientation="vertical" />
          <div className="flex flex-col justify-center items-center gap-1">
            <p className="text-[0.6rem] font-semibold text-[#00A61C]">
              Available
            </p>
            <p className="font-bold text-xs">{data?.totalRemaining}</p>
          </div>
        </div>
        <p className="md:text-xs lg:text-xs text-tiny font-semibold text-[#8B8B8B]">
         Total Beds / {data?.totalBeds}
        </p>
      </div>
    </div>
            {/* <div className="boxshadow  rounded-lg flex md:justify-center lg:justify-center justify-between md:items-center lg:items-center items-start gap-2 py-4 px-4 md:px-0 lg:px-0 md:h-36 lg:h-36 md:flex-col lg:flex-col">
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
            </div> */}
            <Ticketcard/>
          </div>
        </div>
      )}
      <Getfloor />
    </div>
  );
};

export default Overallstatus;
