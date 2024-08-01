"use client";
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import electricity2 from "../../public/Loginasset/electricity2.png";
import water from "../../public/Loginasset/water2.png";
import internet from "../../public/Loginasset/wifi2.png";
import Furniture from "../../public/Loginasset/Furniture.png";
import Maintanance from "../../public/Loginasset/Maintanance.png";
import { FaWifi } from "react-icons/fa";

import Image from "next/image";
import { GoChevronRight } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTicketsByBranch,
  fetchTicketsByStatus,
} from "../../lib/SupportSlice";
import { FaEdit } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

const categoryImages = {
  Electricity: electricity2,
  Water: water,
  Internet: internet,
  Furniture: Furniture,
  Maintenance: Maintanance,
};

const categoryColors = {
  Electricity: "#FFA100",
  Water: "#0096FF",
  Internet: "white",
  Furniture: "#00A61C",
  Maintenance: "#7B00D0",
  Default: "#7B00D0", // Default color for other categories
};

const Maintenance = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = React.useState("All Complaints");
  const dispatch = useDispatch();
  const { tickets, status } = useSelector((state) => state.tickets);
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  ); // Assuming you have branch state

  useEffect(() => {
    if (selectedBranchId) {
      if (selected === "All Complaints") {
        dispatch(fetchTicketsByBranch(selectedBranchId));
      } else if (selected === "Active Complaints") {
        dispatch(fetchTicketsByStatus("pending"));
      } else if (selected === "Resolved Complaints") {
        dispatch(fetchTicketsByStatus("resolved"));
      } else if (selected === "Closed Complaints") {
        dispatch(fetchTicketsByStatus("closed"));
      }
    }
  }, [selected, dispatch, selectedBranchId]);

  console.log(tickets);

  const renderTickets = () => {
    if (status === "loading") {
      return (
        <div className="w-full flex justify-center items-center h-[70vh]">
          <span className="loader3"></span>
        </div>
      );
    }
    if (status === "failed") {
      return (
        <p className="w-full flex justify-center items-center h-[70vh]">
          Failed to load tickets
        </p>
      );
    }
    if (!tickets || tickets.length === 0) {
      return (
        <div className="w-full flex justify-center items-center h-[70vh]">
          <span>No tickets available</span>
        </div>
      );
    }
    return tickets?.map((ticket) => {
      const categoryImage = categoryImages[ticket.Categoery] || Maintanance;
      const categoryColor =
        categoryColors[ticket.Categoery] || categoryColors.Default;

      return (
        <div
          className="w-full flex flex-col gap-4 justify-start items-start p-4 mx-auto bg-[#F9F9F9] h-auto mt-2 rounded-sm"
          key={ticket._id}
        >
          <div className=" bg-white w-full p-3 ring-1 ring-gray-100 rounded-sm">
            <div className="w-full grid grid-cols-4  justify-start items-center place-content-center gap-4">
              <div className="flex justify-between pr-4 items-center gap-4 w-60  ">
                <div className="flex justify-start items-start gap-4  ">
                  <div
                    style={{ backgroundColor: categoryColor }}
                    className="w-14 h-14 rounded-full relative flex justify-center items-center  "
                  >
                    <Image
                      src={categoryImage}
                      alt={ticket.Categoery}
                      className="absolute h-8 w-8 object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <p className="text-xs font-medium text-gray-400">
                      #{ticket.ticketId}
                    </p>
                    <p className="text-sm font-semibold ">{ticket.Categoery}</p>
                  </div>
                </div>
                <Divider orientation="vertical" className="h-16" />
              </div>

              <div className="flex  justify-start items-center gap-2 w-full col-span-2">
                <div className="flex flex-col w-full justify-start items-start gap-4">
                  <p className="text-xs font-semibold text-gray-400">
                    Ticket Issue:{" "}
                    <span className="text-black font-semibold">
                      {ticket.TicketName}
                    </span>
                  </p>
                  <p className="text-xs font-semibold text-gray-400">
                    Description:
                    <span className="text-black font-semibold">
                      {ticket.TicketDescription}
                    </span>
                  </p>
                </div>
                <Divider orientation="vertical" className="h-16" />
              </div>

              <div className="flex justify-end items-end">
                <div className="flex items-center gap-4">
                  {ticket.remark == "Done" ? (
                    <Button size="sm" className="text-[#1B9D31] bg-[#D3FFDA]">
                      Solved
                    </Button>
                  ) : ticket.status === "closed" ||
                    ticket.status === "resolved" ? (
                    ""
                  ) : (
                    <Button size="sm" variant="light" className="">
                      <FaEdit
                        onClick={onOpen}
                        className="text-[#205093]"
                        size={20}
                      />
                    </Button>
                  )}

                  <Chip
                    variant="flat"
                    radius="sm"
                    className={`${
                      ticket.status === "resolved"
                        ? "bg-[#D3FFDA] text-[#1B9D31]"
                        : ticket.status === "closed"
                        ? "bg-[#FFDFDF] text-[#ED0000]"
                        : ticket.status === "pending"
                        ? "font-bold text-[#FFA100] bg-yellow-100"
                        : ""
                    }`}
                  >
                    {ticket.status}
                  </Chip>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <section className="flex justify-center items-center w-full h-auto flex-col mx-auto p-4">

      <div className="w-full py-2 sticky top-[4.1rem] bg-white z-10">
        <div className="w-full  text-start">
          <p className="text-lg font-semibold">Maintenance and Support</p>
        </div>
        <div className="w-full flex justify-between items-center  mt-4">
          <div>
            <Tabs
              selectedKey={selected}
              onSelectionChange={setSelected}
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
                key="All Complaints"
                title={
                  <div className="flex items-center space-x-2">
                    <span>All Complaints</span>
                  </div>
                }
              />
              <Tab
                key="Active Complaints"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Active Complaints</span>
                  </div>
                }
              />
              <Tab
                key="Resolved Complaints"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Resolved Complaints</span>
                  </div>
                }
              />
              <Tab
                key="Closed Complaints"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Closed Complaints</span>
                  </div>
                }
              />
            </Tabs>
          </div>
          <div className="flex gap-3 justify-end items-end">
            {/* Search input and other elements can go here */}
          </div>
        </div>

      </div>
        <Divider />
        {renderTickets()}
      </section>

      <Modal
        backdrop="opaque"
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
              <ModalHeader className="flex flex-col gap-1">
                Resolve Tickets
              </ModalHeader>
              <ModalBody>
                <Textarea
                  isRequired
                  label="Add Comments"
                  labelPlacement="outside"
                  placeholder="Comments....."
                  className="w-full "
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-white ring-1 ring-[#205093] font-medium text-[#205093] rounded-md"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  className="bg-[#205093] text-white rounded-md"
                  onPress={onClose}
                >
                  Mark as Done
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Maintenance;
