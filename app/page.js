"use client";
import Overallstatus from "@/components/Dashboardcomponents/Overallstatus";
import Tennattable from "@/components/Dashboardcomponents/Tennattable";
import Revenueoverview from "@/components/Dashboardcomponents/Revenueoverview";
import Expenseandcomp from "@/components/Dashboardcomponents/Expenseandcomp";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches } from "@/lib/BranchSlice";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { useEffect } from "react";
import { FaCirclePlus } from "react-icons/fa6";

export default function Home() {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branches.branches);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  return (
    <>
      {!branches || branches.length == 0 ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="w-full boxshadow h-40 flex justify-center items-center gap-4 p-3 rounded-md">
            <p>No branches Added</p>
            <Button variant="light" isIconOnly>
              <FaCirclePlus size={40} className="text-[#205093]" />
            </Button>
          </div>
        </div>
      ) : (
        <main className="flex flex-col gap-8 justify-center items-center p-4 mx-auto w-full h-auto">
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1  gap-6 justify-center place-content-center mx-auto h-full content-stretch">
            <Overallstatus />
            <Tennattable />
          </div>

          <div className="w-full grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-6 justify-center place-content-center items-stretch mx-auto h-full">
            <Revenueoverview />
            <Expenseandcomp />
          </div>
        </main>
      )}
    </>
  );
}
