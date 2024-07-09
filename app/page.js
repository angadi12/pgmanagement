"use client";
import Loginpage from "@/components/Logincomponents/Loginpage";
import { Button, Divider } from "@nextui-org/react";
import Image from "next/image";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { IoPeople } from "react-icons/io5";
import { FaB, FaBed } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { FaCircle } from "react-icons/fa6";
import Revenueovr from "@/components/Chartcomponent/Revenueovr";
import Expensebreak from "@/components/Chartcomponent/Expensebreak";

export const users = [
  {
    key: "1",
    name: "Tony ",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey ",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane ",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William ",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    key: "5",
    name: "Emily ",
    role: "Marketing Manager",
    status: "Active",
  },
  {
    key: "6",
    name: "Brian ",
    role: "Product Manager",
    status: "Active",
  },
  {
    key: "7",
    name: "Laura ",
    role: "UX Designer",
    status: "Active",
  },
  {
    key: "8",
    name: "Michael ",
    role: "Data Analyst",
    status: "Paused",
  },
  {
    key: "9",
    name: "Sophia ",
    role: "Quality Assurance",
    status: "Active",
  },
  {
    key: "10",
    name: "James ",
    role: "Front-end Developer",
    status: "Vacation",
  },
];
export default function Home() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);
  return (
    <main className="flex flex-col gap-8 justify-center items-center p-4 mx-auto w-full h-auto">
      <div className="w-full grid grid-cols-2 gap-6 justify-center place-content-center mx-auto">
        <div className="flex flex-col gap-4 w-full justify-start items-start  h-auto">
          <div className="flex flex-col gap-2 justify-start items-start w-full">
            <div className="w-full flex justify-between items-center  ">
              <p className="text-sm font-bold">Overall Status</p>
              <p className="text-sm font-bold text-[#16C133]">Live</p>
            </div>
            <div className="grid grid-cols-3 gap-6 justify-center place-content-center items-center mx-auto w-full ">
              <div className="boxshadow w-36 h-36 rounded-lg flex justify-center items-center gap-2 flex-col">
                <div className="h-14 w-14 rounded-full bg-[#205093] text-white flex justify-center items-center">
                  <IoPeople size={24} />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold">72</p>
                  <p className="text-xs font-semibold text-[#8B8B8B]">
                    Total Tenants
                  </p>
                </div>
              </div>
              <div className="boxshadow w-36 h-36 rounded-lg flex justify-center items-center gap-2 flex-col">
                <div className="h-14 w-14 rounded-full bg-[#1B9D31] text-white flex justify-center items-center">
                  <FaBed size={24} />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold">72</p>
                  <p className="text-xs font-semibold text-[#8B8B8B]">
                    Vacant Beds
                  </p>
                </div>
              </div>
              <div className="boxshadow w-36 h-36 rounded-lg flex justify-center items-center gap-2 flex-col">
                <div className="h-14 w-14 rounded-full bg-[#FFA200] text-white flex justify-center items-center">
                  <IoIosWarning size={24} />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="flex gap-1 items-center">
                    <div className="flex flex-col justify-center items-center gap-1">
                      <p className="text-[0.6rem] font-semibold text-[#ED0000]">
                        Pending
                      </p>
                      <p className="font-bold text-xs">12</p>
                    </div>
                    <Divider className="h-6" orientation="vertical" />
                    <div className="flex flex-col justify-center items-center gap-1">
                      <p className="text-[0.6rem] font-semibold text-[#00A61C]">
                        Resolved
                      </p>
                      <p className="font-bold text-xs">12</p>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-[#8B8B8B]">
                    Complaints Received
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-start items-start w-full">
            <div className="w-full flex justify-between items-center  ">
              <p className="text-sm font-bold">Available Rooms</p>
              <p className="text-sm font-bold text-[#8B8B8B]">Floor 1</p>
            </div>
            <div className="grid grid-cols-1 gap-6 justify-center place-content-center items-center mx-auto w-full ">
              <div className="ring-1 ring-gray-300  w-full px-4 h-44 rounded-lg flex justify-start items-center gap-4">
                <div className=" grid grid-cols-5 gap-3 items-start">
                  <div className="h-12 w-12 rounded-md bg-[#FFA200] text-white flex justify-center items-center">
                    <FaBed size={24} />
                  </div>
                  <div className="h-12 w-12 rounded-md bg-[#FFA200] text-white flex justify-center items-center">
                    <FaBed size={24} />
                  </div>
                  <div className="h-12 w-12 rounded-md bg-[#FFA200] text-white flex justify-center items-center">
                    <FaBed size={24} />
                  </div>
                  <div className="h-12 w-12 rounded-md bg-[#1B9D31] text-white flex justify-center items-center">
                    <FaBed size={24} />
                  </div>
                  <div className="h-12 w-12 rounded-md bg-[#FFA200] text-white flex justify-center items-center">
                    <FaBed size={24} />
                  </div>
                  <div className="h-12 w-12 rounded-md bg-[#1B9D31] text-white flex justify-center items-center">
                    <FaBed size={24} />
                  </div>
                  <div className="h-12 w-12 rounded-md bg-[#1B9D31] text-white flex justify-center items-center">
                    <FaBed size={24} />
                  </div>
                  <div className="h-12 w-12 rounded-md bg-[#FFA200] text-white flex justify-center items-center">
                    <FaBed size={24} />
                  </div>
                  <div className="h-12 w-12 rounded-md bg-[#ED0000] text-white flex justify-center items-center">
                    <FaBed size={24} />
                  </div>
                  <div className="h-12 w-12 rounded-md bg-[#ED0000] text-white flex justify-center items-center">
                    <FaBed size={24} />
                  </div>
                </div>
                <Divider className="h-32" orientation="vertical" />
                <div className="flex flex-col justify-between items-start gap-4">
                  <div className="flex flex-col justify-start items-start">
                    <p className="font-semibold">Floor 1</p>
                    <p className="text-xs text-[#787878] font-medium">
                      Total Rooms: 10
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start w-full gap-1">
                    <p className="flex justify-center items-center gap-1 text-xs font-semibold">
                      <FaCircle className="text-[#1B9D31]" />
                      Available: 3
                    </p>
                    <p className="flex justify-center items-center gap-1 text-xs font-semibold">
                      <FaCircle className="text-[#FFA200]" />
                      On hold: 5
                    </p>
                    <p className="flex justify-center items-center gap-1 text-xs font-semibold">
                      <FaCircle className="text-[#ED0000]" />
                      Occupied: 2
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-start items-start  h-auto">
          <div className="flex flex-col gap-2 justify-start items-start w-full">
            <div className="w-full flex justify-between items-center  ">
              <p className="text-sm font-bold">Tenant Status</p>
              <p className="text-sm font-bold text-[#8B8B8B]">3 Months</p>
            </div>
            <div className="flex flex-col justify-start items-start w-full">
              <div className="w-full flex justify-between items-center h-14 bg-[#205093] p-2 rounded-t-md ">
                <p className="text-sm font-bold text-white">Active Tenants</p>
                <Button
                  variant="solid"
                  className="text-sm font-bold bg-[#205093] text-white  "
                >
                  + Add Tenant
                </Button>
              </div>
              <div className="w-full">
                <Table
                  aria-label="Example table with client side pagination"
                  bottomContent={
                    <div className="flex w-full justify-center">
                      <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                      />
                    </div>
                  }
                  classNames={{
                    wrapper: " rounded-t-none ",
                  }}
                >
                  <TableHeader>
                    <TableColumn key="name">NAME</TableColumn>
                    <TableColumn key="Room No.">Room No.</TableColumn>
                    <TableColumn key="Start Date">Start Date</TableColumn>
                    <TableColumn key="End Date">End Date</TableColumn>
                    <TableColumn key="Rent Status">Rent Status</TableColumn>
                  </TableHeader>
                  <TableBody items={items}>
                    {(item) => (
                      <TableRow key={item.name}>
                        {(columnKey) => (
                          <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-6 justify-center place-content-center mx-auto">
        <div className="flex w-full justify-center items-center  h-auto">
          <div className="flex flex-col gap-4 justify-start items-start w-full">
            <div className="w-full flex justify-between items-center  ">
              <p className="text-sm font-bold">Revenue Overview</p>
              <p className="text-sm font-bold text-[#8B8B8B]">Week</p>
            </div>
            <div className="grid grid-cols-1 gap-6 justify-center place-content-center items-center mx-auto w-full ">
              <Revenueovr />
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center items-start  h-auto">
          <div className="flex flex-col gap-4 justify-start items-start w-full">
            <div className="w-full flex justify-between items-center  ">
              <p className="text-sm font-bold">Expense Breakdown</p>
              <p className="text-sm font-bold ">Active Complaints</p>
            </div>
            <div className="grid grid-cols-2 gap-6 justify-center place-content-center items-center mx-auto w-full ">
              <div className=" flex flex-col gap-4 w-full h-auto rounded-lg">
                <Expensebreak />
                <div className="w-full h-16 grid px-4 grid-cols-2 justify-center place-content-center items-center mx-auto  rounded-md ring-1 ring-gray-200">
                  <div className="flex flex-col justify-start items-start w-full" >
                    <p className="flex gap-1 items-center text-xs "><FaCircle className="text-[#0096FF]"/> Water Bill</p>
                    <p className="text-[#0096FF] text-[0.5rem]">Rs/- 3000</p>
                  </div>
                  <div className="flex flex-col justify-start items-start" >
                    <p className="flex gap-1 items-center text-xs "><FaCircle className="text-[#FFA100]"/>Electricity Bill</p>
                    <p className="text-[#FFA100] text-[0.5rem]">Rs/- 3000</p>
                  </div>
                  <div className="flex flex-col justify-start items-start" >
                    <p className="flex gap-1 items-center text-xs "><FaCircle className="text-[#ED6300]"/> Internet Bill</p>
                    <p className="text-[##ED6300] text-[0.5rem]">Rs/- 3000</p>
                  </div>
                  <div className="flex flex-col justify-start items-start" >
                    <p className="flex gap-1 items-center text-xs "><FaCircle className="text-[#9747FF]"/> Gas Bill</p>
                    <p className="text-[#9747FF] text-[0.5rem]">Rs/- 3000</p>
                  </div>
                 
                </div>
              </div>
              <div className="flex flex-col gap-5 justify-start items-start  w-full h-auto rounded-lg">
                <div className="w-full h-20 bg-[#FFA100]  rounded-md ring-1 ring-gray-200"></div>
                <div className="w-full h-20 bg-[#0096FF]  rounded-md ring-1 ring-gray-200"></div>
                <div className="w-full h-20 bg-[#ED6300] rounded-md ring-1 ring-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
