"use client";
import React, { useEffect, useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Createadminapi } from "@/lib/API/Admin";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { fetchBranches } from "@/lib/BranchSlice";
import { fetchAdminById, fetchAdmins } from "@/lib/AdminSlice";
import { GetAdminbyid, Updateadminapi } from "../../lib/API/Admin";

const Updateadmindetails = () => {
  const branches = useSelector((state) => state.branches.branches);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [fetchingAdmin, setFetchingAdmin] = useState(true);

  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );
  const selectedAdminid = useSelector((state) => state.admins.selectedAdminid);

  const [Admindata, SetAdmindata] = useState();

  const [formData, setFormData] = useState({
    name: "",
    Email: "",
    Number: "",
    Password: "",
    branch: "",
    permission: [],
  });

  //   useEffect(() => {
  //     if (selectedAdminid) {
  //       const result = GetAdminbyid(selectedAdminid);
  //       console.log(result.data);
  //       SetAdmindata(result.data);
  //     }
  //   }, [selectedAdminid]);

  useEffect(() => {
    const fetchAdminData = async () => {
      setFetchingAdmin(true);
      try {
        const response = await GetAdminbyid(selectedAdminid);
        if (response.data) {
          SetAdmindata(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setFetchingAdmin(false);
      }
    };

    if (selectedAdminid) {
      fetchAdminData();
    }
  }, [selectedAdminid]);

  useEffect(() => {
    if (Admindata) {
        console.log(Admindata.branch)
      setFormData({
        name: Admindata.name,
        Email: Admindata.Email,
        Number: Admindata.Number,
        Password: "",
        branch: Admindata.branch[0],
        permission: Admindata.permission,
      });
    }
  }, [Admindata, branches]);

  console.log(Admindata);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (key, selectedKeys) => {
    const selectedArray = Array.from(selectedKeys);
    if (key === "branch") {
      const selectedBranch = branches?.find(
        (branch) => branch._id === selectedArray[0]
      );
      setFormData({ ...formData, branch: selectedBranch._id });
    } else if (key === "permission") {
      setFormData({ ...formData, permission: selectedArray });
    }
  };

  const validate = () => {
    if (!formData.name) return "Name is required";
    if (!formData.Email) return "Email is required";
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.Email))
      return "Invalid email address";
    if (!formData.branch) return "Branch is required";
    if (!formData.Number) {
      return "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.Number)) {
      return "Phone Number must be 10 digits";
    }
    if (!formData.Password) return "Password is required";
    if (formData.Password !== formData.confirmPassword)
      return "Passwords do not match";
    if (formData.permission.length === 0)
      return "At least one permission is required";
    return null;
  };

  const handleSubmit = async () => {
    const error = validate();

    if (error) {
      toast.error(error);
      return;
    }
    setLoading(true);

    const result = await Updateadminapi(formData, selectedAdminid);
    console.log(result);
    if (result.status) {
      dispatch(fetchAdmins(selectedBranchId));
      setLoading(false);
    } else {
      toast.error("Failed to Update Admin");
      setLoading(false);
    }
  };

  return (
    <>
      {fetchingAdmin ? (
        <div className="flex justify-center items-center w-full h-[60vh]">
          <span className="loader3"></span>
        </div>
      ) : (
        <form className="flex flex-col justify-center items-center gap-4">
          <div className="w-full text-start">
            <p className="text-lg font-semibold">Update Admin Details </p>
          </div>
          <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              variant="bordered"
              radius="sm"
              color="primary"
              className="w-full rounded-none"
              size="lg"
              placeholder="Full Name"
            />

            <Input
              type="text"
              color="primary"
              name="Number"
              value={formData.Number}
              onChange={handleInputChange}
              variant="bordered"
              radius="sm"
              className="w-full rounded-none"
              size="lg"
              placeholder="Phone Number"
            />
          </div>
          <div className="w-full grid lg:grid-cols-1 grid-cols-1 gap-4 place-content-center justify-between items-start ">
            <Input
              type="text"
              name="Email"
              color="primary"
              value={formData.Email}
              onChange={handleInputChange}
              variant="bordered"
              radius="sm"
              className="w-full rounded-none"
              size="lg"
              placeholder="Email"
            />
          </div>

          <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
            <Select
              selectedKeys={new Set(formData.permission)}
              onSelectionChange={(selectedKeys) =>
                handleSelectChange("permission", selectedKeys)
              }
              size="lg"
              radius="sm"
              selectionMode="multiple"
              variant="bordered"
              color="primary"
              placeholder="Permission"
              className="w-full"
              multiple
            >
              <SelectItem  color="primary"   variant="flat"  key="Rooms">Rooms</SelectItem>
              <SelectItem  color="primary"   variant="flat"  key="Tenant">Tenant</SelectItem>
              <SelectItem  color="primary"   variant="flat"  key="Expense">Expense</SelectItem>
              <SelectItem  color="primary"   variant="flat"  key="Payment">Payment</SelectItem>
            </Select>
            <Select
              selectedKeys={new Set([formData.branch])}
              onSelectionChange={(selectedKeys) =>
                handleSelectChange("branch", selectedKeys)
              }
              size="lg"
              radius="sm"
              variant="bordered"
              color="primary"
              placeholder="Assign Branch"
              className="w-full"
            >
              {branches?.map((branch) => (
                <SelectItem  color="primary"   variant="flat"  key={branch._id} value={branch._id}>
                  {branch.Branchname}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
            <Input
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleInputChange}
              variant="bordered"
              color="primary"
              radius="sm"
              className="w-full rounded-none"
              size="lg"
              placeholder="Password"
            />
            <Input
              type="password"
              name="confirmPassword"
              color="primary"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              variant="bordered"
              radius="sm"
              className="w-full rounded-none"
              size="lg"
              placeholder="Confirm Password"
            />
          </div>

          {/* <div className="w-full text-start flex justify-start items-center gap-2 py-2">
            <p className="text-[#205093] text-sm font-bold underline cursor-pointer">
              +Upload Admin Image
            </p>
            <span className="text-xs text-gray-400 no-underline">
              (For Profile Picture - PNG, JPG only)
            </span>
          </div> */}
          <div className="flex justify-center items-center w-full">
            <Button
              onPress={handleSubmit}
              className="buttongradient text-white rounded-md w-60 uppercase font-semibold"
            >
              {loading ? <span className="loader2"></span> : "Update"}
            </Button>
          </div>
        </form>
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

export default Updateadmindetails;
