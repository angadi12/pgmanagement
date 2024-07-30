import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem, DatePicker } from "@nextui-org/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import Cookies from "js-cookie";
import { CreateExpanseapi } from "../../lib/API/Expense";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

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

const Createexpense = () => {
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

  const handleSubmit = async () => {
    if(!selectedBranchId){
      return toast.error("Branch not selected")
    }
    if(!formData.amount){
      return toast.error("amount is required ")
    }
    if(!formData.Categoery){
      return toast.error("Expanse category is required ")
    }
    if(!formData.description){
      return toast.error("description is required ")
    }
    if(!formData.name){
      return toast.error("Expanse name is required ")
    }
  



    setLoading(true);
    const month = 3
    // const month = formatDate(date);
    const branch = selectedBranchId;

    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
      month,
      branch,
    };

    try {
      const result = await CreateExpanseapi(payload);
      if(result.status){
        toast.success("Expense has been Created")
        setLoading(false);
      }else{
        toast.error("Failed to create expanse")
        setLoading(false);

      }
    } catch (error) {
      toast.error("failed to create expanse")
      setLoading(false);

    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="w-full text-start">
          <p className="text-lg font-semibold">Fill Expense Details</p>
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
        <div className="w-full text-start flex justify-start items-center gap-2 py-2">
          <p className="text-[#205093] text-sm font-bold underline cursor-pointer">
            +Add Bill
          </p>
          <span className="text-xs text-gray-400 no-underline">(Optional)</span>
        </div>
        <Button
          className="buttongradient text-white rounded-md w-60 uppercase"
          onPress={handleSubmit}
        >
          {loading ? <span className="loader2"></span> : "Create Expense"}
        </Button>
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

export default Createexpense;
