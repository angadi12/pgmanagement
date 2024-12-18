import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import Personaldetails from "@/components/Tennatcomponents/Personaldetails";
import Roomsanddura from "@/components/Tennatcomponents/Roomsanddura";
import Availablity from "./Availablity";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentStep } from "../../lib/CreatetenantSlice"; 

const Createtennat = ({Setopenmodal}) => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.createTenant.currentStep);
  const selectedRoomId = useSelector((state) => state.createTenant.selectedRoomId);
  const personalDetails = useSelector(
    (state) => state.createTenant.personalDetails
  );
  const handleTabChange = (key) => {
    if (key === "Personal Details" && !selectedRoomId ) {
      // Prevent switching to Personal Details if no room is selected
      return;
    }
    if (key === "Room & Duration" && Object.keys(personalDetails).length==0) {
      // Prevent switching to Room & Duration if no personal details are provided
      return;
    }
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
        {currentStep === "Personal Details" && <Personaldetails />}
        {currentStep === "Availability" && <Availablity />}
        {currentStep === "Room & Duration" && <Roomsanddura Setopenmodal={Setopenmodal} />}
      </div>
    </>
  );
};

export default Createtennat;
