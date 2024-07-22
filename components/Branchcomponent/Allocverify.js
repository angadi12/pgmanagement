import React from "react";
import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";

export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
];
const Allocverify = () => {
  const [selected, setSelected] = React.useState("london");

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-full text-start">
        <p className="text-lg font-semibold">Allocate PG & Branch</p>
      </div>
      <div className="w-full grid lg:grid-cols-2  py-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
        <Select
          items={animals}
          size="lg"
          radius="sm"
          variant="bordered"
          placeholder="Choose Branch"
          className="w-full"
        >
          {(animal) => <SelectItem>{animal.label}</SelectItem>}
        </Select>
        <Select
          items={animals}
          size="lg"
          radius="sm"
          variant="bordered"
          placeholder="Limit Access"
          className="w-full"
        >
          {(animal) => <SelectItem>{animal.label}</SelectItem>}
        </Select>
      </div>
      <div className="w-full text-start">
        <p className="text-lg font-semibold">Upload Verification</p>
      </div>
      <div className="flex justify-start items-start w-full gap-4">
      <RadioGroup
        value={selected}
          orientation="horizontal"
          className="flex justify-start items-start  w-full"
        onValueChange={setSelected}
      >
        <Radio className="mr-2" value="buenos-aires">Aadhaar Card</Radio>
        <Radio  className="mr-2" value="sydney">Pan Card</Radio>
        <Radio  className="mr-2" value="san-francisco">Driving License</Radio>
        <Radio  className="mr-2" value="london">Other ID Proof</Radio>
      </RadioGroup>
    </div>
    <div className="w-full grid lg:grid-cols-1 py-4 grid-cols-1 gap-4 place-content-center justify-between items-start ">
    <Input
          type="text"
          name="firstName"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Type Aadhaar Number"
          //   value={formData.firstName}
          //   onChange={handleChange}
        />
    </div>

      <div className="w-full text-start flex justify-start items-center gap-2 py-2">
        <p className="text-[#205093] text-sm font-bold underline cursor-pointer">
        +Upload Verification
        </p>
        <span className="text-xs text-gray-400 no-underline">
          (For Profile Picture - PNG, JPG only)
        </span>
      </div>
    </div>
  );
};

export default Allocverify;
