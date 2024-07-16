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
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import Personaldetails from "../Tennatcomponents/Personaldetails";

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = React.useState("Personal Details");

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);
  return (
    <>
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
                onPress={onOpen}
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
                  wrapper: [" rounded-t-none "],
                  // td: ["border-b"]
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

      <Modal
      isDismissable={false} isKeyboardDismissDisabled={true}
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
                Create New Tenant
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
                    key="Personal Details"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>Personal Details</span>
                      </div>
                    }
                  />
                  <Tab
                    key="Room & Duration"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>Room & Duration</span>
                      </div>
                    }
                  />
                </Tabs>
                <div className="w-full h-auto">
                  <Personaldetails/>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center">
                <Button
                  className="buttongradient text-white rounded-md w-60"
                  onPress={onClose}
                >
                  NEXT
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Tennattable;
