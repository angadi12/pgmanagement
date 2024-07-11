"use client";
import { Button, Divider, Input } from "@nextui-org/react";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import electricity2 from "../../public/Loginasset/electricity2.png";
import Image from "next/image";
import { GoChevronRight } from "react-icons/go";

const Maintenance = () => {
  const [selected, setSelected] = React.useState("All Complaints");

  return (
    <section className="flex justify-center items-center w-full h-auto flex-col mx-auto p-4">
      <div className="w-full px-4 text-start">
        <p className="text-lg font-semibold">Maintenance and Support</p>
      </div>
      <div className="w-full flex justify-between items-center px-4 mt-4">
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
              className="bg-[#205093] text-background"
              endContent={<FaPlus />}
              size="sm"
            ></Button>
          </div>
        </div>
      </div>
      <Divider />
      <div className="w-full flex flex-col gap-4 justify-start items-start p-4 mx-auto bg-[#F9F9F9] h-auto mt-2 rounded-sm">
        <div className="flex  justify-between items-center bg-white w-full p-3">
          <div className="w-full flex justify-evenly gap-4 items-center">
            <div className="flex justify-center items-center gap-4">
              <div className=" w-14 h-14 rounded-full relative flex justify-center items-center bg-[#FFA100]">
                <Image
                  src={electricity2}
                  alt="electricity"
                  className="absolute h-8 w-8 object-contain"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400">
                  #tenant-ID-6754
                </p>
                <p className="text-sm font-semibold ">Electrical Issue</p>
              </div>
            </div>
            <Divider orientation="vertical" className="h-14" />

            <div className="flex flex-col">
              <p className="text-xs font-semibold text-gray-400">
                Room No: <span className="text-black font-semibold">A7</span>
              </p>
              <p className="text-xs font-semibold text-gray-400">
                Description:
                <span className="text-black font-semibold">
                  My heater switch is broken
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
                Solved
              </Chip>
            </div>
            <Divider orientation="vertical" className="h-14" />
            <div>
              <Chip
                variant="flat"
                radius="sm"
                className="bg-[#FFDFDF] text-[#ED0000]"
              >
                Pending
              </Chip>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Maintenance;
