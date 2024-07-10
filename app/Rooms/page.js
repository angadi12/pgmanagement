"use client";

import React from "react";
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
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import fillter from "../../public/Loginasset/fillter.png"
import Image from "next/image";
// import {VerticalDotsIcon} from "./VerticalDotsIcon";
// import {SearchIcon} from "./SearchIcon";
// import {ChevronDownIcon} from "./ChevronDownIcon";
// import {columns, users, statusOptions} from "./data";
// import {capitalize} from "./utils";
const columns = [
  {name: "ID", uid: "id", },
  {name: "Room No.", uid: "name", },
  {name: "Room Type", uid: "Contact", },
  {name: "Specialty", uid: "Room", },
  {name: "Room Complaints", uid: "Start"},
  {name: "Rent Amount", uid: "End"},
  {name: "Room Status", uid: "status", sortable: true},
];

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const statusOptions = [
  {name: "Available", uid: "Available"},
  {name: "Full", uid: "Full"},
];

const users = [
  {
    id: 1,
    name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "No Active Complaints",
    status: "Paid",
    Room: "29",
    Contact:"1234567890"
  },
  {
    id: 2,
   name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "No Active Complaints",
    status: "Paid",
    Room: "29",
    Contact:"1234567890"
  },
  {
    id: 3,
   name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "No Active Complaints",
    status: "Overdue",
    Room: "29",
    Contact:"1234567890"
  },
  {
    id: 4,
  name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "1 Complaints",
    status: "Overdue",
    Room: "29",
    Contact:"1234567890"
  },
  {
    id: 5,
    name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "1 Active Complaint",
    status: "Paid",
    Room: "29",
    Contact:"1234567890"
  },
  {
    id: 6,
   name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "No Active Complaints",
    status: "Overdue",
    Room: "29",
    Contact:"1234567890"
  },
  {
    id: 7,
   name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "No Active Complaints",
    status: "Overdue",
    Room: "29",
    Contact:"1234567890"
  },
  {
    id: 8,
   name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "No Active Complaints",
    status: "Paid",
    Room: "29",
    Contact:"1234567890"
  },
  {
    id: 9,
    name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "No Active Complaints",
    status: "Paid",
    Room: "29",
    Contact:"1234567890"
  },
  {
    id: 10,
   name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "No Active Complaints",
    status: "Paid",
    Room: "29",
    Contact:"1234567890"
  },
  {
    id: 11,
   name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "Complaints",
    status: "Overdue",
    Room: "29",
    Contact:"1234567890"
  },
  {
    id: 12,
   name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "Complaints",
    status: "Paid",
    Room: "29",
    Contact:"1234567890"
  },
  {
    id: 13,
    name: "Oliver Scott",
   name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "Complaints",
    status: "Pending",
    Room: "29",
    Contact:"1234567890"
  },
  {
    id: 14,
    name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "Complaints",
    status: "Overdue",
    Room: "29",
    Contact:"1234567890"
  },
  {
    id: 15,
    name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "Complaints",
    status: "Paid",
    Room: "29",
    Contact:"1234567890"
  },
  {
    id: 16,
   name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "Complaints",
    status: "Pending",
    Room: "29",
    Contact:"1234567890"
  },
  {
    id: 17,
   name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "Complaints",
    status: "Paid",
    Room: "29",
    Contact:"1234567890"
  },
  {
    id: 18,
    name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "Complaints",
    status: "Paid",
    Room: "29",
    Contact:"1234567890"
  },
  {
    id: 19,
   name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "Complaints",
    status: "Pending",
    Room: "29",
    Contact:"1234567890"
  },
  {
    id: 20,
   name: "Pavan Alimkar",
    End: "12/12/24",
    Start: "12/12/24",
    Complaints: "Complaints",
    status: "Paid",
    Room: "29",
    Contact:"1234567890"
  },
];

export {columns, users, statusOptions};
const statusColorMap = {
  Paid: "success",
  Full: "danger",
  Pending: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "Contact","Room","Start","End","Complaints", "status"];

export default function Tennat() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
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
  }, [users, filterValue, statusFilter]);

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

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
         <p>{user.name}</p>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-500">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1  "
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "Complaints":
        return (
          <p>
            {user.Complaints}
          </p>
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
          <p className="text-lg font-semibold">Total Rooms <span className="text-[#205093]">(50*)</span></p>
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
                 <Image src={fillter} className="h-6 w-6"/>
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
              className="bg-[#205093] text-background"
              endContent={<FaPlus />}
              size="sm"
            >
             
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
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
    users.length,
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
      td: [
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
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
