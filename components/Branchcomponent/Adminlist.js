'use client'
import React, { useEffect, useState } from 'react'
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
import { useSelector, useDispatch } from "react-redux";
import { fetchAdmins } from '@/lib/AdminSlice';

const Adminlist = () => {
  const [selectedtab2, setSelectedtab2] = React.useState("Personal Details");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [Open, SetOpen, ] = useState(false);
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.admins); 
  const status = useSelector((state) => state.admins.status); 
  const selectedBranchId = useSelector((state) => state.branches.selectedBranchId); 
  const filterQuery = useSelector((state) => state.admins.filterQuery);
  const [filteredAdmins, setFilteredAdmins] = useState(admins);


  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchAdmins(selectedBranchId));
    }
  }, [selectedBranchId, dispatch]);

  useEffect(() => {
    setFilteredAdmins(
      admins?.filter((admin) =>
        typeof admin.name === "string" &&
      admin.name.toLowerCase().includes(filterQuery.toLowerCase())
      )
    );
  }, [admins, filterQuery]);
  

  return (
    <>
    <div className='w-full h-auto  mx-auto grid grid-cols-3 justify-center items-start place-content-center content-stretch gap-y-16 gap-4 mt-20'>
    {status === "loading" && (
          <div className="w-full col-span-3 flex justify-center items-center">
          <span className="loader3 "></span>
          </div>
        )}
        {status !== "loading" && filteredAdmins?.length === 0 && (
          <div className="w-full h-40 col-span-3 flex justify-center items-center flex-col gap-4  rounded-md">
            <p>No admins found.</p>
            <FaCirclePlus onClick={()=>SetOpen(true)}  size={50} className='text-[#205093]'/>
          </div>
        )}
        {status !== "loading" && filteredAdmins?.map((admin) => (
          <Admincard key={admin._id} admin={admin} />
        ))}
    {/* {status !== "loading" && <Button onPress={()=>SetOpen(true)} className='w-full h-72 bg-[#B9D6FF59] ring-2 ring-[#205093] rounded-md'>
     <FaCirclePlus  size={50} className='text-[#205093]'/>
     </Button>} */}
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
                  {/* <Tab
                    key="Allocation & Verification"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>Allocation & Verification</span>
                      </div>
                    }
                  /> */}
                  {/* <Tab
                    key="User Name & Password"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>User Name & Password</span>
                      </div>
                    }
                  /> */}
                </Tabs>
                <div className="w-full h-auto">
                  {selectedtab2 === "Personal Details" && <Personaldetails/>}
                  {/* {selectedtab2 === "Allocation & Verification" && <Allocverify/>}
                  {selectedtab2 === "User Name & Password" && <Userandpass/>} */}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center">
               
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </>
  )
}

export default Adminlist