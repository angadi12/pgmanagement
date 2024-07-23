import React from 'react'
import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Createroomapi } from '@/lib/API/Room';

export const animals = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
    { key: "tiger", label: "Tiger" },
    { key: "giraffe", label: "Giraffe" },
    { key: "dolphin", label: "Dolphin" },
  ];
const Createroom = () => {
  const [formData, setFormData] = useState({
    roomName: "",
    RoomNumber: "",
    RoomType: "",
    RoomDetails: [],
    SharingType: "",
    Price: "",
    branch: "",
    floor: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  return (
    <div className="flex flex-col justify-center items-center gap-6">
    <div className="w-full text-start">
      <p className="text-lg font-semibold">Fill Room Details</p>
    </div>
    <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-6 place-content-center justify-between items-start ">
      <Input
        type="text"
        name="firstName"
        variant="bordered"
        radius="sm"
        className="w-full rounded-none"
        size="lg"
        placeholder="Room Number"
        //   value={formData.firstName}
        //   onChange={handleChange}
      />
       <Select
        items={animals}
        size="lg"
        radius="sm"
        variant="bordered"
        placeholder="Choose Floor"
        className="w-full"
      >
        {(animal) => <SelectItem>{animal.label}</SelectItem>}
      </Select>
      <Select
        items={animals}
        size="lg"
        radius="sm"
        variant="bordered"
        placeholder="No. of Sharing"
        className="w-full"
      >
        {(animal) => <SelectItem>{animal.label}</SelectItem>}
      </Select>
     
      <Select
        items={animals}
        size="lg"
        radius="sm"
        variant="bordered"
        placeholder="Amenities"
        className="w-full"
      >
        {(animal) => <SelectItem>{animal.label}</SelectItem>}
      </Select>
     
      
    </div>
    <div className="w-full grid lg:grid-cols-1 grid-cols-1 gap-4 place-content-center justify-between items-start ">
      <Input
        type="text"
        name="email"
        variant="bordered"
        radius="sm"
        className="w-full rounded-none"
        size="lg"
        placeholder="Set Room Rent"
        //   value={formData.email}
        //   onChange={handleChange}
      />
    </div>
   
    <div className="w-full text-start flex justify-start items-center gap-2 py-2">
      <p className="text-[#205093] text-sm font-bold underline cursor-pointer">
      +Upload Room Image
      </p>
      <span className="text-xs text-gray-400 no-underline">
      (PNG, JPG only)
      </span>
    </div>
  </div>
  )
}

export default Createroom