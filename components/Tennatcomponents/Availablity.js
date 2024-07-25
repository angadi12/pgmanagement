"use client";
import React, { useEffect, useState } from "react";
import { Button, Chip, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFloorsByBranch } from "../../lib/TennatSlice";
import { fetchRoomsByBranch } from "../../lib/RoomSlice";
import { GetRoomsbyBranch } from "../../lib/API/Room";
import { motion } from "framer-motion";

const Availablity = () => {
  const dispatch = useDispatch();
  const [sharing, setSharing] = useState("");
  const [formData, setFormData] = useState({
    floor: "",
  });
  const [availableRooms, setAvailableRooms] = useState([]);
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );
  const { rooms } = useSelector((state) => state.rooms);
  const floors = useSelector((state) => state.tenants.floors);
  const [loading, setLoading] = useState(false);
  const [filterError, setFilterError] = useState("");

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
          room.SharingType >= parseInt(sharing) &&
          room.floor === formData.floor
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

  console.log("Loading state:", loading);

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
      <div className="w-full h-52 py-2 grid lg:grid-cols-1 grid-cols-1 gap-4 place-content-start justify-start items-start">
        {availableRooms.length > 0 && (
          <Select
            size="lg"
            radius="sm"
            variant="bordered"
            color="primary"
            placeholder="Select Available Room"
            className="w-full"
            selectedKeys={new Set()}
          >
            {availableRooms?.map((room) => (
              <SelectItem color="primary" variant="flat" key={room._id} value={room._id}>
                {room.RoomNumber}
              </SelectItem>
            ))}
          </Select>
        )}
      </div>
    </div>
  );
};

export default Availablity;
