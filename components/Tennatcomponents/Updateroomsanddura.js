"use client";
import React, { useEffect, useState } from "react";
import { DatePicker, Button, Input } from "@nextui-org/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useSelector, useDispatch } from "react-redux";
import { UpadteTenantapi } from "@/lib/API/Tennat";
import toast, { Toaster } from "react-hot-toast";
import { fetchTenantsByBranch, fetchSingleTenant } from "@/lib/TennatSlice";
import { fetchRoomsByBranch } from "@/lib/RoomSlice";
import { clearPersonalDetails, setCurrentStep } from "@/lib/CreatetenantSlice";

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

const formatDate = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const convertToISODate = (dateString) => {
  const [month, day, year] = dateString.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const Updateroomsanddura = ({ Setopenedit }) => {
  const [startDate, setStartDate] = useState(parseDate(new Date().toISOString().split("T")[0]));
  const [endDate, setEndDate] = useState(parseDate(new Date().toISOString().split("T")[0]));
  const [roomPrice, setRoomPrice] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  const [security, setSecurity] = useState(0);
  const [maintenance, setMaintenance] = useState(0);
  const [dueAmount, setDueAmount] = useState(0);
  const [totalRent, setTotalRent] = useState(0);
  const [numberOfMonths, setNumberOfMonths] = useState(1);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const singleTenant = useSelector((state) => state.tenants.singleTenant);
  const selectedRoomId = useSelector((state) => state.createTenant.selectedRoomId);
  const rooms = useSelector((state) => state.rooms.rooms);
  const selectedBranchId = useSelector((state) => state.branches.selectedBranchId);
  const selectedTenantId = useSelector((state) => state.tenants.selectedTenantId);
  const personalDetails = useSelector((state) => state.createTenant.personalDetails);

  useEffect(() => {
    if (isValidObjectId(selectedTenantId)) {
      dispatch(fetchSingleTenant({ tenantId: selectedTenantId }));
    } else {
      console.error("Invalid ObjectId(s) provided");
    }
  }, [selectedTenantId, dispatch]);

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchRoomsByBranch(selectedBranchId));
    }
  }, [selectedBranchId, dispatch]);

  useEffect(() => {
    if (singleTenant && rooms) {
      const roomDetails = rooms.find((room) => room._id === selectedRoomId);
      setRoomPrice(roomDetails.Price);
      const isoStartDate = convertToISODate(singleTenant.StartDate);
      const isoLastDate = convertToISODate(singleTenant.LastDate);
      setStartDate(parseDate(isoStartDate));
      setEndDate(parseDate(isoLastDate));
      setPaidAmount(singleTenant.Payment[0]?.Amount);
      setSecurity(singleTenant.Payment[0]?.Security);
      setMaintenance(singleTenant.Payment[0]?.Maintaince);
      setNumberOfMonths(singleTenant?.NumberOfmonth);
      setDueAmount(singleTenant.Payment[0]?.DueAmount);
    }
  }, [singleTenant, rooms, selectedRoomId]);

  useEffect(() => {
    if (roomPrice && numberOfMonths) {
      const total = roomPrice * numberOfMonths;
      setTotalRent(total);
      setDueAmount(total - paidAmount);
    }
  }, [roomPrice, numberOfMonths, paidAmount]);

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
  }, [startDate, numberOfMonths]);

  const handleUpdateTenant = async () => {
    if (!startDate || !endDate || !paidAmount) {
      setError("All fields are required");
      return;
    }
    setError(null);
    setLoading(true);

    const data = {
      UserName: personalDetails?.UserName,
      UserNumber: personalDetails?.UserNumber,
      AadharNumber: personalDetails?.aadharNumber,
      Address: personalDetails?.address,
      StartDate: formatDate(startDate),
      LastDate: formatDate(endDate),
      room: selectedRoomId,
      Amount: paidAmount,
      Maintaince: maintenance,
      Security: security,
      DueAmount: dueAmount,
      NumberOfmonth: numberOfMonths,
      branch: selectedBranchId,
    };

    try {
      const result = await UpadteTenantapi(data, selectedTenantId);
      if (result.status) {
        toast.success("Tenant Updated successfully");
        dispatch(fetchTenantsByBranch(selectedBranchId));
        dispatch(clearPersonalDetails());
        Setopenedit(false);
        dispatch(setCurrentStep('Availability'));
      } else {
        toast.error(result.message);
        setError(result.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
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
            label="Start Date"
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
            defaultValue={roomPrice}
            placeholder={roomPrice}
            variant="bordered"
            isDisabled={true}
            radius="sm"
            className="w-full rounded-none"
            size="lg"
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
            placeholder="Paid Amount"
            value={paidAmount}
            onChange={handlePaidAmountChange}
          />
        </div>
        <div className="w-full flex  py-2 justify-end items-end ">
          <div className="flex  justify-start items-start gap-4">
            <div >
         <Button  className=" text-white buttongradient  rounded-md">Room Rent : {roomPrice}</Button>
        
         </div>

            <Button className=" text-white bg-red-500 rounded-md">
              Overdue : {dueAmount}
            </Button>
          </div>
        </div>

        <div className="flex justify-center items-center w-full">
          <Button
            onPress={handleUpdateTenant}
            className="buttongradient text-white rounded-md w-60 uppercase font-semibold"
          >
            {loading ? <span className="loader2"></span> : "Update"}
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

export default Updateroomsanddura;
