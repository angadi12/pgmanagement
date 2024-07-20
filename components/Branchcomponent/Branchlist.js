'use client'
import React from "react";
import Branchcard from "./Branchcard";
import { FaCirclePlus } from "react-icons/fa6";
import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Createbranch from "./Createbranch";
import { Tabs, Tab,  } from "@nextui-org/react"

const Branchlist = () => {
  const [selected, setSelected] = React.useState("Branches");
  const [selectedtab, setSelectedtab] = React.useState("Branch Details");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
    <div className="w-full grid grid-cols-2 justify-center items-center place-content-center mx-auto gap-6">
      <Branchcard />
      <Branchcard />
      <Branchcard />
      <Button onPress={onOpen} className="w-full  h-40 flex justify-center ring-2 ring-[#205093] bg-[#B9D6FF59]  items-center p-3 rounded-md">
        <FaCirclePlus size={40} className="text-[#205093]" />
      </Button>
    </div>

    <Modal
      isDismissable={false} isKeyboardDismissDisabled={true}
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
              Create New Branch
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
                    key="Branch Details"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>Branch Details</span>
                      </div>
                    }
                  />
                 
                </Tabs>
                <div className="w-full h-auto">
                {selectedtab ==="Branch Details" && <Createbranch/>}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center">
                <Button
                  className="buttongradient text-white rounded-md w-60 uppercase font-semibold"
                  onPress={onClose}
                >
                Create Branch
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </>
  );
};

export default Branchlist;
