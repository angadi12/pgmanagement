"use client";
import { Button, Divider, Input } from "@nextui-org/react";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import person from "../../public/Loginasset/person.png";
import Image from "next/image";
import { GoChevronRight } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";

const page = () => {
  const [selected, setSelected] = React.useState("All Notifications");

  return (
    <section className="flex justify-center items-center w-full h-auto flex-col mx-auto p-4">
      <div className="w-full px-4 text-start">
        <p className="text-lg font-semibold">Notifications</p>
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
              key="All Notifications"
              title={
                <div className="flex items-center space-x-2">
                  <span>All Notifications</span>
                </div>
              }
            />
            <Tab
              key="Payments"
              title={
                <div className="flex items-center space-x-2">
                  <span>Payments</span>
                </div>
              }
            />
            <Tab
              key="Maintenance"
              title={
                <div className="flex items-center space-x-2">
                  <span>Maintenance</span>
                </div>
              }
            />
            <Tab
              key="General"
              title={
                <div className="flex items-center space-x-2">
                  <span>General</span>
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
      <div className="w-full flex flex-col gap-4 justify-start items-start p-2 mx-auto  h-auto mt-2 rounded-sm">
      <div className="flex  justify-between items-center bg-white w-full p-2">
          <div className="w-full flex gap-4 items-center">
            <div className="flex justify-center items-center gap-4">
              <div className=" w-14 h-14 rounded-full  flex justify-center items-center ">
                <Image src={person} alt="person" />
              </div>
              <div className="flex items-center gap-1">
                <p className="text-xs font-semibold ">
                  #tenant-ID-6754
                </p>
                <p className="text-xs font-semibold text-gray-400"> has raised a complaint! Please resolve</p>
              </div>
            </div>
           
          </div>
          <div className="flex gap-4 items-center ">
             <BsThreeDots size={24} className="text-gray-400"/>
          </div>
        </div>
        <Divider/>
      </div>
    </section>
  );
};

export default page;
