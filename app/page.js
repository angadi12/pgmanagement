"use client";
import Overallstatus from "@/components/Dashboardcomponents/Overallstatus";
import Tennattable from "@/components/Dashboardcomponents/Tennattable";
import Revenueoverview from "@/components/Dashboardcomponents/Revenueoverview";
import Expenseandcomp from "@/components/Dashboardcomponents/Expenseandcomp";
import { Getsingletennatbyid } from "@/lib/API/Tennat";
import { useSelector,useDispatch } from "react-redux";
import {fetchSingleTenant } from "@/lib/TennatSlice";

import { useEffect } from "react";

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);


export default function Home() {
  const dispatch = useDispatch();
  const selectedTenantId = useSelector(
    (state) => state.tenants.selectedTenantId
  );

const fetchdetails= async(id)=>{
  try {
    const result = await Getsingletennatbyid(id)
    if (result.status){
      console.log(result.data,'app result')
    }
  } catch (error) {
    console.log(error)
    
  }
}

useEffect(() => {
 if(isValidObjectId(selectedTenantId)){
  dispatch(fetchSingleTenant(selectedTenantId))
 }
}, [selectedTenantId])




  return (
    <main className="flex flex-col gap-8 justify-center items-center p-4 mx-auto w-full h-auto">
      <div className="w-full grid grid-cols-2 gap-6 justify-center place-content-center mx-auto h-full content-stretch">
        <Overallstatus />
        <Tennattable />
      </div>

      <div className="w-full grid grid-cols-2 gap-6 justify-center place-content-center mx-auto h-full">
        <Revenueoverview />
        <Expenseandcomp />
      </div>
    </main>
  );
}
