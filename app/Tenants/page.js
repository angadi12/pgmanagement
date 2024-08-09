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
  Tooltip,
  Pagination,
  Divider,
  Card,
  CardBody,
  CircularProgress,
  CardFooter,
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import fillter from "../../public/Loginasset/fillter.png";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTenantsByBranch } from "@/lib/TennatSlice";
import Createtennat from "@/components/Tennatcomponents/Createtennat";
import Updatetennat from "@/components/Tennatcomponents/Updatetennat";
import { setSelectedTenantId } from "../../lib/TennatSlice";
import { Getsingletennatbyid, Removetenantapi } from "../../lib/API/Tennat";
import tennatpic from "../../public/Loginasset/tennatpic.png";
import { FaUser } from "react-icons/fa";
import { BsDoorClosedFill } from "react-icons/bs";
import {BaseUrl} from "../../lib/API/Baseurl"
import Cookies from "js-cookie";

const columns = [
  { name: "ID", uid: "_id" },
  { name: "Name", uid: "UserName" },
  { name: "Contact No.", uid: "UserNumber" },
  { name: "Room No.", uid: "RoomNumber" },
  { name: "Start Date", uid: "StartDate" },
  { name: "Last Date", uid: "LastDate" },
  { name: "No. of months", uid: "NumberOfmonth" },
  { name: "Rent Status", uid: "Status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const statusOptions = [
  { name: "Paid Due", uid: "Paid" },
  { name: "Pending Due", uid: "Due" },
];

export { columns, statusOptions };
const statusColorMap = {
  Paid: "success",
  Due: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "UserName",
  "UserNumber",
  "RoomNumber",
  "StartDate",
  "LastDate",
  "NumberOfmonth",
  "Status",
  "actions",
];

export default function Tennat() {
  const dispatch = useDispatch();
  const { tenants, status, error } = useSelector((state) => state.tenants);
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );
  const selectedTenantId = useSelector(
    (state) => state.tenants.selectedTenantId
  );

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchTenantsByBranch(selectedBranchId));
    }
  }, [selectedBranchId, dispatch]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openmodal, Setopenmodal] = useState(false);
  const [openview, Setopenview] = useState(false);
  const [opendelete, Setopendelete] = useState(false);
  const [openedit, Setopenedit] = useState(false);
  const [loadingroomdata, setLoadingData] = useState(true);
  const [tenantdata, Settennatdata] = useState();
  const [loadingtennat, Setloadingtennat] = useState(false);

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "Status",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(tenants?.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = Array.isArray(tenants) ? [...tenants] : [];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (tenant) =>
          typeof tenant.UserName === "string" &&
          tenant.UserName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((tenant) =>
        Array.from(statusFilter).includes(tenant.Status)
      );
    }

    return filteredUsers;
  }, [tenants, filterValue, statusFilter]);

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

  const handleViewClick = (id) => {
    dispatch(setSelectedTenantId(id));
    Setopenview(true);
  };

  const handleEditClick = (id) => {
    dispatch(setSelectedTenantId(id));
    Setopenedit(true);
  };

  const handleDeleteClick = (id) => {
    dispatch(setSelectedTenantId(id));
    Setopendelete(true);
  };

  const Deletetenant = async (id) => {
    const token = Cookies.get("token");
    try {
      let result = await fetch(`${BaseUrl}/users/remove/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      });
      result = await result.json();
      console.log(result);
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
    // Setloadingtennat(true);
    // try {
    //   const result = await Removetenantapi(selectedTenantId);
    //   console.log(result.message)
    //     Setloadingtennat(false);
    //     Setopendelete(false);
    //     dispatch(fetchTenantsByBranch(selectedBranchId));
    // } catch (error) {
    //   console.log("erorr while deleteing tenant");
    //   Setloadingtennat(false);

    // } finally {
    //   Setloadingtennat(false);
    // }
  };



  const renderCell = React.useCallback((tenant, columnKey) => {
    const cellValue = tenant[columnKey];

    switch (columnKey) {
      case "UserName":
        return (
          <p className="flex items-center gap-1">
            <FaUser className="text-[#205093]" />
            {tenant.UserName}
          </p>
        );
      case "RoomNumber":
        return (
          <p className="text-bold flex items-center gap-1 capitalize ">
            <BsDoorClosedFill className="text-[#205093]" />
            {tenant?.room[0]?.roomName}{" "}
            <span className="text-tiny text-default-500">
              ({tenant?.room[0]?.RoomNumber})
            </span>
          </p>
        );
      case "StartDate":
        return <p className="text-bold  capitalize ">{tenant.StartDate}</p>;
      case "LastDate":
        return <p className="text-bold capitalize ">{tenant.LastDate}</p>;
      case "NumberOfmonth":
        return <p className="text-bold capitalize ">{tenant.NumberOfmonth}</p>;
      case "Status":
        return (
          <Chip
            className="capitalize border-none gap-1  "
            color={statusColorMap[tenant.Status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-4">
            <Tooltip content="Details">
              <span
                onClick={() => handleViewClick(tenant._id)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <IoEyeSharp />
              </span>
            </Tooltip>
            <Tooltip content="Edit">
              <span
                onClick={() => handleEditClick(tenant._id)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <RiPencilFill />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <span
                onClick={() => handleDeleteClick(tenant._id)}
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

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col  gap-4 mt-4 px-2">
        <div>
          <p className="text-lg font-semibold">Present Tenants </p>
        </div>
        <div className="flex gap-3 justify-end items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={""}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={""}
                  size="sm"
                  className="ring-1 ring-gray-300"
                  variant="light"
                >
                  <Image src={fillter} className="h-6 w-6" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={""}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            <Button
              onPress={() => Setopenmodal(true)}
              className="bg-[#205093] text-background"
              endContent={<FaPlus />}
              size="sm"
            ></Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {tenants?.length} Tenants
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    tenants?.length,
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
          <Button
            className="bg-[#205093] text-white"
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            className="bg-[#205093] text-white"
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, tenants?.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["h-screen", "max-w-3xl", "border-1"],
      th: ["bg-[#205093]", "text-white", "border-b", "border-divider"],
      td: [
        "p-3",
        "border-b",
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

  // fetch single tennat
  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  useEffect(() => {
    const fetchsingletennatData = async () => {
      if (!isValidObjectId(selectedTenantId)) {
        toast.error("Invalid branch ID");
        setLoadingData(false);
        return;
      }

      setLoadingData(true);
      try {
        const result = await Getsingletennatbyid(selectedTenantId);
        if (result.status) {
          Settennatdata(result.data);
        } else {
          toast.error(result.message || "Failed to fetch branch data");
        }
      } catch (error) {
        toast.error("An error occurred while fetching branch data");
      } finally {
        setLoadingData(false);
      }
    };

    if (selectedTenantId) {
      fetchsingletennatData();
    }
  }, [selectedTenantId]);



  return (
    <>
      {status === "loading" ? (
        <div className="w-full h-full col-span-3 flex justify-center items-center">
          <span className="loader3 "></span>
        </div>
      ) : (
        <Table
          isCompact
          className="px-4"
          removeWrapper
          aria-label="Example table with custom cells, pagination and sorting"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={classNames}
          selectedKeys={selectedKeys}
          // selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
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
          <TableBody emptyContent={"No Tenants found"} items={sortedItems}>
            {(item) => (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        size="4xl"
        isOpen={openmodal}
        onOpenChange={Setopenmodal}
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
                Create New Tenant
              </ModalHeader>
              <ModalBody>
                <Createtennat Setopenmodal={Setopenmodal} />
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center"></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

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
              <ModalHeader className="flex flex-col text-center"></ModalHeader>
              <ModalBody>
                {loadingroomdata ? (
                  <div className="flex justify-center items-center h-60 gap-4 w-full">
                    <span className="loader3"></span>
                  </div>
                ) : (
                  <div className="flex justify-evenly items-center h-60 gap-4 w-full">
                    <div>
                      <Image
                        src={tennatpic}
                        className="object-fill h-full"
                        alt="Roomimage"
                      />
                    </div>
                    <div className="flex flex-col justify-between items-start h-full py-4">
                      <div className="flex flex-col justify-start items-start text-sm font-semibold">
                        <p>Name : {tenantdata.UserName}</p>
                        <p className="flex flex-col justify-start items-start text-sm font-bold">
                          {tenantdata.roomName}
                        </p>
                      </div>
                      <div className="flex flex-col justify-start items-start text-sm font-semibold">
                        <p>Contact Info</p>
                      </div>
                    </div>
                    <Divider orientation="vertical" />
                    <div className="flex flex-col justify-between items-start h-full py-4">
                      <div className="flex flex-col flex-wrap gap-2 justify-start items-start text-sm font-semibold">
                        <p>Tenant Details</p>
                        <p className="flex flex-col justify-start items-start text-xs ">
                          Name: {tenantdata.UserName}
                        </p>
                        <p className="flex flex-col justify-start items-start text-xs">
                          phone: {tenantdata?.UserNumber}
                        </p>
                      
                        <p className="flex flex-col justify-start items-start text-xs ">
                          Period:&nbsp;{tenantdata?.NumberOfmonth}&nbsp;months
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 justify-start items-start text-xs ">
                        <p className="flex   items-center gap-2 text-sm font-semibold">
                          Rent:{" "}
                          <span className="text-green-600">
                            {tenantdata?.Status}
                          </span>
                        </p>
                        <p className="flex  items-center gap-2 text-sm font-semibold">
                          Overdue:{" "}
                          <span className={"text-red-600"}>
                            {tenantdata?.DueAmount}{" "}
                          </span>
                        </p>
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
                            Tenant Satisfaction
                          </Chip>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center"></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* delete */}

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
                  <p>Do you want to delete Tenant?</p>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-end items-end ">
                <Button onPress={onClose} color="primary" variant="solid">
                  Cancel
                </Button>
                <Button onPress={()=>Deletetenant(selectedTenantId)} color="danger" variant="solid">
                  {loadingtennat ? <span className="loader2"></span> : "Delete"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* update */}
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
                Upadte Tenant Details
              </ModalHeader>
              <ModalBody>
                <Updatetennat Setopenedit={Setopenedit} />
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center"></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
