"use client";
import React, { useState } from "react";
import { Avatar, AvatarGroup, Button, Tabs ,Tab} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Personaldetails from "./Personaldetails";
import Addstaffbycategory from "./Addstaffbycategory";

const Categorycard = ({ data }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedtab, setSelectedtab] = React.useState("Personal Details");
  const [Selectedcategory, Setselectedcategory] = useState("")

  return (
    <>

    <div className="boxshadow  rounded-lg flex justify-between items-center gap-2 py-4 h-44 w-50 flex-col">
      <div>
        <p className="font-semibold">{data?.name}</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        {data?.Staff.length > 0 ? (
          <>
            <div className="bg-[#205093] h-14 flex justify-center items-center px-4 rounded-full">
              <AvatarGroup
                isBordered
                max={3}
                total={
                  data?.Staff.length > 3
                    ? data.Staff.length - 3
                    : data.Staff.length
                }
              >
                {data?.Staff.map((staff, id) => (
                  <Avatar key={id} showFallback name={staff.name} />
                ))}
              </AvatarGroup>
            </div>
          </>
        ) : (
          <Button
            radius="sm"
            onPress={()=>{Setselectedcategory(data._id),onOpen()}}
            className="bg-[#205093] text-background"
            endContent={<FaPlus />}
            size="sm"
          >Add staff</Button>
        )}
        <p className="text-xs font-bold text-gray-400">
          {data?.Staff?.length}&nbsp;Staffs
        </p>
      </div>
    </div>


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
                  {selectedtab === "Personal Details" && <Addstaffbycategory name={data?.name} id={Selectedcategory} onOpenChange={onOpenChange} />}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center">
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Categorycard;
