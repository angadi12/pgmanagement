import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { fetchTenantsByBranch } from "@/lib/TennatSlice";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { DatePicker } from "@nextui-org/react";
import { CalculatePaymentapi, CreatPaymentapi } from "../../lib/API/Payment";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const formatDate = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const CreatePayment = () => {
  const [lastDate, setLastDate] = useState(
    parseDate(new Date().toISOString().split("T")[0])
  );
  const [selectedKey, setSelectedKey] = useState();
  const [payment, Setpayment] = useState();
  const [filtererror, setFilterError] = useState();
  const [message, setMessage] = useState();
  const [Loading, setLoading] = useState(false);
  const [Loadingdetails, setLoadingdetails] = useState(false);
  const [filteredTenants, setFilteredTenants] = useState([]);

  const dispatch = useDispatch();
  const { tenants, status, error } = useSelector((state) => state.tenants);
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchTenantsByBranch(selectedBranchId));
    }
  }, [selectedBranchId, dispatch]);

  // const handleTennatSelect = (key) => {
  //   setSelectedKey(key);
  // };

  useEffect(() => {
    setFilteredTenants(tenants);
  }, [tenants]);

  const handleTennatSelect = (key) => {
    setSelectedKey(key);
    const selectedTenant = tenants.find((tenant) => tenant._id === key);
  
    if (selectedTenant) {
      const { StartDate, LastDate } = selectedTenant;
      setFilteredTenants((prevTenants) =>
        prevTenants.filter((tenant) => tenant._id !== key)
      );
      setLastDate(parseDate(LastDate)); // Set LastDate as a Date object
      // Update other states or fetch additional details as needed
    }
  };
  

  console.log(filteredTenants)

  const calculatePayment = async () => {
    setFilterError("");
    setMessage("");
    Setpayment(0);
    if (!selectedKey || !lastDate) {
      setFilterError("Please select Tenant and select a Last Date.");
      return;
    }

    if (filteredTenants[0]?.StartDate) {
      // Parse the StartDate and LastDueDate from the dd/mm/yyyy format
      const [startDay, startMonth, startYear] = filteredTenants[0].StartDate.split('/');
      const startDate = new Date(`${startYear}-${startMonth}-${startDay}`);
  
      const [lastDay, lastMonth, lastYear] = formatDate(lastDate).split('/');
      const lastDueDate = new Date(`${lastYear}-${lastMonth}-${lastDay}`);
  
      if (lastDueDate <= startDate) {
        return toast.error("Last Due Date must be greater than Start Date.");
      }
    }

    setLoading(true);

    const data = {
      UserId: selectedKey,
      lastdate: formatDate(lastDate),
      LastDueDate: lastDate,
      branch: selectedBranchId,
    };

    try {
      const Calculate = await CalculatePaymentapi(data);

      if (Calculate.status) {
        Setpayment(Calculate.data);
        setMessage("Payment Fetched");
      } else {
        setFilterError("An error occurred while Calculating Payment");
      }
    } catch (error) {
      setFilterError("An error occurred while Calculating Payment");
      Setpayment();
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedKey && lastDate) {
      calculatePayment();
    }
  }, [selectedKey, lastDate]);

  const CreatePayment = async () => {
    if (!selectedBranchId) {
      return toast.error("Branch not selected");
    }
    if (!payment) {
      return toast.error("payment Required");
    }
    if (!lastDate) {
      return toast.error("Last due date not selected");
    }
    if (!selectedKey) {
      return toast.error("Tenant not selected");
    }


    setLoadingdetails(true);

    const payload = {
      UserId: selectedKey,
      Amount: payment,
      LastDueDate: formatDate(lastDate),
      branch: selectedBranchId,
    };
    try {
      const Result = await CreatPaymentapi(payload);
      if (Result.status) {
        toast.success(Result.message);
        setLoadingdetails(false);
      } else {
        toast.error("Failed to create payment");
        setLoadingdetails(false);
      }
    } catch (error) {
      toast.error("error occured during create payment ");
    } finally {
      setLoadingdetails(false);
    }
  };
  
  function formatDatetwo(dateStr) {
    if (!dateStr) {
      return 'Invalid date';
    }
    const [day, month, year] = dateStr.split('/').map(Number);
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return 'Invalid date';
    }
        const date = new Date(year, month - 1, day); 
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  }
  




  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="w-full grid lg:grid-cols-1 grid-cols-1 gap-4 place-content-center justify-between items-center">
          <Autocomplete
            variant="bordered"
            radius="sm"
            className="w-full rounded-none"
            size="md"
            labelPlacement="outside"
            defaultItems={tenants}
            label="Pick a Tenant"
            placeholder="Select a Tenant"
            selectionMode="single"
            color="primary"
            selectedKey={selectedKey}
            onSelectionChange={handleTennatSelect}
          >
            {(item) => (
              <AutocompleteItem
                color="primary"
                variant="flat"
                key={item.UserId}
                className="capitalize"
              >
                {item.UserName}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>

        <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-center">
        <Input
            type="text"
            name="startDate"
            label="Start Date"
            labelPlacement="outside"
            defaultValue={formatDatetwo(filteredTenants[0]?.StartDate)}
            value={formatDatetwo(filteredTenants[0]?.StartDate)}
            variant="bordered"
            isDisabled={true}
            radius="sm"
            className="w-full rounded-none"
            size="sm"
            description="DD/MM/YY"
            color="primary"

          />
            <Input
            type="text"
            name="LastDate"
            label="Last Date"
            labelPlacement="outside"
            defaultValue={formatDatetwo(filteredTenants[0]?.LastDate)}
            value={formatDatetwo(filteredTenants[0]?.LastDate)}
            variant="bordered"
            isDisabled={true}
            radius="sm"
            className="w-full rounded-none"
            size="sm"
            description="DD/MM/YY"
            color="primary"

          />
         
         
          <DatePicker
            size="lg"
            color="primary"
            radius="sm"
            variant="bordered"
            label="Last Due Date"
            labelPlacement="outside"
            className="w-full"
            value={lastDate}
            onChange={setLastDate}
          />
          <Button
            onPress={calculatePayment}
            size="lg"
            className="w-full rounded-md bg-[#205093] text-white mt-6 uppercase text-sm font-semibold "
          >
            {Loading ? <span className="loader2"></span> : " Calculate Payment"}
          </Button>
        </div>
        {filtererror && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            variant="shadow"
            color="danger"
            className="w-auto px-4 h-8 text-xs bg-red-500 rounded-full text-white flex justify-center items-center"
          >
            {filtererror}
          </motion.p>
        )}
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            variant="shadow"
            color="danger"
            className="w-auto px-4 h-8 text-xs bg-green-500 rounded-full text-white flex justify-center items-center"
          >
            {message}
          </motion.p>
        )}
        <div className="w-full grid lg:grid-cols-1 grid-cols-1  place-content-center justify-between items-center">
          <Input
            type="text"
            name="Total Payment"
            label="Total Payment"
            labelPlacement="outside"
            defaultValue={Math.round(payment)}
            value={Math.round(payment)}
            variant="bordered"
            isDisabled={true}
            radius="sm"
            className="w-full rounded-none"
            size="md"
            placeholder="Total Payment"
            color="primary"

          />
        </div>
        <div className="flex flex-col justify-center items-center w-full gap-4">
          {/* <div className="flex flex-col justify-center items-center gap-2 border-2 border-dashed border-[#205093] rounded-lg w-72 h-24">
          <IoCloudUploadOutline size={40} className="text-[#205093]" />
          <p className="text-xs font-semibold text-gray-400">
            (Png, Jpg, Pdf only)
          </p>
        </div>
        <div>
          <p className="text-[#205093] underline text-sm font-bold">
            +Upload Receipt
          </p>
        </div> */}

          <Button
            className="buttongradient text-white rounded-md w-60 uppercase"
            onPress={CreatePayment}
          >
            {Loadingdetails ? (
              <span className="loader2"></span>
            ) : (
              "Submit & Mark as Paid"
            )}
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

export default CreatePayment;
