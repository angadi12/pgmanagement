import React from "react";
import { Input } from "@nextui-org/react";

const Userandpass = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 ">
      <div className="w-full text-center py-2">
        <p className="text-lg font-semibold">Set User Name & Password</p>
      </div>
      <div className="w-1/2 grid lg:grid-cols-1 grid-cols-1 gap-6 mb-4 place-content-center justify-between items-start ">
        <Input
          type="text"
          name="firstName"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Set Admin_ID"
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
          placeholder="Set User Name"
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
          placeholder="Set Password"
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
          placeholder="Confirm Password"
          //   value={formData.email}
          //   onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Userandpass;
