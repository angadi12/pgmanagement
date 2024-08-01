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

import fillter from "../../public/Loginasset/fillter.png"
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {fetchStaffByBranch} from "../../lib/StaffSlice"
import tennatpic from "../../public/Loginasset/tennatpic.png"
import Updatestaff from "./Updatestaff";
import {GetStaffbyid} from "../../lib/API/Staff"




const columns = [
  {name: "ID", uid: "id", },
  {name: "Name", uid: "name", },
  {name: "Contact No.", uid: "Number", },
  {name: "Salary", uid: "mothlysalary",},
  {name: "Category", uid: "Category"},
  // {name: "Salary Status", uid: "salary"},
  { name: "ACTIONS", uid: "actions" },

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

export default function Salarystatus() {
  const dispatch = useDispatch();
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );
  const staffByBranch = useSelector((state) => state.staff.staffByBranch);
  const loadingStaff = useSelector((state) => state.staff.loadingStaff);



  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchStaffByBranch(selectedBranchId));
    }
  }, [selectedBranchId, dispatch]);


  const [filterValue, setFilterValue] = React.useState("");
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
  const [openview,Setopenview]=useState(false)
  const [opendelete,Setopendelete]=useState(false)
  const [openedit,Setopenedit]=useState(false)
  const[loadingstaffdata,Setloadingstaffdata]=useState(true)
  const[selectedstaffid,Setselectedstaffid]=useState("")
  const [staffdata,Setstaffdata]=useState()





  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(staffByBranch?.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = Array.isArray(staffByBranch) ? [...staffByBranch] : [];


    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((staff) =>
        staff.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [staffByBranch, filterValue, statusFilter]);

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
      <div className="flex flex-col  gap-4 mt-2 px-2">
      
        <div className="flex gap-3 justify-start items-start">
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
        
        </div>
        
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    staffByBranch?.length,
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
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button className="bg-[#205093] text-white" isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button className="bg-[#205093] text-white" isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
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

  const fetchStaffDetails = async () => {
    Setloadingstaffdata(true);

    try {
      const result = await GetStaffbyid(selectedstaffid);
      if (result.status) {
        Setstaffdata(result.data)
        Setloadingstaffdata(false);
      } else {
        Setloadingstaffdata(false);
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching the staff details",
        error
      );
      Setloadingstaffdata(false);
    } finally {
      Setloadingstaffdata(false);
    }
  };

  useEffect(() => {
    if(selectedstaffid){
      fetchStaffDetails()

    }
  }, [selectedstaffid])




  return (

    <>

   {loadingStaff?
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
      <TableBody emptyContent={"No Staff found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>}


    {/* view */}
<Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        size="5xl"
        isOpen={openview}
        onOpenChange={Setopenview}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center">
              </ModalHeader>
              <ModalBody>
              {loadingstaffdata ?
                <div className="flex justify-center items-center h-60 gap-4 w-full">
                  <span className="loader3"></span>
                </div> :  <div className="flex justify-evenly items-center h-60 gap-4 w-full">
                  <div>
                    <Image
                      src={tennatpic}
                      className="object-fill h-full"
                      alt="Roomimage"
                    />
                  </div>
                  <div className="flex flex-col justify-between items-start h-full py-4">
                    <div className="flex flex-col justify-start items-start text-sm font-semibold">
                      <p>Name : {staffdata.name}</p>
                      <p className="flex flex-col justify-start items-start text-sm font-bold text-gray-500">
                      {/* {roomdata.roomName} */}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-start text-sm font-semibold">
                      <p>Last 3 months payment</p>
                      {/* {
                        roomdata.Users.map((name,id)=>(
                          <p key={id} className="text-sm text-gray-500">{name.UserName}</p>
                        ))
                      } */}
                    </div>
                  </div>
                  <Divider orientation="vertical" />
                  <div className="flex flex-col justify-between items-start h-full py-4">
                    <div className="flex flex-col flex-wrap gap-2 justify-start items-start text-sm font-semibold">
                      <p>Staff Details</p>
                      <p className="flex flex-col justify-start items-start text-xs text-gray-500 ">
                      <p>Name : {staffdata.name}</p>
                      </p>
                      <p className="flex flex-col justify-start items-start text-xs text-gray-500">
                      Mob.: {staffdata?.Number}
                      </p>
                      <p className="flex flex-col justify-start items-start text-xs text-gray-500">
                      Salary:{staffdata?.mothlysalary}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 justify-start items-start text-xs ">
                      <p className="flex   items-center gap-2 text-sm font-semibold">last payament <span className="text-green-600">12000/-</span></p>
                      <p className="flex  items-center gap-2 text-sm font-semibold">Salary Status:  <span className={"text-green-600"}>Paid</span></p>
                    </div>
                  </div>
                  <Divider orientation="vertical" />
                  <div className=" flex-col  flex justify-center items-center gap-4">
                    <Card className=" border-none shadow-none">
                      <CardBody className="justify-center items-center pb-0">
                        <CircularProgress
                          classNames={{
                            svg: "w-40 h-40 drop-shadow-md",
                            indicator: "stroke-[#205093]",
                            track: "stroke-[#205093]/10",
                            value: "text-3xl font-semibold text-[#205093]",
                          }}
                          value={70}
                          strokeWidth={4}
                          showValueLabel={true}
                        />
                      </CardBody>
                      <CardFooter className="justify-center items-center pt-0 mt-4">
                        <Chip
                          classNames={{
                            base: "border-1 border-[#205093]/30",
                            content:
                              "text-[#205093]/90 text-small font-semibold",
                          }}
                          variant="bordered"
                        >
                         Staff Attendance
                        </Chip>
                      </CardFooter>
                    </Card>
                  </div>
                  {/* <div>
                    <Image
                      src={Roomimage}
                      className="object-fill h-full"
                      alt="Roomimage"
                    />
                  </div> */}
                </div>}
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center"></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

{/* Delete */}
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        size="xl"
        isOpen={opendelete}
        onOpenChange={Setopendelete}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center">
                Confirm Delete
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full justify-start items-start">
                  <p>Do you want to delete Room ?</p>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-end items-end ">
                <Button onPress={onClose} color="primary" variant="solid">Cancel</Button>
                <Button color="danger" variant="solid">Delete</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

   {/* edit    */}

   <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        size="4xl"
        isOpen={openedit}
        onOpenChange={Setopenedit}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center">
                Upadte Staff Details
              </ModalHeader>
              <ModalBody>
                <Updatestaff id={selectedstaffid} Setopenedit={Setopenedit}/>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center"></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </>
  );
}


