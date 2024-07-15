import React from "react";
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
import { Button, Divider } from "@nextui-org/react";

export const users = [
  {
    key: "1",
    name: "Tony ",
    RoomNo: "E2",
    StartDate: "12/12/12",
    EndDate: "12/12/12",
    RentStatus: "Active",
  },
  {
    key: "2",
    name: "Zoey ",
    RoomNo: "E2",
    StartDate: "12/12/12",
    EndDate: "12/12/12",
    RentStatus: "Active",
  },
  {
    key: "3",
    name: "Jane ",
    RoomNo: "E2",
    StartDate: "12/12/12",
    EndDate: "12/12/12",
    RentStatus: "Active",
  },
  {
    key: "4",
    name: "William ",
    RoomNo: "E2",
    StartDate: "12/12/12",
    EndDate: "12/12/12",
    RentStatus: "Active",
  },
  {
    key: "5",
    name: "Emily ",
    RoomNo: "E2",
    StartDate: "12/12/12",
    EndDate: "12/12/12",
    RentStatus: "Active",
  },
  {
    key: "6",
    name: "Brian ",
    RoomNo: "E2",
    StartDate: "12/12/12",
    EndDate: "12/12/12",
    RentStatus: "Active",
  },
  {
    key: "7",
    name: "Laura ",
    RoomNo: "E2",
    StartDate: "12/12/12",
    EndDate: "12/12/12",
    RentStatus: "Active",
  },
  {
    key: "8",
    name: "Michael ",
    RoomNo: "E2",
    StartDate: "12/12/12",
    EndDate: "12/12/12",
    RentStatus: "Active",
  },
  {
    key: "9",
    name: "Sophia ",
    RoomNo: "E2",
    StartDate: "12/12/12",
    EndDate: "12/12/12",
    RentStatus: "Active",
  },
  {
    key: "10",
    name: "James ",
    RoomNo: "E2",
    StartDate: "12/12/12",
    EndDate: "12/12/12",
    RentStatus: "Active",
  },
];

const Tennattable = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);
  return (
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
                <TableColumn key="RoomNo">Room No.</TableColumn>
                <TableColumn key="StartDate">Start Date</TableColumn>
                <TableColumn key="EndDate">End Date</TableColumn>
                <TableColumn key="RentStatus">Rent Status</TableColumn>
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
  );
};

export default Tennattable;
