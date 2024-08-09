"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardExpense } from "../../lib/DashboardSlice";
import { Skeleton } from "@nextui-org/react";

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


export function Expensebreak() {
  const dispatch = useDispatch();
  const { expense, loading, error } = useSelector((state) => state.dashboard);

  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );

  // useEffect(() => {
  //   dispatch(fetchDashboardExpense());
  // }, [dispatch, selectedBranchId]);

  const chartData = expense?.map((item, index) => {
    return {
      browser: item.name,
      visitors: item.totalAmount,
      fill: chartConfig[item.name] ? chartConfig[item.name].color : "#ccc", // Default color if not defined
    };
  });

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  if (loading)
    return (
      <div>
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-full"
        >
          {!expense || expense.length === 0 ? (
            <p className="flex justify-center items-center p-5">
              No data available
            </p>
          ) : (
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={2}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground text-xs"
                          >
                            Increase
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default Expensebreak;
