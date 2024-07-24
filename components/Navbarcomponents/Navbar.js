"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
} from "@nextui-org/react";
import Image from "next/image";
import Bellicon from "../../public/Loginasset/Bellicon.png";
import { useRouter } from "next/navigation";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches, setSelectedBranch } from "../../lib/BranchSlice";
import { BsBuildingsFill } from "react-icons/bs";

export default function Navbarr() {
  const router = useRouter();
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branches.branches);
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );
  const [selectedKey, setSelectedKey] = useState(selectedBranchId);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  useEffect(() => {
    if (branches?.length > 0 && selectedKey === null) {
      setSelectedKey(branches[0]?._id);
      dispatch(setSelectedBranch(branches[0]?._id));
    }
  }, [branches, selectedKey, dispatch]);

  const handleBranchSelect = (key) => {
    setSelectedKey(key);
    dispatch(setSelectedBranch(key));
  };

  const routetonoti = () => {
    router.push("/Notifications");
  };
  return (
    <Navbar isBordered maxWidth="full">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <p>Hello Admin!</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
       {branches?.length>0 && <Autocomplete
          startContent={<BsBuildingsFill className="text-[#005CFF]" size={24} />}
          inputProps={{
            classNames: {
              input: "uppercase",
            },
          }}
          size="md"
          radius="sm"
          variant="bordered"
          defaultItems={branches?.map((branch) => ({
            key: branch?._id,
            label: branch?.Branchname,
            value: branch?._id,
          }))}
          placeholder="Select Branch"
          className="w-60 bg-white rounded-lg uppercase"
          selectedKey={selectedKey}
          onSelectionChange={handleBranchSelect}
        >
          {(branch) => (
            <AutocompleteItem   color="primary"   variant="flat"     startContent={<BsBuildingsFill className="text-gray-600" size={10} />}
  key={branch?.value} value={branch?.id} className="uppercase flex items-center gap-2">
            {branch?.label}
            </AutocompleteItem>
          )}
        </Autocomplete>}

        <Badge onClick={routetonoti} content="" color="primary">
          <Image
            onClick={routetonoti}
            className="object-contain h-10 w-10 cursor-pointer"
            src={Bellicon}
            alt="Bellicon"
          />
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
