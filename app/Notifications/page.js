"use client";
import { Button, Divider, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import person from "../../public/Loginasset/person.png";
import Image from "next/image";
import { GoChevronRight } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Createnotice from "@/components/Notificationcomponent/Createnotice";
import Createfood from "@/components/Notificationcomponent/Createfood";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotificationByBranch } from "../../lib/NotificationSlice";
import { MdDelete } from "react-icons/md";
import { Deletenotification} from "../../lib/API/Notification"
import toast, { Toaster } from "react-hot-toast";

const Notifications = () => {
  const [selected, setSelected] = React.useState("All Notifications");
  const [selectedtab, setSelectedtab] = React.useState("Notice");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const status = useSelector((state) => state.notifications.status);

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchNotificationByBranch(selectedBranchId));
    }
  }, [selectedBranchId, dispatch]);


  const deleteNotification = async (id) => {
    setLoading(true);
    try {
      const result = await Deletenotification(id);
      if (result.status) {
        // toast.success(result.message);
        dispatch(fetchNotificationByBranch(selectedBranchId));
      } else {
        toast.error("Failed to delete notification");
      }
    } catch (error) {
      toast.error("Error occurred while deleting notification");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
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
            </Tabs>
          </div>
          <div className="flex gap-3 justify-end items-end">
            <div className="flex gap-3">
              <Button
                onPress={onOpen}
                className="bg-[#205093] text-background"
                endContent={<FaPlus />}
                size="sm"
              ></Button>
            </div>
          </div>
        </div>
        <Divider />
        <div className="w-full flex flex-col gap-4 justify-start items-start p-2 mx-auto bg-slate-50  h-auto mt-2 rounded-sm">
          {status == "loading" ? (
            <div className="flex justify-center items-center h-[60vh] w-full">
            <span className="loader3"></span>
            </div>
          ) : (
            <>
              {notifications.length > 0 ? (
                <>

                {
                  notifications?.map((noti,value)=>(

                <div key={value} className="flex  justify-between items-center bg-white w-full p-2">
                  <div className="w-full flex gap-4 items-center">
                    <div className="flex justify-center items-center gap-4">
                      <div className=" w-14 h-14 rounded-full  flex justify-center items-center ">
                        <Image src={person} alt="person" />
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-semibold ">
                         {noti.type}
                        </p>
                        <Divider className="h-12  m-2" orientation="vertical"/>

                        <div className="flex flex-col justify-start items-start gap-2">
                        <p className="text-tiny font-semibold text-gray-400">
                        {noti.titile}
                        </p>
                        <p className="text-xs font-semibold text-gray-400">
                        {noti.titile}
                        </p>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center ">
                  <Button onPress={()=>deleteNotification(noti._id)} isIconOnly variant="light" className="">
                   { loading?<span className="loader4"></span>:<MdDelete size={24} className="text-red-400" />}

                  </Button>
                  </div>
                
                </div>

                  ))
                }
                </>
              ) : (
                <div className="flex justify-center items-center h-[60vh] w-full">
                <p>Notification not available</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

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
                Create New Notice
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
                    key="Notice"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>Notice</span>
                      </div>
                    }
                  />
                  <Tab
                    key="Food"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>Food</span>
                      </div>
                    }
                  />
                </Tabs>
                <div className="w-full h-auto">
                  {selectedtab === "Notice" && <Createnotice />}
                  {selectedtab === "Food" && <Createfood />}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center"></ModalFooter>
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

export default Notifications;
