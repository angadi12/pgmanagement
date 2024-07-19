import React from 'react'
import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem ,DatePicker} from "@nextui-org/react";
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
const Createexpense = () => {
  const [value, setValue] = React.useState(parseDate("2024-04-04"));

  return (
    <div className="flex flex-col justify-center items-center gap-6">
    <div className="w-full text-start">
      <p className="text-lg font-semibold">Fill Expense Details</p>
    </div>
    <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-6 place-content-center justify-between items-start ">
      <Input
        type="text"
        name="firstName"
        variant="bordered"
        radius="sm"
        className="w-full rounded-none"
        size="lg"
        placeholder="Expense Name"
        //   value={formData.firstName}
        //   onChange={handleChange}
      />
       <Select
        items={animals}
        size="lg"
        radius="sm"
        variant="bordered"
        placeholder="Expense Category"
        className="w-full"
      >
        {(animal) => <SelectItem>{animal.label}</SelectItem>}
      </Select>
      <DatePicker
          size="lg"
          radius="sm"
          variant="bordered"
          className="w-full"
          value={value}
          onChange={setValue}
        />
      
      <Input
        type="text"
        name="firstName"
        variant="bordered"
        radius="sm"
        className="w-full rounded-none"
        size="lg"
        placeholder="Amount"
        //   value={formData.firstName}
        //   onChange={handleChange}
      />
     
      
    </div>
    <div className="w-full grid lg:grid-cols-1 grid-cols-1 gap-4 place-content-center justify-between items-start ">
      <Input
        type="text"
        name="email"
        variant="bordered"
        radius="sm"
        className="w-full rounded-none"
        size="lg"
        placeholder="Expense Description"
        //   value={formData.email}
        //   onChange={handleChange}
      />
    </div>
   
    <div className="w-full text-start flex justify-start items-center gap-2 py-2">
      <p className="text-[#205093] text-sm font-bold underline cursor-pointer">
      +Add Bill
      </p>
      <span className="text-xs text-gray-400 no-underline">
      (Optional)
      </span>
    </div>
  </div>
  )
}


export default Createexpense