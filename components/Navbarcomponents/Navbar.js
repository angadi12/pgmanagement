import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar,Badge} from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";
import Image from "next/image";
import Bellicon from "../../public/Loginasset/Bellicon.png"
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Navbarr() {
const router=useRouter()

  const routetonoti=()=>{
    router.push("/Notifications")
  }
  return (
    <Navbar  isBordered maxWidth="full">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
        <p>Hello Admin!</p>
        </NavbarBrand>
       
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[14rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-white ring-1 ring-gray-200 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<IoIosSearch size={18} />}
          type="search"
        />
     

         <Badge onClick={routetonoti} content="" color="primary">

          <Image onClick={routetonoti} className="object-contain h-10 w-10 cursor-pointer" src={Bellicon} alt="Bellicon"/>
         </Badge>
     

       
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              radius="md"
              as="button"
              className="transition-transform"
              color="primary"
              name="Pavan Alimkar"
              size="sm"
            />
           
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">Santosh@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
         
            <DropdownItem key="logout" color="primary">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}


