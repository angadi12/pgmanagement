"use client";
import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { setPersonalDetails } from "../../lib/CreatetenantSlice";
import { setCurrentStep } from "../../lib/CreatetenantSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleTenant } from "../../lib/TennatSlice";

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

const Updatepersonaldetails = () => {
  const dispatch = useDispatch();
  const selectedRoomId = useSelector(
    (state) => state.createTenant.selectedRoomId
  );
  const storedPersonalDetails = useSelector(
    (state) => state.createTenant.personalDetails
  );
  const singleTenant = useSelector((state) => state.tenants.singleTenant);
  console.log(singleTenant);
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );
  const selectedTenantId = useSelector(
    (state) => state.tenants.selectedTenantId
  );

  const [formData, setFormData] = useState({
    UserName: singleTenant?.UserName || "",
    UserNumber: singleTenant?.UserNumber || "",
    Address: singleTenant?.Address || "",
    email: singleTenant?.email || "",
    AadharNumber: singleTenant?.AadharNumber || "",
  });

  useEffect(() => {
    if (isValidObjectId(selectedTenantId)) {
      dispatch(fetchSingleTenant({ tenantId: selectedTenantId }));
    } else {
      console.error("Invalid ObjectId(s) provided");
    }
  }, [selectedTenantId]);

  // useEffect(() => {
  //   if (singleTenant) {
  //     setFormData({
  //       UserName: singleTenant.UserName || "",
  //       UserNumber: singleTenant.UserNumber || "",
  //       Address: singleTenant.Address || "",
  //       email: singleTenant.email || "",
  //       AadharNumber: singleTenant.AadharNumber || "",
  //     });
  //   }
  // }, [singleTenant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (
      selectedRoomId &&
      formData.UserName &&
      formData.UserNumber &&
      formData.Address &&
      formData.email &&
      formData.AadharNumber
    ) {
      dispatch(setPersonalDetails(formData));
      dispatch(setCurrentStep("Room & Duration"));
    }
  };
console.log(storedPersonalDetails,"updated")
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
          value={formData.UserNumber}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="Address"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Address"
          value={formData.Address}
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
          name="AadharNumber"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Addhar Numbar"
          value={formData.AadharNumber}
          onChange={handleChange}
        />
      </div>
      {/* <div className="w-full text-start flex justify-start items-center gap-2 py-2">
        <p className="text-[#205093] text-sm font-bold underline cursor-pointer">
          +Upload Tenant Image{" "}
        </p>
        <span className="text-xs text-gray-400 no-underline">
          (For Profile Picture - PNG, JPG only)
        </span>
      </div> */}

      <div className="flex justify-center items-center w-full">
        <Button
          isDisabled={
            !selectedRoomId &&
            !formData.UserName &&
            !formData.UserNumber &&
            !formData.Address &&
            !formData.email &&
            !formData.AadharNumber
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

export default Updatepersonaldetails;
