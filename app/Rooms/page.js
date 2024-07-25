"use client";
import React, { useEffect } from "react";
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
  Tooltip,
  Badge
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import fillter from "../../public/Loginasset/fillter.png";
import Image from "next/image";
import Createroom from "@/components/Roomcomponent/Createroom";
import { useSelector, useDispatch } from "react-redux";
import { fetchRoomsByBranch } from "@/lib/RoomSlice";
import { FaBed } from "react-icons/fa6";

const columns = [
  { name: "ID", uid: "_id" },
  { name: "Room No.", uid: "RoomNumber" },
  { name: "Room Name", uid: "roomName" },
  { name: "Room Type", uid: "RoomType" },
  { name: "No. of Sharing", uid: "SharingType" },
  { name: "Rent Amount", uid: "Price" },
  { name: "Reamining Bed", uid: "ReaminingBed" },
  { name: "Room Status", uid: "reaminingBed", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const statusOptions = [
  { name: "Available", uid: "Available" },
  { name: "Not Available", uid: "Occupied" },
];

export { columns, statusOptions };
const statusColorMap = {
  Available: "success",
  Occupied: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "roomName",
  "RoomNumber",
  "RoomType",
  "SharingType",
  "Price",
  "ReaminingBed",
  "reaminingBed",
  "actions",
];

const getRoomStatus = (reaminingBed) => {
  return reaminingBed > 0 ? "Available" : "Occupied";
};
export default function Rooms() {
  const dispatch = useDispatch();
  const { rooms, status, error } = useSelector((state) => state.rooms);
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchRoomsByBranch(selectedBranchId));
    }
  }, [selectedBranchId, dispatch]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = React.useState("Room Details");

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "RoomNumber",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(rooms?.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...rooms];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (room) =>
          typeof room.roomName === "string" &&
          room?.roomName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((room) =>
        Array.from(statusFilter).includes(getRoomStatus(room.reaminingBed))
      );
    }

    return filteredUsers;
  }, [rooms, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = parseInt(a[sortDescriptor.column], 10);
      const second = parseInt(b[sortDescriptor.column], 10);
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((room, columnKey) => {
    const cellValue = room[columnKey];

    switch (columnKey) {
      case "roomName":
        return <p>{room.roomName}</p>;
      case "RoomType":
        return <p className="capitalize">{room.RoomType.toLowerCase()}</p>;
      case "RoomNumber":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-500">
              {room.RoomNumber}
            </p>
          </div>
        );
      case "SharingType":
        return (
          <div className="flex flex-col">
            <p className="text-bold">{room.SharingType}</p>
          </div>
        );
      case "ReaminingBed":
        return (
          <Badge content={room.reaminingBed} shape="circle" size="sm" color="danger">
            <FaBed className="text-[#205093]" size={24} />
          </Badge>
        );
      case "reaminingBed":
        const status = room.reaminingBed > 0 ? "Available" : "Occupied";
        return (
          <div className="flex ">
            <Chip
              className="capitalize border-none gap-1  rounded-md"
              color={statusColorMap[status]}
              size="sm"
              variant="flat"
            >
              {status}
            </Chip>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-4">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <IoEyeSharp />
              </span>
            </Tooltip>
            <Tooltip content="Edit">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <RiPencilFill />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <span className="text-lg text-red-500 cursor-pointer active:opacity-50">
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
          <p className="text-lg font-semibold">Manage Rooms</p>
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
                  <DropdownItem key={status.uid} className="capitalize" color="primary" variant="flat">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Button
              onPress={onOpen}
              className="bg-[#205093] text-background"
              endContent={<FaPlus />}
              size="sm"
            ></Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {rooms.length} Rooms
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
    rooms.length,
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
  }, [selectedKeys, rooms.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["h-screen", "max-w-3xl"],
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
          <TableBody emptyContent={"No Rooms found"} items={sortedItems}>
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
        isOpen={isOpen}
        onOpenChange={onOpenChange}
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
                Create New Room
              </ModalHeader>
              <ModalBody>
                <Tabs
                  selectedKey={selected}
                  onSelectionChange={setSelected}
                  aria-label="Options"
                  color="primary"
                  variant="underlined"
                  classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 ",
                    cursor: "w-full bg-[#205093]",
                    tab: "w-auto px-0 h-10",
                    tabContent:
                      "group-data-[selected=true]:text-[#205093] font-semibold",
                  }}
                >
                  <Tab
                    key="Room Details"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>Room Details</span>
                      </div>
                    }
                  />
                </Tabs>
                <div className="w-full h-auto">
                  {selected === "Room Details" && <Createroom />}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center"></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>



    </>
  );
}
