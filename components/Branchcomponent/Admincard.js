'use client'
import React, { useState } from "react";
import Image from "next/image";
import adminpic from "../../public/Loginasset/adminpic.png";
import { MdEmail } from "react-icons/md";
import { Button } from "@nextui-org/react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import Personaldetails from './Personaldetails';
import Allocverify from './Allocverify';
import Userandpass from './Userandpass';

const Admincard = () => {
  const [selectedtab2, setSelectedtab2] = React.useState("Personal Details");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [Open, SetOpen, ] = useState(false);
  return (
    <>
      <div className="w-full boxshadow h-full rounded-md flex flex-col justify-center items-center ">
        <Image
          src={adminpic}
          alt="Profile Picture"
          className="rounded-full mx-auto -mt-12 w-24 h-24"
        />
        <h2 class="text-lg font-bold mt-2">Mithul M</h2>
        <p className="text-sm font-bold flex items-center gap-2">
          Branch 1:<span className="text-[#1B9D31]">Full Access</span>
        </p>
        <div className="bg-[#F0F0F0] p-4 flex flex-col justify-center items-center w-full mt-2 gap-4">
          <div className=" flex justify-between gap-4  items-center w-full">
            <div>
              <p className="text-xs font-bold flex items-center gap-2">
                <MdEmail className="text-[#205093]" />
                Email
              </p>
            </div>
            <span className="text-xs font-semibold text-gray-400 text-end">
              mithulofficial02@gmail.com
            </span>
          </div>
          <div className=" flex justify-between gap-4  items-center w-full">
            <div>
              <p className="text-xs font-bold flex items-center gap-2">
                <FaPhoneAlt className="text-[#205093]" />
                Contact
              </p>
            </div>
            <span className="text-[0.7rem] font-semibold text-gray-400 text-end">
              +91-7353830989 (+91-6382645389)
            </span>
          </div>
          <div className=" flex justify-between gap-4  items-center w-full">
            <div>
              <p className="text-xs font-bold flex items-center gap-2">
                <FaLocationDot className="text-[#205093]" />
                Address
              </p>
            </div>
            <span className="text-[0.7rem] font-semibold text-gray-400 text-end">
              This is a Sample Address of this particular Individual or Tenant
            </span>
          </div>
          <Button onPress={()=>SetOpen(true)} className="buttongradient text-white w-full rounded-sm h-8">
            View / Edit
          </Button>
        </div>
      </div>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        size="4xl"
        isOpen={Open}
        onOpenChange={SetOpen}
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
              View / Edit Admin
              </ModalHeader>
              <ModalBody>
                <Tabs
                  selectedKey={selectedtab2}
                  onSelectionChange={setSelectedtab2}
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
                  <Tab
                    key="Allocation & Verification"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>Allocation & Verification</span>
                      </div>
                    }
                  />
                  <Tab
                    key="User Name & Password"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>User Name & Password</span>
                      </div>
                    }
                  />
                </Tabs>
                <div className="w-full h-auto">
                  {selectedtab2 === "Personal Details" && <Personaldetails />}
                  {selectedtab2 === "Allocation & Verification" && (
                    <Allocverify />
                  )}
                  {selectedtab2 === "User Name & Password" && <Userandpass />}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center">
                <Button
                  className="buttongradient text-white rounded-md w-60 uppercase font-semibold"
                  onPress={onClose}
                >
                  Next
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Admincard;
