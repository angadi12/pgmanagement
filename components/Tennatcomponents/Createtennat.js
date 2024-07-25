import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import Personaldetails from "@/components/Tennatcomponents/Personaldetails";
import Roomsanddura from "@/components/Tennatcomponents/Roomsanddura";
import Availablity from "./Availablity";

const Createtennat = () => {
  const [selected, setSelected] = React.useState("Personal Details");

  return (
    <>
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
          tabContent: "group-data-[selected=true]:text-[#205093] font-semibold",
        }}
      >
        <Tab
          key="Availability"
          title={
            <div className="flex items-center space-x-2">
              <span>Availability</span>
            </div>
          }
        />
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
        {selected === "Personal Details" && <Personaldetails />}
        {selected === "Availability" && <Availablity/>}
        {selected === "Room & Duration" && <Roomsanddura />}
      </div>
    </>
  );
};

export default Createtennat;
