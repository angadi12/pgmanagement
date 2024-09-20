"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Tooltip
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Divider,
  CircularProgress,
  CardBody,
  CardFooter,
  Card,
} from "@nextui-org/react";

import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";




const columns = [
  {name: "ID", uid: "id", },
  {name: "Room No", uid: "name", },
  {name: "Guest Name", uid: "Number", },
  {name: "Entry Time", uid: "mothlysalary",},
  {name: "Exit Time", uid: "Category"},
  { name: "Phone No", uid: "actions" },
  { name: "Date", uid: "actions" },
  { name: "Actions", uid: "actions" },

];

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const statusOptions = [
  {name: "Available", uid: "Available"},
  {name: "Full", uid: "Full"},
];



export {columns, statusOptions};
const statusColorMap = {
  Paid: "success",
  Full: "danger",
  Pending: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "Number","mothlysalary","Category","actions"];


export const Guest=[]

export default function Guesthistory() {
  const dispatch = useDispatch();
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );
 
  const {isOpen, onOpen, onOpenChange} = useDisclosure();






  const [filterValue, setFilterValue] = React.useState("");
  const [loadingGuest, SetloadingGuest] = React.useState(false);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
 





  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(Guest?.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = Array.isArray(Guest) ? [...Guest] : [];


    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((guest) =>
        guest.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((guest) =>
        Array.from(statusFilter).includes(guest.status)
      );
    }

    return filteredUsers;
  }, [Guest, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((staff, columnKey) => {
    const cellValue = staff[columnKey];

    switch (columnKey) {
      case "name":
        return (
         <p>{staff.name}</p>
        );
      case "Number":
        return (
          <div className="flex flex-col">
            <p className="text-bold  capitalize ">
              {staff.Number}
            </p>
          </div>
        );
      
      case "Number":
        return (
          <div className="flex flex-col">
            <p className="text-bold  capitalize text-default-500">
              {staff.mothlysalary}
            </p>
          </div>
        );
      case "Category":
        return (
          <div className="flex flex-col">
            <p className="text-bold  capitalize text-default-500">
              {staff.Category?.name}
            </p>
          </div>
        );
      case "Category":
        return (
          <div className="flex flex-col">
            <p className="text-bold  capitalize text-default-500">
              {staff.Category?.name}
            </p>
          </div>
        );
        case "actions":
          return (
            <div className="relative right-0 left-0 flex justify-center items-end gap-4">
              <Tooltip content="Details">
                <span
                  onClick={() =>{ Setopenview(true),Setselectedstaffid(staff._id)}}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <IoEyeSharp />
                </span>
              </Tooltip>
              <Tooltip content="Edit">
                <span
                  onClick={() => {Setopenedit(true),Setselectedstaffid(staff._id)}}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <RiPencilFill />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete">
                <span
                  onClick={() => Setopendelete(true)}
                  className="text-lg text-red-500 cursor-pointer active:opacity-50"
                >
                  <MdDelete />
                </span>
              </Tooltip>
            </div>
          );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const  topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col  gap-4  px-2">
      
        {/* <div className="flex gap-3 justify-start items-start">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1.5",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={""}
            value={filterValue}
            color="primary"
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
        
        </div> */}
        
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    Guest?.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        {/* <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button className="bg-white ring-1 ring-[#205093] text-[#205093]" isDisabled={pages === 1} size="sm" variant="flat" onPress={onOpen}>
          Guest History
          </Button>
          <Button className="bg-[#205093] text-white" isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button className="bg-[#205093] text-white" isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div> */}
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["h-screen", "max-w-3xl",],
      th: ["bg-[#205093]", "text-white", "border-b", "border-divider"],
      td: ["p-3","border-b",
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

 




  return (

    <>

   {loadingGuest?
    <div className="w-full h-[60vh] col-span-3 flex justify-center items-center">
          <span className="loader3 "></span>
        </div>: <Table
      isCompact 
      className="px-4"
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={classNames}
      selectedKeys={selectedKeys}
      topContent={topContent}

      // selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No History found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>}


 
  

    </>
  );
}





