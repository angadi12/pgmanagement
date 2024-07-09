"use client"
import React, { useEffect, useState } from "react";
import Logo from "../../public/Loginasset/Logo.png";
import Image from "next/image";
import { Tabs, Tab, Card, CardBody, Button } from "@nextui-org/react";
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

const Sidenav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [selected, setSelected] = useState("Dashboard");


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
      case "/Notifications":
        setSelected("Notifications");
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
      case "Notifications":
        router.push("/Notifications");
        break;
      default:
        router.push("/");
    }
  };

  return (
    <div
      style={{ position: "sticky", top: 0 }}
      className=" h-[100vh]  backgroundlayer w-60 flex flex-col justify-between"
    >
      <div className="flex gap-3 bg-[#172953] justify-center items-center p-3 rounded-br-[3rem] ">
        <Image alt=" logo" height={40} radius="sm" src={Logo} width={40} />
        <div className="flex flex-col">
          <p className="text-md text-white font-semibold">Pantza PG for</p>
          <p className="text-small font-semibold  text-white">Men & Woman</p>
        </div>
      </div>

      <div className="flex justify-center items-center w-full h-auto ">
        <div className="flex w-full mx-auto flex-col justify-center items-center  ">
          <Tabs
            aria-label="Options"
            isVertical={true}
            classNames={{
              tabList:
                "gap-2 w-52 relative rounded-none p-0 bg-transparent text-white",
              cursor: "w-full bg-[#2a3e60] border-l-4 ",
              tab: "w-full px-0 h-10",
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
                <div  className="flex items-center  w-32  gap-4">
                  <MdDashboard size={24} />
                  <span>Dashboard</span>
                </div>
              }
            ></Tab>
            <Tab
              key="Tenants"
              title={
                <div  className="flex items-center  w-32  gap-4">
                  <IoPeople size={24} />
                  <span>Tenants</span>
                </div>
              }
            ></Tab>
            <Tab
              key="Rooms"
              title={
                <div  className="flex items-center  w-32  gap-4">
                  <MdMeetingRoom size={24} />
                  <span>Rooms</span>
                </div>
              }
            ></Tab>
            <Tab
              key="Payments"
              title={
                <div className="flex items-center  w-32  gap-4">
                  <FaIndianRupeeSign size={24} />
                  <span>Payments</span>
                </div>
              }
            ></Tab>
            <Tab
              key="Expense"
              title={
                <div className="flex items-center  w-32  gap-4">
                  <GiExpense size={24} />
                  <span>Expense</span>
                </div>
              }
            ></Tab>
            <Tab
              key="Maintenance"
              title={
                <div className="flex items-center  w-32  gap-4">
                  <RiHeartAddFill size={24} />
                  <span>Maintenance</span>
                </div>
              }
            ></Tab>
            <Tab
              key="Notifications"
              title={
                <div className="flex items-center  w-32  gap-4">
                  <FaBell size={24} />
                  <span>Notifications</span>
                </div>
              }
            ></Tab>
          </Tabs>
        </div>
      </div>

      <div className="flex justify-center items-center w-full h-auto mb-4 ">
        <Button className="flex items-center  w-52 bg-transparent  gap-4 text-white font-semibold">
          <FiLogIn size={24} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidenav;