import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { fetchTenantsByBranch } from "@/lib/TennatSlice";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { DatePicker } from "@nextui-org/react";
import {
  CalculatePaymentapi,
  UpadtePaymentapi,
  GetPaymentbyid,
} from "../../lib/API/Payment";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { fetchPaymentByBranch } from "../../lib/PaymentSlice";


const formatDate = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
};

const Updatepayment = ({ id, Setopenupdate }) => {
  const [lastDate, setLastDate] = useState(
    parseDate(new Date().toISOString().split("T")[0])
  );
  const [selectedKey, setSelectedKey] = useState();
  const [payment, Setpayment] = useState();
  const [filtererror, setFilterError] = useState();
  const [message, setMessage] = useState();
  const [Loading, setLoading] = useState(false);
  const [Loadingdetails, setLoadingdetails] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

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

  const fetchPaymentDetails = async () => {
    setInitialLoading(true);
    try {
      const result = await GetPaymentbyid(id);
      if (result.status) {
        const { UserId, Amount, LastDueDate, branch } = result.data;
        setSelectedKey(UserId);
        Setpayment(Amount);
        setLastDate(parseDate(LastDueDate));
        // Add other necessary state updates if needed
      } else {
        console.log("Failed to fetch payment details");
      }
    } catch (error) {
      console.log("Error fetching payment details");
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentDetails();
  }, [id]);

  const handleTennatSelect = (key) => {
    setSelectedKey(key);
  };

  const calculatePayment = async () => {
    setFilterError("");
    setMessage("");
    Setpayment(0);
    if (!selectedKey || !lastDate) {
      setFilterError("Please select Tenant and select a Last Date.");
      return;
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


  const updatePayment = async () => {
    if (!selectedBranchId) {
      return toast.error("Branch not selected");
    }
    if (!payment) {
      return toast.error("Payment required");
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
      const result = await UpadtePaymentapi(payload, id);
      if (result.status) {
        toast.success("Payment has been updated");
        dispatch(fetchPaymentByBranch(selectedBranchId))
        setLoadingdetails(false);
        Setopenupdate(false)
      } else {
        toast.error("Failed to update payment");
        setLoadingdetails(false);
      }
    } catch (error) {
      toast.error("Error occurred during updating payment");
      setLoadingdetails(false);
    }
  };

  return (
    <>
      {initialLoading ? (
        <div className="w-full flex justify-center items-center h-80">
          <span className="loader3"></span>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="w-full text-start">
            <p className="text-lg font-semibold">Update Payment Details </p>
          </div>
          <div className="w-full grid lg:grid-cols-1 grid-cols-1 gap-4 place-content-center justify-between items-center">
           { tenants?.length>0 &&<Autocomplete
              variant="bordered"
              isDisabled
              radius="sm"
              className="w-full rounded-none"
              size="lg"
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
                  key={item?.UserId}
                  className="capitalize"
                >
                  {item?.UserName}
                </AutocompleteItem>
              )}
            </Autocomplete>}
          </div>

          <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-center">
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
              {Loading ? (
                <span className="loader2"></span>
              ) : (
                " Calculate Payment"
              )}
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
              defaultValue={payment}
              value={payment}
              variant="bordered"
              isDisabled={true}
              radius="sm"
              className="w-full rounded-none"
              size="lg"
              placeholder="Total Payment"
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
              onPress={updatePayment}
            >
              {Loadingdetails ? (
                <span className="loader2"></span>
              ) : (
                "Submit & Mark as Paid"
              )}
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

export default Updatepayment;
