import React from "react";
import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { IoCloudUploadOutline } from "react-icons/io5";

export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
];
const Createpayment = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <div className="w-full text-start">
        <p className="text-lg font-semibold">Fill Payment Details</p>
      </div>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
        <Input
          type="text"
          name="firstName"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Tenant ID"
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
          placeholder="Tenant Name"
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
          placeholder="Rent Amount"
          //   value={formData.firstName}
          //   onChange={handleChange}
        />

        <Select
          items={animals}
          size="lg"
          radius="sm"
          variant="bordered"
          placeholder="Installment (1st, 2nd or 3rd)"
          className="w-full"
        >
          {(animal) => <SelectItem>{animal.label}</SelectItem>}
        </Select>
      </div>

      <div className="flex flex-col justify-center items-center w-full gap-4">
            <div className="flex flex-col justify-center items-center gap-2 border-2 border-dashed border-[#205093] rounded-lg w-72 h-32">
               <IoCloudUploadOutline size={40} className="text-[#205093]"/>
               <p className="text-xs font-semibold text-gray-400">(Png, Jpg, Pdf only)</p>
            </div>
            <div>
                <p className="text-[#205093] underline text-sm font-bold">+Upload Receipt</p>
            </div>
      </div>
    </div>
  );
};

export default Createpayment;
