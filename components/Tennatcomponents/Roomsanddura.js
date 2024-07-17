import React from "react";
import { DatePicker, Divider } from "@nextui-org/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { Select, SelectItem } from "@nextui-org/react";
import { FaB, FaBed } from "react-icons/fa6";

export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
];

const Roomsanddura = () => {
  const [value, setValue] = React.useState(parseDate("2024-04-04"));

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-full text-start">
        <p className="text-lg font-semibold">Choose Duration & Room Type</p>
      </div>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-6 place-content-center justify-between items-start ">
        <DatePicker
          size="lg"
          radius="sm"
          variant="bordered"
          className="w-full"
          value={value}
          onChange={setValue}
        />
        <DatePicker
          size="lg"
          radius="sm"
          variant="bordered"
          className="w-full"
          value={value}
          onChange={setValue}
        />
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
          placeholder="AC / Non - Ac"
          className="w-full"
        >
          {(animal) => <SelectItem>{animal.label}</SelectItem>}
        </Select>
      </div>
      <div className="flex flex-col justify-center items-start gap-2 w-full mt-4 ">
        <div className="flex justify-between items-center w-full">
          <p className="font-semibold">Allocate Room</p>
          <p className="font-semibold">Floor 1</p>
        </div>
        <div className=" grid grid-cols-10 gap-4 w-full items-start mt-4">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="h-12 w-12 rounded-md bg-[#FFA200] text-white flex  justify-center items-center">
              <FaBed size={24} />
            </div>
            <p className="font-semibold text-sm">A1</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="h-12 w-12 rounded-md bg-[#FFA200] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
            <p className="font-semibold text-sm">A2</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="h-12 w-12 rounded-md bg-[#FFA200] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
            <p className="font-semibold text-sm">A3</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="h-12 w-12 rounded-md bg-[#1B9D31] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
            <p className="font-semibold text-sm">A4</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="h-12 w-12 rounded-md bg-[#1B9D31] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
            <p className="font-semibold text-sm">A5</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="h-12 w-12 rounded-md bg-[#1B9D31] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
            <p className="font-semibold text-sm">A6</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="h-12 w-12 rounded-md bg-[#1B9D31] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
            <p className="font-semibold text-sm">A7</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="h-12 w-12 rounded-md bg-[#1B9D31] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
            <p className="font-semibold text-sm">A8</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="h-12 w-12 rounded-md bg-[#1B9D31] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
            <p className="font-semibold text-sm">A9</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="h-12 w-12 rounded-md bg-[#ED0000] text-white flex justify-center items-center">
              <FaBed size={24} />
            </div>
            <p className="font-semibold text-sm">A10</p>
          </div>

        
        </div>
        <Divider className="mt-2" />
      </div>
    </div>
  );
};

export default Roomsanddura;
