"use client"
import React, { useEffect, useState } from "react";
import { DatePicker, Button } from "@nextui-org/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import {Input} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { UpadteTenantapi } from "@/lib/API/Tennat";
import toast, { Toaster } from "react-hot-toast";
import { fetchTenantsByBranch,fetchSingleTenant } from "@/lib/TennatSlice";

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);


const Updateroomsanddura = ({Setopenedit}) => {
  const [value, setValue] = React.useState(parseDate("2024-04-04"));
  const [startDate, setStartDate] = useState(parseDate("2024-04-04"));
  const [endDate, setEndDate] = useState(parseDate("2024-04-04"));
  const [roomPrice, setRoomPrice] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const singleTenant = useSelector((state) => state.tenants.singleTenant);

  const selectedRoomId = useSelector((state) => state.createTenant.selectedRoomId);
  const rooms = useSelector((state) => state.rooms.rooms);
  const roomDetails = rooms.find(room => room._id === selectedRoomId);
  const personalDetails = useSelector(
    (state) => state.createTenant.personalDetails
  );
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );
  const selectedTenantId = useSelector(
    (state) => state.tenants.selectedTenantId
  );

  const calculateNumberOfMonths = (start, end) => {
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    const startMonth = start.getMonth();
    const endMonth = end.getMonth();

    return (endYear - startYear) * 12 + (endMonth - startMonth);
  };

  useEffect(() => {
    if ( isValidObjectId(selectedTenantId)) {
      dispatch(fetchSingleTenant({tenantId: selectedTenantId }));
    } else {
      console.error("Invalid ObjectId(s) provided");
    }
  }, [selectedTenantId]);



  const handleCreateTenant = async () => {
    if (!startDate || !endDate || !paidAmount) {
      setError("All fields are required");
      return;
    }
    setError(null);
    setLoading(true);

    const numberOfMonths = calculateNumberOfMonths(new Date(startDate), new Date(endDate));

    const data = {
      UserName: personalDetails.UserName,
      UserNumber: personalDetails.UserNumber,
      StartDate: startDate.toString(),
      LastDate:endDate.toString(),
      room: selectedRoomId,
      Amount: paidAmount,
      Maintaince: 0,
      Security: 0,
      DueAmount: roomDetails?.Price - paidAmount,
      NumberOfmonth: numberOfMonths,
      branch: selectedBranchId
    };

    try {
      const result = await UpadteTenantapi(data,selectedTenantId);
      if (result.status) {
        toast.success("Tenant created successfully")
        dispatch(fetchTenantsByBranch(selectedBranchId));
        Setopenedit(false)
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
    const value = e.target.value;
    if (parseInt(value, 10) > roomDetails?.Price) {
     toast.error("Paid amount cannot be greater than room price.");
    } else {
      setPaidAmount(value);
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
          label="Last Date"
          labelPlacement="outside"
          variant="bordered"
          className="w-full"
          value={endDate}
          onChange={setEndDate}
        />
        <Input
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
        
        />
        <Input
          type="text"
          name="Paidamount"
          variant="bordered"
          label="Amount paid by Tenant"
          labelPlacement="outside"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Paid Amount"
          value={paidAmount}
          
          onChange={handlePaidAmountChange}
          />
      </div>
      <div className="w-full flex flex-col py-2 justify-end items-end ">
         <div className="flex flex-col justify-start items-start gap-4">
         {/* <div >
         <p>Room Price : {roomDetails?.Price}</p>
         <p>Total Paid : {paidAmount}</p>

         </div> */}

        <Button className=" text-white bg-red-500 rounded-md">
        Overdue  : {roomDetails?.Price - paidAmount}
        </Button>
         </div>
      </div>

      <div className="flex justify-center items-center w-full">
        <Button onPress={handleCreateTenant} className="buttongradient text-white rounded-md w-60 uppercase font-semibold">
          {loading?<span className="loader2"></span>:"Update"}
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



export default Updateroomsanddura