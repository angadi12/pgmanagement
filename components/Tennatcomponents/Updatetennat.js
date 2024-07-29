import React, { useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentStep } from "../../lib/CreatetenantSlice"; 
import Updatepersonaldetails from "./Updatepersonaldetails";
import Updateavailablity from "./Updateavailablity";
import Updateroomsanddura from "./Updateroomsanddura";
import {fetchSingleTenant } from "../../lib/TennatSlice";



const Updatetennat = ({Setopenedit,id}) => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.createTenant.currentStep);
  const selectedRoomId = useSelector((state) => state.createTenant.selectedRoomId);
  const personalDetails = useSelector(
    (state) => state.createTenant.personalDetails
  );
 

  const handleTabChange = (key) => {
    dispatch(setCurrentStep(key));
  };

 

  return (
    <>
      <Tabs
        selectedKey={currentStep}
        onSelectionChange={handleTabChange}
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
        {currentStep === "Personal Details" && <Updatepersonaldetails/>}
        {currentStep === "Availability" && <Updateavailablity id={id} />}
        {currentStep === "Room & Duration" && <Updateroomsanddura Setopenedit={Setopenedit} />}
      </div>
    </>
  );
};


export default Updatetennat