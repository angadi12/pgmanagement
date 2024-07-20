import React from "react";
import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem, DatePicker } from "@nextui-org/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";

export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
];
const Createbranch = () => {
  const [value, setValue] = React.useState(parseDate("2024-04-04"));

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <div className="w-full text-start">
        <p className="text-lg font-semibold">Fill Branch Details</p>
      </div>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-6 place-content-center justify-between items-start ">
        <Input
          type="text"
          name="firstName"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Branch Name"
          //   value={formData.firstName}
          //   onChange={handleChange}
        />
        <Input
          type="text"
          name="firstName"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Location"
          //   value={formData.firstName}
          //   onChange={handleChange}
        />

        <Input
          type="text"
          name="firstName"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Phone Number"
          //   value={formData.firstName}
          //   onChange={handleChange}
        />

        <Input
          type="text"
          name="email"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Address"
          //   value={formData.email}
          //   onChange={handleChange}
        />
      </div>

      <div className="w-full text-start flex justify-start items-center gap-2 py-2">
        <p className="text-[#205093] text-sm font-bold underline cursor-pointer">
          +Upload Building Image
        </p>
        <span className="text-xs text-gray-400 no-underline">
          (PNG, JPG only)
        </span>
      </div>
    </div>
  );
};

export default Createbranch;
