import React, { useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import ExpenseandcompSkeleton from "./ExpenseandcompSkeleton ";
import Activecomplaint from "./Activecomplaint";
import Expensebreak from "../Chartcomponent/Expensebreak";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardExpense } from "@/lib/DashboardSlice";

const chartConfig = {
  visitors: {
    label: "Increase in Expense",
  },
  ElectricityBill: {
    label: "Electricity Bill",
    color: "#FFA100", // existing color
  },
  GasBill: {
    label: "Gas Bill",
    color: "#9747FF", // existing color
  },
  WaterBill: {
    label: "Water Bill",
    color: "#0096FF", // existing color
  },
  InternetBill: {
    label: "Internet Bill",
    color: "#ED6300", // existing color
  },
  MessExpense: {
    label: "Mess Expense",
    color: "#FF5722", // new color
  },
  Housekeeping: {
    label: "Housekeeping",
    color: "#4CAF50", // new color
  },
  Security: {
    label: "Security",
    color: "#9C27B0", // new color
  },
  Repairs: {
    label: "Repairs",
    color: "#FFEB3B", // new color
  },
  Laundry: {
    label: "Laundry",
    color: "#00BCD4", // new color
  },
  WasteManagement: {
    label: "Waste Management",
    color: "#795548", // new color
  },
  Gardening: {
    label: "Gardening",
    color: "#8BC34A", // new color
  },
  Plumbing: {
    label: "Plumbing",
    color: "#3F51B5", // new color
  },
  ElectricalMaintenance: {
    label: "Electrical Maintenance",
    color: "#FF9800", // new color
  },
  PestControl: {
    label: "Pest Control",
    color: "#9E9E9E", // new color
  },
  FireSafety: {
    label: "Fire Safety",
    color: "#F44336", // new color
  },
  LiftMaintenance: {
    label: "Lift Maintenance",
    color: "#03A9F4", // new color
  },
  BuildingMaintenance: {
    label: "Building Maintenance",
    color: "#673AB7", // new color
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
  const expenseItems = expense?.slice(0,4).map((item) => {
    const color = chartConfig[item.name]?.color || "#ccc";
    return (

      <div className="w-full overflow-hidden h-24" key={item.name}>
     <div className="flex flex-col justify-start items-start w-full" >
        <p className="flex gap-1 items-center text-tiny">
          <FaCircle className="text-[color] text-tiny truncate" style={{ color: color }} /> {item.name}
        </p>
        <p className="text-[color] text-tiny" style={{ color: color }}>{`Rs/- ${item.totalAmount}`}</p>
      </div>

      </div>
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
      </div>:<div className="w-full h-full grid px-1   py-2 grid-cols-2 justify-center place-content-center items-end mx-auto rounded-md ring-1 ring-gray-200">
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
