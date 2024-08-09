"use client";
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Createroomapi } from "@/lib/API/Room";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { fetchRoomsByBranch } from "@/lib/RoomSlice";

export const Amentities = [
  { key: "Bed", label: "Bed" },
  { key: "Cupboard", label: "Cupboard" },
  { key: "Attached Washroom", label: "Attached Washroom" },
  { key: "Air Conditioning", label: "Air Conditioning" },
  { key: "Fan", label: "Fan" },
  { key: "Wi-Fi", label: "Wi-Fi" },
  { key: "Study Table", label: "Study Table" },
  { key: "Chair", label: "Chair" },
  { key: "Laundry Service", label: "Laundry Service" },
  { key: "Room Cleaning", label: "Room Cleaning" },
  { key: "Geyser", label: "Geyser" },
  { key: "TV", label: "TV" },
  { key: "Refrigerator", label: "Refrigerator" },
  { key: "Microwave", label: "Microwave" },
  { key: "CCTV Security", label: "CCTV Security" },
  { key: "Power Backup", label: "Power Backup" },
  { key: "Parking Facility", label: "Parking Facility" },
  { key: "Common Area", label: "Common Area" },
  { key: "Kitchen", label: "Kitchen" },
];

const Createroom = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.rooms.status);
  const error = useSelector((state) => state.rooms.error);
  const [loading, setLoading] = useState(false);
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );
  const [formData, setFormData] = useState({
    roomName: "",
    RoomNumber: "",
    RoomType: "",
    RoomDetails: [],
    SharingType: "",
    Price: "",
    branch: selectedBranchId,
    floor: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (key, selectedKeys) => {
    const selectedArray = Array.from(selectedKeys);
    if (key === "RoomType") {
      setFormData({ ...formData, RoomType: selectedArray[0] });
    } else if (key === "SharingType") {
      setFormData({ ...formData, SharingType: selectedArray[0] });
    } else if (key === "RoomDetails") {
      setFormData({ ...formData, RoomDetails: selectedArray });
    } else if (key === "floor") {
      setFormData({ ...formData, floor: selectedArray[0] });
    }
  };

  const validate = () => {
    if (!formData.RoomNumber) return "Room Number is required";
    if (!formData.RoomType) return "Room Type is required";
    if (!formData.RoomDetails) return "Room Details is required";
    if (!formData.SharingType) return "Sharing Type is required";
    if (!formData.Price) return "Room Rent is required";
    if (!formData.floor) return "floor is required";
    if (!formData.branch) return "Select Branch";

    return null;
  };

  const handleSubmit = async () => {
    const error = validate();

    if (error) {
      toast.error(error);
      return;
    }
    setLoading(true);

    const result = await Createroomapi(formData);
    if (result.status) {
      toast.success("Room created successfully");
      dispatch(fetchRoomsByBranch(selectedBranchId));
      setLoading(false);
    } else {
      toast.error(result.message || "Failed to create Room");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="w-full text-start">
          <p className="text-lg font-semibold">Fill Room Details</p>
        </div>
        <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-6 place-content-center justify-between items-start ">
          <Input
            type="text"
            name="roomName"
            variant="bordered"
            radius="sm"
            className="w-full rounded-none"
            size="lg"
            placeholder="Room Name"
            value={formData.roomName}
            onChange={handleChange}
          />
          <Input
            type="Number"
            name="RoomNumber"
            variant="bordered"
            radius="sm"
            className="w-full rounded-none"
            size="lg"
            placeholder="Room Number"
            value={formData.RoomNumber}
            onChange={handleChange}
          />
          <Select
            size="lg"
            radius="sm"
            variant="bordered"
            placeholder="Room Type"
            className="w-full"
            selectedKeys={new Set([formData.RoomType])}
            onSelectionChange={(selectedKeys) =>
              handleSelectChange("RoomType", selectedKeys)
            }
          >
            <SelectItem color="primary" variant="flat" key="AC">
              AC
            </SelectItem>
            <SelectItem color="primary" variant="flat" key="NON-AC">
              Non-AC
            </SelectItem>
          </Select>
          <Select
            size="lg"
            radius="sm"
            variant="bordered"
            placeholder="No. of Sharing"
            className="w-full"
            selectedKeys={new Set([formData.SharingType])}
            onSelectionChange={(selectedKeys) =>
              handleSelectChange("SharingType", selectedKeys)
            }
          >
            <SelectItem color="primary" variant="flat" key="1">
              1
            </SelectItem>
            <SelectItem color="primary" variant="flat" key="2">
              2
            </SelectItem>
            <SelectItem color="primary" variant="flat" key="3">
              3
            </SelectItem>
            <SelectItem color="primary" variant="flat" key="4">
              4
            </SelectItem>
          </Select>

          
        </div>
        <div className="w-full grid lg:grid-cols-1 grid-cols-1 gap-4 place-content-center justify-between items-start ">
        <Select
            items={Amentities}
            showScrollIndicators={true}
            size="lg"
            radius="sm"
            isMultiline={true}
            selectionMode="multiple"
            variant="bordered"
            placeholder="Room Details"
            className="w-full"
            selectedKeys={new Set(formData.RoomDetails)}
            onSelectionChange={(selectedKeys) =>
              handleSelectChange("RoomDetails", selectedKeys)
            }
          >
            {(amenity) => (
              <SelectItem
                showScrollIndicators={true}
                color="primary"
                variant="flat"
              >
                {amenity.label}
              </SelectItem>
            )}
          </Select>
        </div>
        <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
          <Input
            type="Number"
            name="Price"
            variant="bordered"
            radius="sm"
            className="w-full rounded-none"
            size="lg"
            placeholder="Set Room Rent"
            value={formData.Price}
            onChange={handleChange}
          />
          <Select
            size="lg"
            radius="sm"
            variant="bordered"
            placeholder="Select Floor"
            className="w-full"
            selectedKeys={new Set([formData.floor])}
            onSelectionChange={(selectedKeys) =>
              handleSelectChange("floor", selectedKeys)
            }
          >
            <SelectItem color="primary" variant="flat" key="First">
              Ground
            </SelectItem>
            <SelectItem color="primary" variant="flat" key="First">
              First
            </SelectItem>
            <SelectItem color="primary" variant="flat" key="Secound">
              Secound
            </SelectItem>
            <SelectItem color="primary" variant="flat" key="Third">
              Third
            </SelectItem>
            <SelectItem color="primary" variant="flat" key="Fourth">
              Fourth
            </SelectItem>
            <SelectItem color="primary" variant="flat" key="Fourth">
              Fifth
            </SelectItem>
            <SelectItem color="primary" variant="flat" key="Fourth">
              Sixth
            </SelectItem>
          </Select>
        </div>

        {/* <div className="w-full text-start flex justify-start items-center gap-2 py-2">
          <p className="text-[#205093] text-sm font-bold underline cursor-pointer">
            +Upload Room Image
          </p>
          <span className="text-xs text-gray-400 no-underline">
            (PNG, JPG only)
          </span>
        </div> */}
        <div className="flex justify-center items-center w-full">
          <Button
            onPress={handleSubmit}
            className="buttongradient text-white rounded-md w-60 uppercase font-semibold"
          >
            {loading ? <span className="loader2"></span> : "Create"}
          </Button>
        </div>
      </div>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 1000,
          style: {
            background: "linear-gradient(90deg, #222C68 0%, #1D5B9E 100%)",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 1000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  );
};

export default Createroom;
