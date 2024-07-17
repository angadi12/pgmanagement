"use client";
import { Button, Divider, Input } from "@nextui-org/react";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import electricity2 from "../../public/Loginasset/electricity2.png";
import Image from "next/image";
import { GoChevronRight } from "react-icons/go";
import Allstaff from "@/components/Staffcomponent/Allstaff";
import Salarystatus from "@/components/Staffcomponent/Salarystatus";
import Staffcomplaint from "@/components/Staffcomponent/Staffcomplaint";

const Staff = () => {
  const [selected, setSelected] = React.useState("All Staffs");

  return (
    <section className="flex justify-center items-center w-full h-auto flex-col mx-auto p-4">
      <div className="w-full px-4 text-start">
        <p className="text-lg font-semibold">Total Staff <span className="text-[#205093]">(12*)</span></p>
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
              key="All Staffs"
              title={
                <div className="flex items-center space-x-2">
                  <span>All Staffs</span>
                </div>
              }
            />
            <Tab
              key="Salary Status"
              title={
                <div className="flex items-center space-x-2">
                  <span>Salary Status</span>
                </div>
              }
            />
            <Tab
              key="Staff Complaints"
              title={
                <div className="flex items-center space-x-2">
                  <span>Staff Complaints</span>
                </div>
              }
            />
            {/* <Tab
              key="Security"
              title={
                <div className="flex items-center space-x-2">
                  <span>Security</span>
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
              className="bg-[#205093] text-background"
              endContent={<FaPlus />}
              size="sm"
            ></Button>
          </div>
        </div>
      </div>
      <Divider />
      <div className="w-full flex flex-col gap-4 justify-start items-start  mx-auto  h-auto mt-4 rounded-sm">
        {selected ==="All Staffs" && <Allstaff/>}
        {selected ==="Salary Status" && <Salarystatus/>}
       { selected ==="Staff Complaints" && <Staffcomplaint/>}
      </div>
    </section>
  );
};

export default Staff;