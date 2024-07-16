import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar,Badge} from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";
import Image from "next/image";
import Bellicon from "../../public/Loginasset/Bellicon.png"
import Link from "next/link";
import { useRouter } from "next/navigation";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";


export const animals = [
  {label: "Branch 17", value: "cat", description: "The second most popular pet in the world"},
  {label: "Branch 16", value: "dog", description: "The most popular pet in the world"},
  {label: "Branch 15", value: "elephant", description: "The largest land animal"},
  {label: "Branch 14", value: "lion", description: "The king of the jungle"},
  {label: "Branch 13", value: "tiger", description: "The largest cat species"},
  {label: "Branch 12", value: "giraffe", description: "The tallest land animal"},
]

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
      <Autocomplete
      size="md"
      radius="sm"
      variant="bordered"
      defaultItems={animals}
      placeholder="Select Branch"
      className="w-60 bg-white  rounded-lg"
    >
      {(animal) => <AutocompleteItem key={animal.value}>{animal.label}</AutocompleteItem>}
    </Autocomplete>
        {/* <Input
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
        /> */}
     

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


