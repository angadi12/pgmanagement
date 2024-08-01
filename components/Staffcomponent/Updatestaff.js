import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Createstaffapi } from "../../lib/API/Staff";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../../lib/StaffSlice";
import toast, { Toaster } from "react-hot-toast";
import { fetchStaffByBranch } from "../../lib/StaffSlice";
import { Upadtstaffapi, GetStaffbyid } from "../../lib/API/Staff";

const Updatestaff = ({ Setopenedit, id }) => {
  const dispatch = useDispatch();
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );

  const categories = useSelector((state) => state.staff.categories);
  const [loading, Setloading] = useState(false);
  const [loadingdata, Setloadingdata] = useState(true);

  useEffect(() => {
    dispatch(fetchAllCategories());
    fetchStaffDetails();
  }, [dispatch,id]);

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

  const fetchStaffDetails = async () => {
    try {
      const result = await GetStaffbyid(id);
      if (result.status) {
        const staff = result.data;
        const [firstName, lastName] = staff.name.split(" ");
        setFormData({
          firstName,
          lastName,
          mobileNumber: staff.Number,
          mothlysalary: staff.mothlysalary.toString(),
          category: staff.Category._id,
        });
        Setloadingdata(false);
      } else {
        toast.error("Failed to fetch staff details");
        Setloadingdata(false);
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching the staff details",
        error
      );
      toast.error("An error occurred while fetching the staff details");
      Setloadingdata(false);
    } finally {
      Setloadingdata(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (selectedKeys) => {
    const selectedArray = Array.from(selectedKeys);
    setFormData({
      ...formData,
      category: selectedArray[0],
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.mobileNumber ||
      !formData.category ||
      !formData.mothlysalary
    ) {
      return toast.error("Please fill out all required fields");
    }
    Setloading(true);
    const data = {
      name: `${formData.firstName} ${formData.lastName}`,
      branch: selectedBranchId,
      Number: formData.mobileNumber,
      Category: formData.category,
      mothlysalary: parseInt(formData.mothlysalary, 10),
    };

    try {
      const result = await Upadtstaffapi(data,id);
      if (result.statuscode===200) {
        toast.success("Staff updated successfully");
        setFormData({
          firstName: "",
          lastName: "",
          mobileNumber: "",
          mothlysalary: "",
          category: "",
        });
        Setloading(false);
        dispatch(fetchStaffByBranch(selectedBranchId));
        Setopenedit(false);
      } else {
        toast.error("Failed to update staff");
        Setloading(false);
      }
    } catch (error) {
      console.error("An error occurred while updating the staff", error);
      toast.error("An error occurred while updating the staff");
      Setloading(false);
    }
  };

  return (
    <>
      {loadingdata ? (
        <div className="flex justify-center items-center w-full h-80">
          <span className="loader3"></span>
        </div>
      ) : (
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
            {categories?.length > 0 && (
              <Select
                value={formData.category}
                size="lg"
                radius="sm"
                variant="bordered"
                placeholder="Category"
                className="w-full"
                isDisabled
                selectedKeys={new Set([formData.category])}
                onSelectionChange={handleSelectChange}
              >
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </Select>
            )}
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
              {loading ? <span className="loader2"></span> : "Update Staff"}
            </Button>
          </div>
        </div>
      )}

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

export default Updatestaff;
