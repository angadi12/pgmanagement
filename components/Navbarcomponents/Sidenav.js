"use client";
import React, { useEffect, useState } from "react";
import Logo from "../../public/Loginasset/Logo.png";
import Image from "next/image";
import {
  Tabs,
  Tab,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { MdDashboard } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { MdMeetingRoom } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { GiExpense } from "react-icons/gi";
import { FaBell } from "react-icons/fa";
import { RiHeartAddFill } from "react-icons/ri";
import { FiLogIn } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { IoIosPeople } from "react-icons/io";
import { FaBuildingColumns } from "react-icons/fa6";
import Cookies from "js-cookie";
import {GetAdminbyid} from "../../lib/API/Auth"
import { useSelector,useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";
import { fetchUserDetails } from "@/lib/AuthSlice";

const Sidenav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [selected, setSelected] = useState("Dashboard");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const role = useSelector((state) => state.auth.role);

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (token) {
  //     const decoded = jwt_decode(token);
  //     const userId = decoded.id;
  //     dispatch(fetchUserDetails({ role, id: userId }));
  //   }
  // }, [dispatch, role]);


  useEffect(() => {
    switch (pathname) {
      case "/":
        setSelected("Dashboard");
        break;
      case "/Tenants":
        setSelected("Tenants");
        break;
      case "/Rooms":
        setSelected("Rooms");
        break;
      case "/Payments":
        setSelected("Payments");
        break;
      case "/Expense":
        setSelected("Expense");
        break;
      case "/Maintenance":
        setSelected("Maintenance");
        break;
      case "/Ourstaff":
        setSelected("Staff");
        break;

        break;
      case "/Branches":
        setSelected("Branches");
        break;
      default:
        setSelected("Dashboard");
    }
  }, [pathname]);

  const handleTabChange = (key) => {
    setSelected(key);
    switch (key) {
      case "Dashboard":
        router.push("/");
        break;
      case "Tenants":
        router.push("/Tenants");
        break;
      case "Rooms":
        router.push("/Rooms");
        break;
      case "Payments":
        router.push("/Payments");
        break;
      case "Expense":
        router.push("/Expense");
        break;
      case "Maintenance":
        router.push("/Maintenance");
        break;
      case "Staff":
        router.push("/Ourstaff");
        break;

      case "Branches":
        router.push("/Branches");
        break;
      default:
        router.push("/");
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/Signin");
  };


  const renderTabs = () => {
    const commonTabs = [
      { key: "Dashboard", title: "Dashboard", icon: <MdDashboard size={24} /> },
      { key: "Branches", title: "Manage Branches", icon: <FaBuildingColumns size={20} /> },
    ];

    const adminTabs = [
      { key: "Rooms", title: "Rooms", icon: <MdMeetingRoom size={24} /> },
      { key: "Tenants", title: "Tenants", icon: <IoPeople size={24} /> },
      { key: "Payments", title: "Payments", icon: <FaIndianRupeeSign size={24} /> },
      { key: "Expense", title: "Expense", icon: <GiExpense size={24} /> },
      { key: "Staff", title: "Our staff", icon: <IoIosPeople size={24} /> },
      { key: "Maintenance", title: "Support", icon: <RiHeartAddFill size={24} /> },
    ];

    if (user?.role === "owner") {
      return [...commonTabs, ...adminTabs];
    }

    return adminTabs.filter((tab) => user?.permission.includes(tab.key))

  };


console.log(user)

  return (
    <>
      <div
        style={{ position: "sticky", top: 0 }}
        className=" h-[100vh]  backgroundlayer w-60 lg:flex md:flex  hidden flex-col justify-between"
      >
        <div className="flex gap-3 bg-[#172953] justify-center items-center p-3 rounded-br-[3rem] ">
          <Image alt=" logo" height={40} radius="sm" src={Logo} width={40} />
          <div className="flex flex-col">
            <p className="text-md text-white font-semibold">Pantza PG for</p>
            <p className="text-small font-semibold  text-white">Men & Woman</p>
          </div>
        </div>

        <div className="flex justify-center items-center w-full h-auto ">
          <div className="flex w-full  mx-auto flex-col justify-center items-center  ">
            <Tabs
              aria-label="Options"
              isVertical={true}
              classNames={{
                tabList:
                  "gap-2 w-52 relative rounded-none p-0 bg-transparent text-white gap-2 ",
                cursor: "w-full bg-[#2a3e60] border-l-4 ",
                tab: "w-full px-0 h-10 ",
                tabContent:
                  "group-data-[selected=true]:text-white font-bold text-white",
              }}
              selectedKey={selected}
              onSelectionChange={handleTabChange}
            >
              <Tab
                onprss
                key="Dashboard"
                title={
                  <div className="flex items-center  w-44  gap-4">
                    <MdDashboard size={24} />
                    <span>Dashboard</span>
                  </div>
                }
              ></Tab>
              <Tab
                key="Branches"
                title={
                  <div className="flex items-center  w-44  gap-4">
                    <FaBuildingColumns size={20} />
                    <span>Manage Branches</span>
                  </div>
                }
              ></Tab>
              <Tab
                key="Rooms"
                title={
                  <div className="flex items-center  w-44  gap-4">
                    <MdMeetingRoom size={24} />
                    <span>Rooms</span>
                  </div>
                }
              ></Tab>
              <Tab
                key="Tenants"
                title={
                  <div className="flex items-center  w-44  gap-4">
                    <IoPeople size={24} />
                    <span>Tenants</span>
                  </div>
                }
              ></Tab>
              <Tab
                key="Payments"
                title={
                  <div className="flex items-center  w-44  gap-4">
                    <FaIndianRupeeSign size={24} />
                    <span>Payments</span>
                  </div>
                }
              ></Tab>
              <Tab
                key="Expense"
                title={
                  <div className="flex items-center  w-44  gap-4">
                    <GiExpense size={24} />
                    <span>Expense</span>
                  </div>
                }
              ></Tab>
              <Tab
                key="Staff"
                title={
                  <div className="flex items-center  w-44  gap-4">
                    <IoIosPeople size={24} />
                    <span>Our staff</span>
                  </div>
                }
              ></Tab>
              <Tab
                key="Maintenance"
                title={
                  <div className="flex items-center  w-44  gap-4">
                    <RiHeartAddFill size={24} />
                    <span>Support</span>
                  </div>
                }
              ></Tab>

              {/* {renderTabs().map((tab) => (
                <Tab key={tab.key} title={<div className="flex items-center  w-44  gap-4">
                     {tab.icon}
                    <span>{tab.title}</span>
                  </div>} />
              ))} */}
            </Tabs>
          </div>
        </div>

        <div className="flex justify-start items-start w-full h-auto mb-4 px-4 ">
          <Button
            onPress={onOpen}
            className="flex items-center  w-full justify-start bg-transparent  gap-4 text-white font-semibold"
          >
            <FiLogIn size={24} />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center">
                Confirm Logout
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to logout?</p>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center">
                <Button
                  onPress={() => {
                    handleLogout();
                    onClose();
                  }}
                  className="bg-[#205093] rounded-sm text-background"
                >
                  Yes
                </Button>
                <Button
                  size="md"
                  onPress={onClose}
                  className="bg-white ring-1 rounded-sm ring-[#205093] text-[#205093]"
                >
                  No
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Sidenav;
