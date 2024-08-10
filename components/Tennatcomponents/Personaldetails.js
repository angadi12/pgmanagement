"use client";
import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { setPersonalDetails } from "../../lib/CreatetenantSlice";
import { setCurrentStep } from "../../lib/CreatetenantSlice";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { HiMiniIdentification } from "react-icons/hi2";
import { MdOutlineCloudUpload } from "react-icons/md";
import { IoDocumentTextSharp } from "react-icons/io5";

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



  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { 
        setFormData({
          ...formData,
          [fileType]: file
        });
      };
      reader.readAsDataURL(file);
    }
  };





  const handleNext = () => {
    if (!selectedRoomId) {
      return toast.error("Room not selected");
    }
    if (!formData.UserName) {
      return toast.error("Full Name is required");
    }
    if (!formData.UserNumber || formData.UserNumber.length !== 10) {
      return toast.error("Phone Number should be 10 digits");
    }
    if (!formData.address) {
      return toast.error("Address is required");
    }
    if (!formData.email) {
      return toast.error("Email is required");
    }
    if (!formData.aadharNumber || formData.aadharNumber.length !== 12) {
      return toast.error("Aadhar Number should be 12 digits");
    }
    if (!formData.profile ) {
      return toast.error("Profile image is required");
    }
    if (!formData.aadhar  ) {
      return toast.error("aadhar/optinal image is required");
    }

    dispatch(setPersonalDetails(formData));
    dispatch(setCurrentStep("Room & Duration"));
  };
console.log(formData)
  return (
    <>
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
            type="tel"
            maxLength={10}
            min={10}
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
            type="number"
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
        <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-4  place-content-center justify-between items-start ">
          <div className="w-full text-start flex flex-col justify-start items-start gap-2 py-2">
            <Button size="lg" radius="sm" variant="bordered" className="w-full" endContent={<FaUserCircle size={24} className="text-[#222C68]"/>}>
              <label htmlFor="fileInputProfile" className="flex justify-start items-center gap-1 text-tiny"><MdOutlineCloudUpload size={24} className="text-[#222C68]"/>{formData?.profile?.name?formData?.profile?.name: "Upload Tenant Image"}</label>
              <input
                type="file"
                id="fileInputProfile"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, "profile")}
              />
            </Button>
            <span className="text-xs text-gray-400 no-underline">
              (For Profile Picture - PNG, JPG only)
            </span>
          </div>
         
          <div className="w-full text-start flex flex-col justify-start items-start gap-2 py-2">
            <Button size="lg" radius="sm" variant="bordered" className="w-full" endContent={<HiMiniIdentification size={24} className="text-[#222C68]"/>}>
              <label htmlFor="fileInputAadhar" className="flex justify-start items-center gap-1 text-xs"><MdOutlineCloudUpload size={24} className="text-[#222C68]"/>{formData?.aadhar?.name?formData?.aadhar?.name:"Upload Tenant Aadhar"}</label>
              <input
                type="file"
                id="fileInputAadhar"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, "aadhar")}
              />
            </Button>
            <span className="text-xs text-gray-400 no-underline">
              (For Aadhar Picture - PNG, JPG only)
            </span>
          </div>
         
          <div className="w-full text-start flex flex-col justify-start items-start gap-2 py-2">
            <Button size="lg" radius="sm" variant="bordered" className="w-full" endContent={<IoDocumentTextSharp size={24} className="text-[#222C68]"/>}>
              <label htmlFor="fileInputOptional" className="flex justify-start items-center gap-1 text-tiny"><MdOutlineCloudUpload size={24} className="text-[#222C68]"/>{formData?.optional?.name?formData?.optional?.name:"Upload Other doc"}</label>
              <input
              type="file"
                 id="fileInputOptional"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, "optional")}
              />
            </Button>
            <span className="text-xs text-gray-400 no-underline">
              (For Other Picture - PNG, JPG only)
            </span>
          </div>
         
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

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 1000,
          style: {
            background: "linear-gradient(90deg, #222C68 0%, #1D5B9E 100%)",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 1000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  );
};

export default Personaldetails;
