"use client";
import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { setPersonalDetails } from "../../lib/CreatetenantSlice";
import { setCurrentStep } from "../../lib/CreatetenantSlice";
import { useSelector, useDispatch } from "react-redux";

const Personaldetails = () => {
  const dispatch = useDispatch();
  const selectedRoomId = useSelector(
    (state) => state.createTenant.selectedRoomId
  );
  const storedPersonalDetails = useSelector(
    (state) => state.createTenant.personalDetails
  );
  const [formData, setFormData] = useState(storedPersonalDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (
      selectedRoomId &&
      formData.UserName &&
      formData.UserNumber &&
      formData.address &&
      formData.email &&
      formData.aadharNumber
    ) {
      dispatch(setPersonalDetails(formData));
      dispatch(setCurrentStep("Room & Duration"));
    }
  };

  console.log(formData);
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-full text-start">
        <p className="text-lg font-semibold">Fill Tenant Details</p>
      </div>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-6 place-content-center justify-between items-start ">
        <Input
          type="text"
          name="UserName"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Full Name"
          value={formData.UserName}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="UserNumber"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Phone Number"
          value={formData.UserNumber || ""}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="address"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="email"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="w-full grid lg:grid-cols-1 grid-cols-1 gap-4 place-content-center justify-between items-start ">
        <Input
          type="text"
          name="aadharNumber"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Addhar Numbar"
          value={formData.aadharNumber}
          onChange={handleChange}
        />
      </div>
      <div className="w-full text-start flex justify-start items-center gap-2 py-2">
        <p className="text-[#205093] text-sm font-bold underline cursor-pointer">
          +Upload Tenant Image{" "}
        </p>
        <span className="text-xs text-gray-400 no-underline">
          (For Profile Picture - PNG, JPG only)
        </span>
      </div>

      <div className="flex justify-center items-center w-full">
        <Button
          isDisabled={
            !selectedRoomId &&
            !formData.UserName &&
            !formData.UserNumber &&
            !formData.address &&
            !formData.email &&
            !formData.aadharNumber
          }
          onPress={handleNext}
          className="buttongradient text-white rounded-md w-60 uppercase font-semibold"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Personaldetails;
