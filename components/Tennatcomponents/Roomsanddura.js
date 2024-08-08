"use client"
import React, { useEffect, useState } from "react";
import { DatePicker, Button } from "@nextui-org/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import {Input} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { Creattennatmapi } from "@/lib/API/Tennat";
import toast, { Toaster } from "react-hot-toast";
import { fetchTenantsByBranch } from "@/lib/TennatSlice";
import  {setCurrentStep,clearPersonalDetails} from "../../lib/CreatetenantSlice"

const formatDate = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const Roomsanddura = ({Setopenmodal}) => {
  const [startDate, setStartDate] = useState(parseDate(new Date().toISOString().split('T')[0]));
  const [endDate, setEndDate] = useState(parseDate(new Date().toISOString().split('T')[0]));
  const [roomPrice, setRoomPrice] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  const [security, setSecurity] = useState(0);
  const [maintenance, setMaintenance] = useState(0);
  const [numberOfMonths, setNumberOfMonths] = useState(1);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalRent, setTotalRent] = useState(0);
  const [dueAmount, setDueAmount] = useState(0);

  const selectedRoomId = useSelector((state) => state.createTenant.selectedRoomId);
  const rooms = useSelector((state) => state.rooms.rooms);
  const roomDetails = rooms.find(room => room._id === selectedRoomId);
  const personalDetails = useSelector(
    (state) => state.createTenant.personalDetails
  );
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );


  

 useEffect(() => {
    if (roomDetails) {
      setRoomPrice(roomDetails.Price);
      calculateTotalRent(roomDetails.Price, numberOfMonths);
    }
  }, [roomDetails, numberOfMonths]);


  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate.toString());
      const end = new Date(endDate.toString());
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      setNumberOfMonths(months);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startDate && numberOfMonths > 0) {
      const start = new Date(startDate.toString());
      const newEndDate = new Date(start.setMonth(start.getMonth() + numberOfMonths));
      setEndDate(parseDate(newEndDate.toISOString().split('T')[0]));
    }
  }, [numberOfMonths]);





  const calculateTotalRent = (price, months) => {
    const total = price * months;
    setTotalRent(total);
    setDueAmount(total - paidAmount);
  };




  const handleCreateTenant = async () => {
    if (!startDate || paidAmount === "" || security === "" || maintenance === "" || numberOfMonths < 1) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);



    const data = {
      UserName: personalDetails.UserName,
      UserNumber: personalDetails.UserNumber,
      AadharNumber: personalDetails.aadharNumber,
      Address: personalDetails.address,
      StartDate: formatDate(startDate),
      LastDate: formatDate(endDate),
      room: selectedRoomId,
      Amount: paidAmount,
      Maintaince: maintenance,
      Security:security,
      DueAmount: dueAmount,
      NumberOfmonth: numberOfMonths,
      branch: selectedBranchId
    };

    try {
      const result = await Creattennatmapi(data);
      if (result.status) {
        toast.success("Tenant created successfully")
        dispatch(fetchTenantsByBranch(selectedBranchId));
        Setopenmodal(false)
        dispatch(clearPersonalDetails())
        dispatch(setCurrentStep("Availability"))

      } else {
        toast.error(result.message)
        setError(result.message);
       
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handlePaidAmountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > totalRent) {
      toast.error("Paid amount cannot be greater than total rent.");
    } else {
      setPaidAmount(value);
      setDueAmount(totalRent - value);
    }
  };

  return (
    <>
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-full text-start">
        <p className="text-lg font-semibold">Choose Duration & Room Type</p>
      </div>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-6 place-content-center justify-between items-start ">
        <DatePicker
          size="lg"
          radius="sm"
          variant="bordered"
          label="Start Date"
          labelPlacement="outside"
          className="w-full"
          value={startDate}
          onChange={setStartDate}
        />
        
        <DatePicker
          size="lg"
          radius="sm"
          variant="bordered"
          label="Last Date"
          labelPlacement="outside"
          className="w-full"
          value={endDate}
          onChange={setEndDate}
        />
        
        <Input
            type="number"
            name="NumberOfmonth"
            label="Number of months"
            labelPlacement="outside"
            variant="bordered"
            radius="sm"
            className="w-full rounded-none"
            size="lg"
            placeholder="Number of months"
            value={numberOfMonths}
            onChange={(e) => setNumberOfMonths(parseInt(e.target.value, 10))}
          />
        <Input
            type="number"
            name="Security"
            label="Security"
            labelPlacement="outside"
            variant="bordered"
            radius="sm"
            className="w-full rounded-none"
            size="lg"
            placeholder="0"
            value={security}
            onChange={(e) => setSecurity(parseInt(e.target.value, 10))}
          />
          <Input
            type="number"
            name="Maintainance"
            label="Maintainance"
            labelPlacement="outside"
            variant="bordered"
            radius="sm"
            className="w-full rounded-none"
            size="lg"
            placeholder="0"
            value={maintenance}
            onChange={(e) => setMaintenance(parseInt(e.target.value, 10))}
          />
        {/* <Input
          type="text"
          name="Roomprice"
          label="Room Rent"
          labelPlacement="outside"
          defaultValue={roomDetails?.Price}
          variant="bordered"
          isDisabled={true}
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Room Rent"
        
        /> */}
        <Input
          type="number"
          name="Paidamount"
          variant="bordered"
          label="Amount paid by Tenant"
          labelPlacement="outside"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="0"
          value={paidAmount}
          
          onChange={handlePaidAmountChange}
          />
      </div>
      <div className="w-full flex  py-2 justify-end items-end ">
         <div className="flex  justify-start items-start gap-4">
         <div >
         <Button className=" text-white buttongradient  rounded-md">Rent : {roomDetails?.Price}</Button>
      
         </div>

        <Button className=" text-white bg-red-500 rounded-md">
        Overdue  : {dueAmount}
        </Button>
         </div>
      </div>

      <div className="flex justify-center items-center w-full">
        <Button onPress={handleCreateTenant} className="buttongradient text-white rounded-md w-60 uppercase font-semibold">
          {loading?<span className="loader2"></span>:"Create"}
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

export default Roomsanddura;
