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
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { IoMenu } from "react-icons/io5";
import { fetchNotificationByBranch } from "@/lib/NotificationSlice";
import Cookies from "js-cookie";

export default function Navbarr() {
  const router = useRouter();
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branches.branches);
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  const { user } = useSelector((state) => state.auth);

  const [selectedKey, setSelectedKey] = useState(selectedBranchId);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [isdelete, Setisdelete] = useState(false);

  // useEffect(() => {
  //   dispatch(fetchBranches()).then(() => setIsLoading(false));
  // }, [dispatch]);

  // useEffect(() => {
  //   if (branches?.length > 0 && selectedKey === null) {
  //     setSelectedKey(branches[0]?._id);
  //     dispatch(setSelectedBranch(branches[0]?._id));
  //   }
  // }, [branches, selectedKey, dispatch]);

  useEffect(() => {
    if (user?.role === "admin" && user.branch) {
      setSelectedKey(user.branch);
      dispatch(setSelectedBranch(user.branch));
    } else if (branches?.length > 0 && selectedKey === null) {
      setSelectedKey(branches[0]?._id);
      dispatch(setSelectedBranch(branches[0]?._id));
    }
  }, [branches, selectedKey, dispatch, user]);

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchNotificationByBranch(selectedBranchId));
    }
  }, [selectedBranchId, dispatch]);

  useEffect(() => {
    if (!isLoading && branches?.length === 0) {
      onOpen();
    }
  }, [isLoading, branches, onOpen]);

  const handleBranchSelect = (key) => {
    setSelectedKey(key);
    dispatch(setSelectedBranch(key));
  };

  const routetonoti = () => {
    router.push("/Notifications");
  };

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/Signin");
  };
  return (
    <>
      <Navbar isBordered maxWidth="full">
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4 hidden md:flex lg:flex">
            <p>Hello Admin!</p>
          </NavbarBrand>
          <NavbarBrand className="-ml-4 block md:hidden lg:hidden">
            <IoMenu size={24} />
          </NavbarBrand>
        </NavbarContent>

        {user?.role === "admin" ?
        <NavbarContent as="div" className="items-center" justify="end">
        
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                radius="md"
                as="button"
                className="transition-transform hidden md:flex lg:flex"
                color="primary"
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">Admin</p>
              </DropdownItem>

              <DropdownItem
                onPress={() => Setisdelete(true)}
                key="logout"
                color="primary"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>:
        <NavbarContent as="div" className="items-center" justify="end">
          {branches?.length > 0  && (
            <Autocomplete
              color="primary"
              startContent={
                <BsBuildingsFill className="text-[#005CFF]" size={24} />
              }
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
              isDisabled={user?.role === "admin"}
            >
              {(branch) => (
                <AutocompleteItem
                  color="primary"
                  variant="flat"
                  startContent={
                    <BsBuildingsFill className="text-gray-600" size={10} />
                  }
                  key={branch?.value}
                  value={branch?.id}
                  className="uppercase flex items-center gap-2"
                >
                  {branch?.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
          )}

          <Badge
            onClick={routetonoti}
            content={notifications?.length}
            color="primary"
          >
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
                className="transition-transform hidden md:flex lg:flex"
                color="primary"
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">Admin</p>
              </DropdownItem>

              <DropdownItem
                onPress={() => Setisdelete(true)}
                key="logout"
                color="primary"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
        
        
        }

      </Navbar>


      

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
                No Branches Found
              </ModalHeader>
              <ModalBody>
                <p>Please select a branch to proceed.</p>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center">
                <Button
                  onPress={onClose}
                  className="bg-[#205093] text-background"
                >
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        isOpen={isdelete}
        onOpenChange={Setisdelete}
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
                  onPress={() => Setisdelete(false)}
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
}
