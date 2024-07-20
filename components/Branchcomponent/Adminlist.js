'use client'
import React, { useState } from 'react'
import Admincard from './Admincard'
import { FaCirclePlus } from "react-icons/fa6";
import { Button } from '@nextui-org/react';
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

const Adminlist = () => {
  const [selectedtab2, setSelectedtab2] = React.useState("Personal Details");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [Open, SetOpen, ] = useState(false);

  return (
    <>
    <div className='w-full mx-auto grid grid-cols-3 justify-center items-start place-content-center content-stretch gap-4 mt-20'>
     <Admincard/>
     <Admincard/>
     <Button onPress={()=>SetOpen(true)} className='w-full h-full bg-[#B9D6FF59] ring-2 ring-[#205093] rounded-md'>
     <FaCirclePlus  size={50} className='text-[#205093]'/>
     </Button>
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
              Create New Admin
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
                  {selectedtab2 === "Personal Details" && <Personaldetails/>}
                  {selectedtab2 === "Allocation & Verification" && <Allocverify/>}
                  {selectedtab2 === "User Name & Password" && <Userandpass/>}
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
  )
}

export default Adminlist