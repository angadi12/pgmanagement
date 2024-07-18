"use client"
import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../public/Loginasset/Logo.png";
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import { Superadminlogin } from "@/lib/API/Auth";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from "js-cookie";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Checkbox,
  Button,
} from "@nextui-org/react";

const Loginpage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const properties = ["Property 1", "Property 2", "Property 3"]; // Example properties

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async () => {
    const data = {
      Email: email,
      Password: password,
    };
    const result = await Superadminlogin(data);
    if (result.status) {
      console.log(result.token)
      Cookies.set("token", result.token, { expires: 7 });
      window.location.href = "/";
    } else {
      toast.error(result.message || "An error occurred");
    }
  };



  return (
    <>
    <main className="h-screen w-full backgroundlayer flex justify-center items-center flex-col">
      {/* <Image src={Wave1} className='object-contain w-full'/> */}
      <div className="md:w-96 lg:w-96 w-11/12 h-auto rounded-lg overflow-hidden mx-auto">
        <div className="flex gap-3 bg-[#172953] justify-center items-center py-2  ">
          <Image alt=" logo" height={40} radius="sm" src={Logo} width={40} />
          <div className="flex flex-col">
            <p className="text-md text-white font-semibold">Pantza PG for</p>
            <p className="text-small font-semibold  text-white">Men & Woman</p>
          </div>
        </div>
        <div className="flex gap-3 justify-center bg-[#00000040] items-center py-4 flex-col">
          <div className="flex justify-center items-center py-2">
            <h2 className="text-white font-semibold ">Admin Login</h2>
          </div>
          <div className="w-full flex justify-center items-center flex-col gap-3">
            <div className="bg-[#324970] rounded-md w-11/12 mx-auto h-12 flex justify-start px-2 items-center gap-4">
              <FaUser className="text-white" size={24} />
              <input
                className="outline-none bg-transparent text-white placeholder:text-white placeholder:text-sm placeholder:font-medium"
                placeholder="User Name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="bg-[#324970] rounded-md w-11/12 mx-auto h-12 flex justify-start px-2 items-center gap-4">
              <IoMdLock className="text-white" size={24} />
              <input
                className="outline-none bg-transparent text-white placeholder:text-white placeholder:text-sm placeholder:font-medium w-full"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div onClick={toggleDropdown} className="bg-[#324970]  relative rounded-md w-11/12 mx-auto h-12 flex justify-start px-2 items-center gap-4">
              <BiSolidBuildingHouse className="text-white" size={24} />
              <input
                className="outline-none bg-transparent text-sm text-white placeholder:text-white placeholder:text-sm placeholder:font-medium"
                placeholder="Property"
                value={selectedProperty}
              />
                {isDropdownOpen ? (
                  <IoChevronUp className="text-white ml-14" size={24} />
                ) : (
                  <IoChevronDownOutline className="text-white ml-14" size={24} />
                )}
                {isDropdownOpen && (
                <div className="absolute w-full top-full mt-1 z-20 bg-[#324970] left-0 right-0  rounded-md">
                  {properties.map((property) => (
                    <div
                      key={property}
                      onClick={() => handlePropertySelect(property)}
                      className="cursor-pointer px-4 py-2 text-white hover:bg-[#2a3e60] text-sm"
                    >
                      {property}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex py-2 px-4 justify-between w-full">
            <Checkbox
              classNames={{
                label: "text-small text-white opacity-70",
              }}
            >
              Remember me
            </Checkbox>
            <Link
              color="primary"
              href="#"
              size="sm"
              className="text-white opacity-70"
            >
              Forgot password?
            </Link>
          </div>
          <div className="w-full flex justify-center items-center py-2">
            <Button onPress={handleSubmit} className="buttongradient w-11/12 text-white font-semibold rounded-md">
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center fixed bottom-2">
        <p className="text-sm font-semibold text-white">Designed by AWT</p>
      </div>

      
    </main>
    <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
    </>
  );
};

export default Loginpage;
