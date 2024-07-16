import React from "react";
import { Button, Input } from "@nextui-org/react";

const Personaldetails = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
       <div className="w-full text-start">
        <p className="text-lg font-semibold">Fill Tenant Details</p>
       </div>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
        <Input
          type="text"
          name="firstName"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="First Name"
          //   value={formData.firstName}
          //   onChange={handleChange}
        />
        <Input
          type="text"
          name="lastName"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Last Name"
          //   value={formData.lastName}
          //   onChange={handleChange}
        />
        <Input
          type="text"
          name="mobileNumber"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Phone Number"
          //   value={formData.mobileNumber}
          //   onChange={handleChange}
        />
        <Input
          type="text"
          name="email"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Phone Number (Emergency)"
          //   value={formData.email}
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
          placeholder="Address"
          //   value={formData.email}
          //   onChange={handleChange}
        />
      </div>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
        <Input
          type="text"
          name="firstName"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="First Name"
          //   value={formData.firstName}
          //   onChange={handleChange}
        />
        <Input
          type="text"
          name="lastName"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Last Name"
          //   value={formData.lastName}
          //   onChange={handleChange}
        />
      </div>
      <div className="w-full text-start flex justify-start items-center gap-2 py-2">
        <p className="text-[#205093] text-sm font-bold underline cursor-pointer">+Upload Tenant Image </p>
        <span className="text-xs text-gray-400 no-underline">(For Profile Picture - PNG, JPG only)</span>
      </div>
    </div>
  );
};

export default Personaldetails;
