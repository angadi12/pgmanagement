"use client";
import React, { useEffect, useState } from "react";
import { FaB, FaBed } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa6";
import { Button, Divider, Tooltip } from "@nextui-org/react";
import GetfloorSkeleton from "./GetfloorSkeleton ";
import { fetchRoomsByBranch } from "@/lib/RoomSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchFloorsByBranch } from "../../lib/TennatSlice";
import { IoChevronDownOutline, IoChevronUp } from "react-icons/io5";

const Getfloor = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { rooms, status, error } = useSelector((state) => state.rooms);
  const floors = useSelector((state) => state.tenants.floors);
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );
  const [selectedFloor, setSelectedFloor] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchRoomsByBranch(selectedBranchId));
      dispatch(fetchFloorsByBranch(selectedBranchId));
    }
  }, [selectedBranchId, dispatch]);

  useEffect(() => {
    if (floors?.length > 0) {
      setSelectedFloor(floors[0]);
    }
  }, [floors]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [selectedFloor]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFloorSelect = (floor) => {
    setSelectedFloor(floor);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    setFilteredRooms(
      selectedFloor
        ? rooms.filter((room) => room?.floor === selectedFloor)
        : rooms
    );
  }, [selectedFloor, rooms]);

  const availableRooms = filteredRooms?.filter((room) => room.reaminingBed > 0);
  // const onHoldRooms = filteredRooms.filter((room) => room.remainingBed > 0 && room.SharingType <= room.remainingBed);
  const occupiedRooms = filteredRooms?.filter((room) => room.reaminingBed === 0);

  return (
    <>
      {status === "loading" || loading ? (
        <GetfloorSkeleton />
      ) : (
        <div className="flex flex-col gap-2 justify-start items-start w-full h-full mt-2">
          <div className="w-full flex justify-between items-center  ">
            <p className="text-sm font-bold">Available Rooms</p>
            <div className=" h-4  flex justify-end items-end">
              <div
                onClick={toggleDropdown}
                className="  relative rounded-md  mx-auto h-4 flex justify-start  items-center  right-0"
              >
                <input
                  className="outline-none bg-transparent pl-6 text-default-500 text-sm w-28 placeholder:text-sm placeholder:font-medium"
                  placeholder="Select Floor"
                  value={selectedFloor}
                />
                {isDropdownOpen ? (
                  <IoChevronUp className="text-default-500" size={14} />
                ) : (
                  <IoChevronDownOutline
                    className="text-default-500 "
                    size={14}
                  />
                )}
                {isDropdownOpen && (
                  <div className="absolute  top-full mt-1 z-20 bg-white boxshadow left-0 right-0  rounded-md">
                    {floors?.map((floor) => (
                      <div
                        key={floor}
                        onClick={() => handleFloorSelect(floor)}
                        className="cursor-pointer px-4 py-2 text-default-500  text-sm"
                      >
                        {floor}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-1 grid-rows-1 mt-1 gap-6 justify-center place-content-center items-center mx-auto w-full ">
            <div className="ring-1 ring-gray-300  w-full px-4 md:h-44 lg:h-44 h-60 rounded-lg flex flex-col md:flex-row lg:flex-row justify-around items-center gap-4">
              <div className=" grid grid-cols-5 gap-3 items-start">
                {filteredRooms.map((detail, index) => {
                  let bedColor, status;

                  if (detail.reaminingBed === 0) {
                    bedColor = "bg-[#ED0000]";
                    status = "Occupied";
                  } else if (detail.SharingType >= detail.reaminingBed) {
                    bedColor = "bg-[#1B9D31]";
                    status = "Available";
                  } else {
                    bedColor = "bg-[#FFA200]";
                    status = "On hold";
                  }

                  return (
                    <Tooltip
                      key={index}
                      content={
                        <div className="px-1 py-2">
                          <div className="text-xs font-bold text-green-700">
                            Available Bed:
                            <span className="text-red-400 ml-2">
                              {detail.reaminingBed}
                            </span>
                          </div>
                          <div className="text-tiny">
                            No of sharing {detail.SharingType}
                          </div>
                        </div>
                      }
                    >
                      <Button
                        isIconOnly
                        variant="light"
                        className=" rounded-md"
                      >
                        <div
                          className={`h-12 w-12 rounded-md ${bedColor} text-white flex justify-center items-center`}
                        >
                          <FaBed size={24} />
                        </div>
                      </Button>
                    </Tooltip>
                  );
                })}
              </div>
              <Divider
                className="h-32 hidden md:flex lg:flex"
                orientation="vertical"
              />
              <div className="flex md:flex-col lg:flex-col flex-row justify-between items-start md:gap-4 lg:gap-4 w-full md:w-auto lg:w-auto ">
                <div className="flex flex-col justify-start items-start">
                  <p className="font-semibold text-sm">
                    Floor :&nbsp;
                    <span className="text-tiny">{selectedFloor}</span>
                  </p>
                  <p className="text-xs text-[#787878] font-medium">
                    Total Rooms: {filteredRooms?.length}
                  </p>
                </div>
                <div className="flex flex-col justify-start items-start w-full gap-1">
                  <p className="flex justify-center items-center gap-1 text-xs font-semibold">
                    <FaCircle className="text-[#1B9D31]" />
                    Available:&nbsp; {availableRooms.length}
                  </p>
                  {/* <p className="flex justify-center items-center gap-1 text-xs font-semibold">
                    <FaCircle className="text-[#FFA200]" />
                    On hold: 5
                  </p> */}
                  <p className="flex justify-center items-center gap-1 text-xs font-semibold">
                    <FaCircle className="text-[#ED0000]" />
                    Occupied:&nbsp; {occupiedRooms.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Getfloor;
