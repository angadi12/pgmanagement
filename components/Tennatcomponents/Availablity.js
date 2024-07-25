"use client";
import React, { useEffect, useState } from "react";
import { Button, Chip, Divider, Input, Tooltip } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFloorsByBranch } from "../../lib/TennatSlice";
import { fetchRoomsByBranch } from "../../lib/RoomSlice";
import { GetRoomsbyBranch } from "../../lib/API/Room";
import { motion } from "framer-motion";
import { FaBed } from "react-icons/fa6";
import {setSelectedRoomId} from "../../lib/CreatetenantSlice"
import { setCurrentStep } from "../../lib/CreatetenantSlice"; 

const Availablity = () => {
  const dispatch = useDispatch();
  const selectedRoomId = useSelector((state) => state.createTenant.selectedRoomId);

  const [sharing, setSharing] = useState("");
  const [formData, setFormData] = useState({
    floor: "",
  });
  const [availableRooms, setAvailableRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );
  const { rooms } = useSelector((state) => state.rooms);
  const floors = useSelector((state) => state.tenants.floors);
  const [loading, setLoading] = useState(false);
  const [filterError, setFilterError] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchFloorsByBranch(selectedBranchId));
      dispatch(fetchRoomsByBranch(selectedBranchId));
    }
  }, [dispatch, selectedBranchId]);

  const handleSharingChange = (e) => {
    setSharing(e.target.value);
  };

  const handleSelectChange = (key, selectedKeys) => {
    const selectedArray = Array.from(selectedKeys);
    setFormData({ ...formData, [key]: selectedArray[0] });
  };

  const handleRoomSelectChange = (selectedKeys) => {
    const selectedArray = Array.from(selectedKeys);
    setSelectedRoom(selectedArray[0]);
    dispatch(setSelectedRoomId(selectedArray[0]))
  };

  console.log(selectedRoom);

  const filterRooms = async () => {
    setFilterError("");
    if (!sharing || !formData.floor) {
      setFilterError("Please enter sharing type and select a floor.");
      return;
    }

    setLoading(true);
    try {
      const rooms = await GetRoomsbyBranch(selectedBranchId);

      const filteredRooms = rooms?.data.filter(
        (room) =>
          room.SharingType >= parseInt(sharing) && room.floor === formData.floor
      );

      if (filteredRooms.length === 0) {
        setFilterError("No rooms available.");
        setAvailableRooms([]);
      } else {
        setAvailableRooms(filteredRooms);
        console.log(filterRooms);
      }
    } catch (error) {
      setFilterError("An error occurred while fetching rooms.");
      setAvailableRooms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sharing && formData.floor) {
      filterRooms();
    }
  }, [sharing, formData.floor]);

  const floorOrder = ["First", "Second", "Third", "Fourth"];

  const sortFloors = (floors, order) => {
    const orderMap = order.reduce((acc, floor, index) => {
      acc[floor.toLowerCase()] = index;
      return acc;
    }, {});

    const floorsCopy = [...floors];

    return floorsCopy.sort((a, b) => {
      const aLower = a.toLowerCase().replace("secound", "second");
      const bLower = b.toLowerCase().replace("secound", "second");
      return (orderMap[aLower] ?? Infinity) - (orderMap[bLower] ?? Infinity);
    });
  };

  const sortedFloors = sortFloors(floors, floorOrder);

  useEffect(() => {
    if (formData.floor) {
      const filtered = rooms.filter((room) => room.floor === formData.floor);
      setFilteredRooms(filtered);
    }
  }, [formData.floor, rooms]);

  const disabledRoomKeys = availableRooms
    .filter((room) => room.reaminingBed === 0)
    .map((room) => room._id);


    const handlenext=()=>{
      if(selectedRoomId){
        dispatch(setCurrentStep("Personal Details"))
      }
    }

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-full text-start">
        <p className="text-lg font-semibold">Check Room Availability</p>
      </div>
      <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-4 place-content-center justify-between items-start">
        <Input
          type="Number"
          name="No of sharing"
          variant="bordered"
          color="primary"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="No of sharing"
          value={sharing}
          onChange={handleSharingChange}
        />
        <Select
          size="lg"
          radius="sm"
          color="primary"
          variant="bordered"
          placeholder="Select Floor"
          className="w-full"
          selectedKeys={new Set([formData.floor])}
          onSelectionChange={(selectedKeys) =>
            handleSelectChange("floor", selectedKeys)
          }
        >
          {sortedFloors.map((floor) => (
            <SelectItem
              color="primary"
              variant="flat"
              key={floor}
              value={floor}
            >
              {floor}
            </SelectItem>
          ))}
        </Select>
        <Button
          variant="solid"
          size="lg"
          className="rounded-md text-white bg-[#205093] "
          onPress={filterRooms}
        >
          {loading ? <span className="loader2"></span> : "Check Available Room"}
        </Button>
      </div>

      {filterError && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          variant="shadow"
          color="danger"
          className="w-auto px-4 h-8 text-xs bg-red-500 rounded-full text-white flex justify-center items-center"
        >
          {filterError}
        </motion.p>
      )}
      <div className="w-full py-2 grid lg:grid-cols-1 grid-cols-1 gap-4 place-content-start justify-start items-start">
        {availableRooms.length > 0 && (
          <Select
            size="lg"
            radius="sm"
            variant="bordered"
            color="primary"
            placeholder="Select Available Room"
            className="w-full"
            disabledKeys={new Set(disabledRoomKeys)}
            selectedKeys={new Set([selectedRoom])}
            onSelectionChange={handleRoomSelectChange}
            items={availableRooms}
            renderValue={(items) => {
              return items.map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <FaBed size={20} className="text-[#205093]" />
                  <div className="flex items-center gap-2">
                    <span>{`Room ${item.data.roomName}`}</span>
                    <span className="text-default-500 text-tiny">
                      {`Floor: ${item.data.floor}`}
                    </span>
                  </div>
                </div>
              ));
            }}
          >
            {(room) => (
              <SelectItem
                color="primary"
                variant="flat"
                key={room._id}
                textValue={`Room ${room.RoomNumber}`}
              >
                <div className="flex gap-2 justify-between w-full items-center">
                  <div className="flex items-center  gap-2">
                    <FaBed size={14} className="text-[#205093]" />
                    <span className="text-small">{`Room ${room.roomName}`}</span>
                    <span className="text-tiny text-default-400">{`Floor: ${room.floor}`}</span>
                  </div>
                  <div className="flex flex-col justify-end items-center gap-1 mr-4">
                    <div className="text-xs font-bold text-green-700">
                      Available Bed:
                      <span className="text-red-400 ml-2">
                        {room.reaminingBed}
                      </span>
                    </div>
                    <div className="text-tiny">
                      No of sharing {room.SharingType}
                    </div>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        )}
      </div>
      <div className="flex flex-col justify-center items-start gap-2 w-full mt-4 h-auto">
        <div className="flex justify-between items-center w-full">
          <p className="font-semibold">Allocate Room</p>
          <p className="font-semibold"></p>
        </div>
        <div className="grid grid-cols-10 gap-4 w-full items-start mt-4">
          {filteredRooms.map((room, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center gap-2"
            >
              <Tooltip
                content={
                  <div className="px-1 py-2">
                    <div className="text-xs font-bold text-green-700">
                      Available Bed:
                      <span className="text-red-400 ml-2">
                        {room.reaminingBed}
                      </span>
                    </div>
                    <div className="text-tiny">
                      No of sharing {room.SharingType}
                    </div>
                  </div>
                }
              >
                <Button
                  variant="light"
                  className="flex flex-col h-full w-auto p-1"
                >
                  <div
                    className={`h-12 w-12 rounded-md ${
                      room.reaminingBed === 0 ? "bg-[#ED0000]" : "bg-[#1B9D31]"
                    } text-white flex justify-center items-center`}
                  >
                    <FaBed size={24} />
                  </div>
                  <p className="font-semibold text-sm">{room.roomName}</p>
                </Button>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center w-full">
        <Button onPress={handlenext} isDisabled={!selectedRoomId} className="buttongradient text-white rounded-md w-60 uppercase font-semibold">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Availablity;
