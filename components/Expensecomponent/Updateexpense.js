import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem, DatePicker } from "@nextui-org/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import Cookies from "js-cookie";
import { CreateExpanseapi } from "../../lib/API/Expense";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {Getexpensebyid,UpadteExpenseapi} from "../../lib/API/Expense"
import {fetchExpensesByBranch} from "../../lib/ExpenseSlice"

export const animals = [
  { key: "Matainence", label: "Matainence" },
  { key: "Expense ", label: "Expense " },
];

const formatDate = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
};

const Updateexpense = ({id,Setopenupdate}) => {
  const dispatch = useDispatch();
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
    Categoery: "",
  });
  const [date, setDate] = useState(
    parseDate(new Date().toISOString().split("T")[0])
  );
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (key, selectedKeys) => {
    const selectedArray = Array.from(selectedKeys);
    if (key === "Categoery") {
      setFormData((prevData) => ({
        ...prevData,
        Categoery: selectedArray[0],
      }));
    }
  };

  useEffect(() => {
    const fetchExpenseDetails = async () => {
      try {
        const result = await Getexpensebyid(id);
        if (result.status) {
          const { name, description, amount, Categoery,  } = result.data;
          setFormData({ name, description, amount, Categoery });
          // setDate(parseDate(date));
        } else {
          console.lo("Failed to fetch expense details");
        }
      } catch (error) {
        console.log("Error fetching expense details");
      }finally {
        setInitialLoading(false);
      }
    };

    fetchExpenseDetails();
  }, [id]);







  const handleSubmit = async () => {
    if (!selectedBranchId) {
      return toast.error("Branch not selected");
    }
    if (!formData.amount) {
      return toast.error("Amount is required");
    }
    if (!formData.Categoery) {
      return toast.error("Expense category is required");
    }
    if (!formData.description) {
      return toast.error("Description is required");
    }
    if (!formData.name) {
      return toast.error("Expense name is required");
    }

    setLoading(true);
    const month = 1
    const branch = selectedBranchId;

    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
      month,
      branch,
    };

    try {
      const result = await UpadteExpenseapi(payload, id);
      if (result.status) {
        toast.success("Expense has been updated");
        setLoading(false);
        dispatch(fetchExpensesByBranch(selectedBranchId));
        Setopenupdate(false)
      } else {
        toast.error("Failed to update expense");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed to update expense");
      setLoading(false);
    }
  };
  
  

  return (
    <>
     {initialLoading?<div className="flex justify-center items-center w-full h-80">
      <span className="loader3"></span>
     </div>: <div className="flex flex-col justify-center items-center gap-6">
        <div className="w-full text-start">
          <p className="text-lg font-semibold">Update Expense Details</p>
        </div>
        <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-6 place-content-center justify-between items-start ">
          <Input
            type="text"
            name="name"
            variant="bordered"
            radius="sm"
            className="w-full rounded-none"
            size="lg"
            placeholder="Expense Name"
            value={formData.name}
            onChange={handleChange}
          />
          <Select
            value={formData.Categoery}
            size="lg"
            radius="sm"
            variant="bordered"
            placeholder="Expense Category"
            className="w-full"
            selectedKeys={new Set([formData.Categoery])}
            onSelectionChange={(selectedKeys) => handleSelectChange("Categoery", selectedKeys)}
          >
            {animals.map((animal) => (
              <SelectItem key={animal.key} value={animal.key}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
          <DatePicker
            size="lg"
            radius="sm"
            variant="bordered"
            className="w-full"
            value={date}
            onChange={setDate}
          />
          <Input
            type="number"
            name="amount"
            variant="bordered"
            radius="sm"
            className="w-full rounded-none"
            size="lg"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <div className="w-full grid lg:grid-cols-1 grid-cols-1 gap-4 place-content-center justify-between items-start ">
          <Input
            type="text"
            name="description"
            variant="bordered"
            radius="sm"
            className="w-full rounded-none"
            size="lg"
            placeholder="Expense Description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        {/* <div className="w-full text-start flex justify-start items-center gap-2 py-2">
          <p className="text-[#205093] text-sm font-bold underline cursor-pointer">
            +Add Bill
          </p>
          <span className="text-xs text-gray-400 no-underline">(Optional)</span>
        </div> */}
        <Button
          className="buttongradient text-white rounded-md w-60 uppercase"
          onPress={handleSubmit}
        >
          {loading ? <span className="loader2"></span> : "Update Expense"}
        </Button>
      </div>}

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


export default Updateexpense