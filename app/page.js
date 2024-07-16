"use client";
import Overallstatus from "@/components/Dashboardcomponents/Overallstatus";
import Tennattable from "@/components/Dashboardcomponents/Tennattable";
import Revenueoverview from "@/components/Dashboardcomponents/Revenueoverview";
import Expenseandcomp from "@/components/Dashboardcomponents/Expenseandcomp";

export default function Home() {
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
