'use client'
import React, { useEffect, useState } from "react";
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
  Switch
} from "@nextui-org/react";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import Updateadmindetails from "./Updateadmindetails";
import { useDispatch, useSelector } from "react-redux";
import { setAdminId, clearSelectedAdmin} from "@/lib/AdminSlice";
import { Updateadminstatusapi, GetAdminbyid } from "../../lib/API/Admin";
import Admincardskeleton from "./Admincardskeleton";

const Admincard = ({ admin }) => {
  const [selectedtab2, setSelectedtab2] = React.useState("Personal Details");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [Open, SetOpen] = useState(false);
  const [isSelected, setIsSelected] = React.useState(admin?.activate);
  const [loading, setLoading] = useState(false);
  const [adminDetails, setAdminDetails] = useState(admin);
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(setAdminId(admin._id));
    SetOpen(true);
  };

  const handleClose = () => {
    dispatch(clearSelectedAdmin());
    SetOpen(false);
  };

  useEffect(() => {
    if (!Open) {
      dispatch(clearSelectedAdmin());
    }
  }, [Open, dispatch]);

  const handleToggle = async (id) => {
    const newStatus = !isSelected;
    setIsSelected(newStatus);  

    try {
      setLoading(true);
      const response = await Updateadminstatusapi(id);

      if (response.statuscode === 200) {
        const updatedAdmin = await GetAdminbyid(id);
        if (updatedAdmin.statuscode === 200) {
          setAdminDetails(updatedAdmin.data);  
        } else {
          console.error("Error fetching updated admin details:", updatedAdmin.message);
        }
      } else {
        setIsSelected(!newStatus);
        console.error("Error updating activation status:", response.message);
      }
    } catch (error) {
      setIsSelected(!newStatus);
      console.error("Error updating activation status:", error);
    } finally {
      setLoading(false);

    }
  };

  if (loading) {
    return <Admincardskeleton />;
  }

  return (
    <>
      <div className="w-full boxshadow relative h-full rounded-md flex flex-col justify-center items-center ">
        <div className="absolute top-2 right-0">
          <Switch 
            size="sm" 
            isSelected={isSelected} 
            onValueChange={() => handleToggle(admin._id)} 
          />
        </div>
        <Image
          src={adminpic}
          alt="Profile Picture"
          className="rounded-full mx-auto -mt-12 w-24 h-24"
        />
        <h2 className="text-lg font-bold mt-2 uppercase">{adminDetails?.name}</h2>
        <p className="text-xs font-medium flex flex-wrap justify-center items-center ">
        {
          adminDetails.permission.slice(0,3).map((value,key)=>(
            <div key={key} className="flex justify-center items-center">
              <span className="text-[#1B9D31] text-tiny">{value},</span>
            </div>
          ))
        }
          {/* Access:<span className="text-[#1B9D31] ">{adminDetails.permission.join(",")}</span> */}
        </p>
        <div className="py-2">
          {isSelected 
            ? <Chip size="sm" color="success" className="text-white">Activate</Chip>
            : <Chip className="text-white" size="sm" color="danger">Deactivate</Chip>
          }
        </div>
        <div className="bg-[#F0F0F0] p-4 flex flex-col justify-center items-center w-full h-full mt-2 gap-4">
          <div className=" flex justify-between gap-4  items-center w-full">
            <div>
              <p className="text-xs font-bold flex items-center gap-2">
                <MdEmail className="text-[#205093]" />
                Email
              </p>
            </div>
            <span className="text-xs font-semibold text-gray-400 text-end">
              {adminDetails?.Email}
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
              +91{adminDetails?.Number}
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
              ---
            </span>
          </div>
          <Button onPress={handleOpen} className="buttongradient text-white w-full rounded-sm h-8">
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
        onClose={handleClose}
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
                  {/* <Tab
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
                  /> */}
                </Tabs>
                <div className="w-full h-auto">
                  {selectedtab2 === "Personal Details" && <Updateadmindetails />}
                  {/* {selectedtab2 === "Allocation & Verification" && (
                    <Allocverify />
                  )}
                  {selectedtab2 === "User Name & Password" && <Userandpass />} */}
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

export default Admincard;
