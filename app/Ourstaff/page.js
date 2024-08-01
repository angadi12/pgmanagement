"use client";
import { Button, Divider, Input } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import electricity2 from "../../public/Loginasset/electricity2.png";
import Image from "next/image";
import { GoChevronRight } from "react-icons/go";
import Allstaff from "@/components/Staffcomponent/Allstaff";
import Salarystatus from "@/components/Staffcomponent/Salarystatus";
import Staffcomplaint from "@/components/Staffcomponent/Staffcomplaint";
import Personaldetails from "@/components/Staffcomponent/Personaldetails";
import { Addcategory } from "../../lib/API/Staff";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories ,setSearchQuery } from "@/lib/StaffSlice";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

const categories = [
  { label: "Security", value: "security" },
  { label: "Housekeeping", value: "housekeeping" },
  { label: "Maintenance", value: "maintenance" },
  { label: "Cook", value: "cook" },
  { label: "Manager", value: "manager" },
  { label: "Receptionist", value: "receptionist" },
  { label: "Cleaner", value: "cleaner" },
  { label: "Electrician", value: "electrician" },
  { label: "Plumber", value: "plumber" },
  { label: "Gardener", value: "gardener" },
  { label: "Warden", value: "warden" }
];


const Staff = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState("Manage Staffs");
  const [selectedtab, setSelectedtab] = React.useState("Personal Details");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loadingadd, Setloadingadd] = useState(false);
  const [isOpendropdown, setIsOpendropdown] = React.useState(false);
  const searchQuery = useSelector((state) => state.staff.searchQuery);


  const handleAddCategory = async () => {
    if (!selectedCategory) return toast.error("Select Category");
    Setloadingadd(true);
    const data = { name: selectedCategory };
    try {
      const result = await Addcategory(data);
      if (result.status) {
        dispatch(fetchAllCategories());
        setNewCategory(""); // Clear the input after successful addition
        Setloadingadd(false);
      } else {
        toast.error("Failed to add category");
        Setloadingadd(false);
      }
    } catch (error) {
      console.log("An error occurred while adding the category");
      Setloadingadd(false);
    }
  };

  // const handleSearchChange = (e) => {
  //   dispatch(setSearchQuery(e.target.value));
  // };
  const handleSearchChange = (event) => {
    const query = event.target.value;
    if (selected === "Manage Staffs") {
      dispatch(setSearchQuery(query));
    } 
  };


  return (
    <>
      <section className="flex justify-center items-center w-full h-auto flex-col mx-auto ">
        <div className="w-full justify-start items-start gap-4 sticky top-16 bg-white z-20">
          <div className="w-full px-4 py-2 text-start">
            <p className="text-lg font-semibold">Manage Staff</p>
          </div>
          <div className="w-full flex justify-between items-center px-4 mt-4 ">
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
                  key="Manage Staffs"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Manage Staffs</span>
                    </div>
                  }
                />
                <Tab
                  key="All Staffs"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>All Staffs</span>
                    </div>
                  }
                />
                {/* <Tab
              key="Staff Complaints"
              title={
                <div className="flex items-center space-x-2">
                  <span>Staff Complaints</span>
                </div>
              }
            /> */}
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
            <div className="flex gap-3 justify-end items-center pb-2">
             {selected === "Manage Staffs" && <Input
                isClearable
                radius="sm"
                color="primary"
                classNames={{
                  base: "w-full sm:max-w-[60%]",
                  inputWrapper: "border-1",
                }}
                placeholder="Search by name..."
                size="md"
                startContent={""}
                variant="bordered"
                value={searchQuery}
                onClear={() => dispatch(setSearchQuery(''))}
                onChange={handleSearchChange}
              />}
              <div className="flex justify-center items-center gap-3">
                {selected === "Manage Staffs" ? (
                  <>
                    <Autocomplete
                      size="md"
                      color="primary"
                      variant="bordered"
                      radius="sm"
                      placeholder="Add Category"
                      className="w-60 rounded-sm "
                      selectedKey={selectedCategory}
                      onSelectionChange={setSelectedCategory}
                    >
                      {categories.map((Category) => (
                        <AutocompleteItem
                          key={Category.value}
                          value={Category.value}
                        >
                          {Category.label}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                    <Button
                      className="bg-[#205093] text-background"
                      onPress={handleAddCategory}
                      size="md"
                    >
                      {loadingadd ? (
                        <span className="loader2"></span>
                      ) : (
                        <FaPlus />
                      )}
                    </Button>
                  </>
                ) : (
                  <Button
                    radius="sm"
                    onPress={onOpen}
                    className="bg-[#205093] text-background"
                    endContent={<FaPlus />}
                    size="sm"
                  ></Button>
                )}
              </div>
            </div>
          </div>
          <Divider />
        </div>

        <div className="w-full flex flex-col gap-4 justify-start items-start  mx-auto  h-auto mt-4 rounded-sm">
          {selected === "Manage Staffs" && <Allstaff />}
          {selected === "All Staffs" && <Salarystatus />}
          {/* { selected ==="Staff Complaints" && <Staffcomplaint/>} */}
        </div>
      </section>


{/* Create */}
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
                Create New Staff
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
                    key="Personal Details"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>Personal Details</span>
                      </div>
                    }
                  />
                  {/* <Tab
                    key="Salary & Role"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>Salary & Role</span>
                      </div>
                    }
                  /> */}
                </Tabs>
                <div className="w-full h-auto">
                  {selectedtab === "Personal Details" && <Personaldetails onOpenChange={onOpenChange} />}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center">
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>




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

export default Staff;
