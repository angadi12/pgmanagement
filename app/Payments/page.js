"use client";
import { Button, Divider, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import person from "../../public/Loginasset/person.png";
import Image from "next/image";
import { GoChevronRight } from "react-icons/go";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Createpayment from "@/components/Paymentcomponet/Createpayment";
import { useSelector, useDispatch } from "react-redux";
import { fetchPaymentByBranch } from "../../lib/PaymentSlice";
import Updatepayment from "@/components/Paymentcomponet/Updatepayment";
import { HiPencil } from "react-icons/hi2";

const Payments = () => {
  const dispatch = useDispatch();
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );
  const payments = useSelector((state) => state.payments.payments);
  const status = useSelector((state) => state.payments.status);

  const [selected, setSelected] = React.useState("Today");
  const [selectedtab, setSelectedtab] = React.useState("Payment Details");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [Openupdate, Setopenupdate] = useState(false);
  const [paymentid,Setpaymentid]=useState("")

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchPaymentByBranch(selectedBranchId));
    }
  }, [selectedBranchId, dispatch]);

  console.log(payments);

  return (
    <>
      <section className="flex justify-center items-center w-full h-auto flex-col mx-auto p-4">
        <div className="w-full flex flex-col justify-start items-start sticky top-[4rem] z-10 bg-white py-4">
          <div className="w-full px-4 text-start">
            <p className="text-lg font-semibold">Rent Collection</p>
          </div>
          <div className="w-full flex justify-between items-center px-4 mt-4 sticky top-24">
            <div>
              <Tabs
                selectedKey={selected}
                onSelectionChange={setSelected}
                aria-label="Options"
                color="primary"
                variant="underlined"
                classNames={{
                  tabList: "gap-6 w-full relative rounded-none p-0 z-10",
                  cursor: "w-full bg-[#205093]",
                  tab: "w-24 px-0 h-10",
                  tabContent:
                    "group-data-[selected=true]:text-[#205093] font-semibold",
                }}
              >
                <Tab
                  key="Today"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Today</span>
                    </div>
                  }
                />
                <Tab
                  key="Paid Rent"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Paid Rent</span>
                    </div>
                  }
                />
                {/* <Tab
              key="Pending Rent"
              title={
                <div className="flex items-center space-x-2">
                  <span>Pending Rent</span>
                </div>
              }
            />
            <Tab
              key="Overdue"
              title={
                <div className="flex items-center space-x-2">
                  <span>Overdue</span>
                </div>
              }
            />
            <Tab
              key="History"
              title={
                <div className="flex items-center space-x-2">
                  <span>History</span>
                </div>
              }
            /> */}
              </Tabs>
            </div>
            <div className="flex gap-3 justify-end items-end">
              <Input
                isClearable
                classNames={{
                  base: "w-full sm:max-w-[60%]",
                  inputWrapper: "border-1",
                }}
                placeholder="Search by name..."
                size="sm"
                startContent={""}
                variant="bordered"
                // onClear={() => setFilterValue("")}
                // onValueChange={onSearchChange}
              />
              <div className="flex gap-3">
                <Button
                  onPress={onOpen}
                  className="bg-[#205093] text-background"
                  endContent={<FaPlus />}
                  size="sm"
                ></Button>
              </div>
            </div>
          </div>
          <Divider />
        </div>

        <div className="w-full flex flex-col gap-4 justify-start items-start p-4 mx-auto bg-[#F9F9F9] h-auto mt-2 rounded-sm">
          {status == "loading" ? (
            <div className="w-full flex justify-center items-center h-full">
              <span className="loader3"></span>
            </div>
          ) : (
            <>
              {payments?.length > 0 ? (
                <>
               {payments?.map((pay,key)=>(
                <div key={key} className="flex  justify-between items-center bg-white w-full p-3">
                  <div className="w-full flex gap-4 items-center">
                    <div className="flex justify-center items-center gap-2">
                      <div className=" w-14 h-14 rounded-full  flex justify-center items-center ">
                        <Image src={person} alt="person" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 ">
                          #tenant-ID-6754
                        </p>
                        <p className="text-sm font-semibold ">Mithul M</p>
                      </div>
                    </div>
                    <Divider orientation="vertical" className="h-14" />

                    <div className="flex flex-col">
                      <p className="text-xs font-semibold text-gray-400">
                        Room No:{" "}
                        <span className="text-black font-semibold">A7</span>
                      </p>
                      <p className="text-xs font-semibold text-gray-400">
                        Room Type:
                        <span className="text-black font-semibold">
                          Three Sharing
                        </span>
                      </p>
                    </div>
                    <Divider orientation="vertical" className="h-14" />

                    <div>
                      <Chip
                        variant="flat"
                        radius="sm"
                        className="bg-[#D3FFDA] text-[#1B9D31]"
                      >
                        Paid
                      </Chip>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center w-96">
                    <div className="flex flex-col justify-between gap-4 items-end border-r-1 border-gray-300 px-2">
                      <p className="text-xs font-medium text-gray-400">
                        Apr 09, 2024 at 5:30pm
                      </p>
                      <p className="text-lg font-bold">{pay.Amount}/-</p>
                    </div>
                    <div>
                      <Button
                        onPress={() => {Setopenupdate(true),Setpaymentid(pay._id)}}
                        variant="light"
                        size="sm"
                        className="flex  items-center gap-1 text-tiny font-bold uppercase underline text-[#205093]"
                      >
                        {" "}
                        edit <HiPencil className="text-[#205093]" />
                      </Button>
                    </div>
                  </div>
                </div>
               )) }

                </>
              ) : (
                <div>
                  <p>No payment history available</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        size="4xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center">
                Create New Payment
              </ModalHeader>
              <ModalBody>
                <Tabs
                  selectedKey={selectedtab}
                  onSelectionChange={setSelectedtab}
                  aria-label="Options"
                  color="primary"
                  variant="underlined"
                  classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 ",
                    cursor: "w-full bg-[#205093]",
                    tab: "w-auto px-0 h-10",
                    tabContent:
                      "group-data-[selected=true]:text-[#205093] font-semibold",
                  }}
                >
                  <Tab
                    key="Payment Details"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>Payment Details</span>
                      </div>
                    }
                  />
                </Tabs>
                <div className="w-full h-auto">
                  {selectedtab === "Payment Details" && <Createpayment />}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center"></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* update modal */}
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        size="4xl"
        isOpen={Openupdate}
        onOpenChange={Setopenupdate}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center">
                Update Payment
              </ModalHeader>
              <ModalBody>
                <Tabs
                  selectedKey={selectedtab}
                  onSelectionChange={setSelectedtab}
                  aria-label="Options"
                  color="primary"
                  variant="underlined"
                  classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 ",
                    cursor: "w-full bg-[#205093]",
                    tab: "w-auto px-0 h-10",
                    tabContent:
                      "group-data-[selected=true]:text-[#205093] font-semibold",
                  }}
                >
                  <Tab
                    key="Payment Details"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>Payment Details</span>
                      </div>
                    }
                  />
                </Tabs>
                <div className="w-full h-auto">
                  {selectedtab === "Payment Details" && (
                    <Updatepayment id={paymentid} Setopenupdate={Setopenupdate} />
                  )}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center"></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Payments;
