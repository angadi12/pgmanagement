import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Createstaffapi } from "../../lib/API/Staff";
import { useDispatch, useSelector } from "react-redux";
import {fetchAllCategories} from "../../lib/StaffSlice"
import toast, { Toaster } from "react-hot-toast";
import {fetchStaffByBranch} from "../../lib/StaffSlice"



const Personaldetails = ({onOpenChange}) => {
  const dispatch = useDispatch();
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );

  const categories = useSelector((state) => state.staff.categories);
const [loading ,Setloading]=useState(false)
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    // email: "",
    // emergencyPhone: "",
    // address: "",
    // gender: "",
    mothlysalary: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (key) => {
    setFormData({
      ...formData,
      category: key.currentKey,
    });
  };


  const handleSubmit = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.mobileNumber ||
      // !formData.email ||
      !formData.category ||
      // !formData.gender ||
      !formData.mothlysalary 
    ) {
      return toast.error("Please fill out all required fields");
    }
    Setloading(true)
    const data = {
      name: `${formData.firstName} ${formData.lastName}`,
      branch: selectedBranchId,
      Number: formData.mobileNumber,
      Category: formData.category,
      mothlysalary : parseInt(formData.mothlysalary , 10),
      // gender: formData.gender,
      // address: formData.address,
      // emergencyPhone: formData.emergencyPhone,
    };

    try {
      const result = await Createstaffapi(data);
      if (result.status) {
        toast.success("Staff created successfully");
        setFormData({
          firstName: "",
          lastName: "",
          mobileNumber: "",
          email: "",
          emergencyPhone: "",
          address: "",
          gender: "",
          mothlysalary : "",
          category: "",
        });
        Setloading(false)
        dispatch(fetchStaffByBranch(selectedBranchId))
        onOpenChange()
      } else {
        toast.error("Failed to create staff");
        Setloading(false)
      }
    } catch (error) {
      console.error("An error occurred while creating the staff", error);
      toast.error("An error occurred while creating the staff");
      Setloading(false)
    }
  };

  return (

    <>
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-full text-start">
        <p className="text-lg font-semibold">Fill Staff Details</p>
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
          value={formData.firstName}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="lastName"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <Input
          type="tel"
          maxLength={10}
          name="mobileNumber"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Phone Number"
          value={formData.mobileNumber}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="mothlysalary"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Monthly Salary"
          value={formData.mothlysalary}
          onChange={handleChange}
        />
      </div>
      <div className="w-full grid lg:grid-cols-1 grid-cols-1 gap-4 place-content-center justify-between items-start ">
       {categories?.length>0 && <Select
          items={categories} 
          size="lg"
          radius="sm"
          variant="bordered"
          placeholder="Category"
          className="w-full"
          selectedKey={formData.category}
          onSelectionChange={(value) => handleSelectChange(value)}
        >
          {(Category) => <SelectItem key={Category._id}>{Category.name}</SelectItem>}
        </Select>}
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
          className="buttongradient text-white rounded-md w-60 font-bold uppercase"
          onPress={handleSubmit}
        >
        {loading?<span  className="loader2"></span>: "Create Staff"}
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
