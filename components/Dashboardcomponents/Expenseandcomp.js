import React, { useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import ExpenseandcompSkeleton from "./ExpenseandcompSkeleton ";
import Activecomplaint from "./Activecomplaint";
import Expensebreak from "../Chartcomponent/Expensebreak";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardExpense } from "@/lib/DashboardSlice";

const chartConfig = {
  ElectricityBill: {
    color: "#FFA100",
  },
  GasBill: {
    color: "#9747FF",
  },
  WaterBill: {
    color: "#0096FF",
  },
  InternetBill: {
    color: "#ED6300",
  },
};

const Expenseandcomp = () => {
  const dispatch = useDispatch();
  const { expense, loading, error } = useSelector((state) => state.dashboard);

  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );

  useEffect(() => {
    dispatch(fetchDashboardExpense());
  }, [dispatch, selectedBranchId]);

  if (loading) {
    return <ExpenseandcompSkeleton />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }





  // Render the expense items dynamically
  const expenseItems = expense?.map((item) => {
    const color = chartConfig[item.name]?.color || "#ccc";
    return (

      <>
     <div className="flex flex-col justify-start items-start" key={item.name}>
        <p className="flex gap-1 items-center text-xs">
          <FaCircle className="text-[color]" style={{ color: color }} /> {item.name}
        </p>
        <p className="text-[color]" style={{ color: color }}>{`Rs/- ${item.totalAmount}`}</p>
      </div>

      </>
    );
  });

  return (
    <div className="flex w-full justify-center items-start h-full">
      <div className="flex flex-col gap-4 justify-start items-start w-full h-full">
        <div className="w-full flex justify-between items-center">
          <p className="text-sm font-bold">Expense Breakdown</p>
          <p className="text-sm font-bold">Active Complaints</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-6 justify-center place-content-center items-start mx-auto w-full h-full">
          <div className="flex flex-col justify-between gap-6 w-full h-full rounded-lg">
            <div>
              <Expensebreak />
            </div>
           { !expense || expense?.length === 0?  <div  className="w-full h-full grid  py-2 grid-cols-1 justify-center place-content-center items-center mx-auto rounded-md ring-1 ring-gray-200">
        <p className="text-xs font-semibold w-full h-16 text-center flex justify-center items-center">No data available</p>
      </div>:<div className="w-full h-full grid px-4 py-2 grid-cols-2 justify-center place-content-center items-center mx-auto rounded-md ring-1 ring-gray-200">
              {expenseItems}
            </div>}
          </div>
          <Activecomplaint />
        </div>
      </div>
    </div>
  );
};

export default Expenseandcomp;
