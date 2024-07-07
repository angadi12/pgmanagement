import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar,Badge} from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";
import Image from "next/image";
import Bellicon from "../../public/Loginasset/Bellicon.png"

export default function Navbarr() {
  return (
    <Navbar isBordered maxWidth="full">
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
         <Badge content="" color="primary">

        <Image className="object-contain h-10 w-10" src={Bellicon} alt="Bellicon"/>
         </Badge>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              radius="md"
              as="button"
              className="transition-transform"
              color="primary"
              name="Santosh Alimkar"
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


