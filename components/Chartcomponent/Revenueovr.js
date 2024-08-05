"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import Revenuskel from "./Revenuskel"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardData,
  fetchDashboardEarnings,
} from "../../lib/DashboardSlice";

// const chartData = [
//   { month: "January", Income: 186, Expense: 80 },
//   { month: "February", Income: 305, Expense: 200 },
//   { month: "March", Income: 237, Expense: 120 },
//   { month: "April", Income: 73, Expense: 190 },
//   { month: "May", Income: 209, Expense: 130 },
//   { month: "June", Income: 214, Expense: 140 },
// ]

const chartConfig = {
  desktop: {
    label: "Income",
    color: "#FFC35D",
  },
  mobile: {
    label: "Expense",
    color: "#205093",
  },
} 

export function Revenueovr() {
  const dispatch = useDispatch();
  const { data, earnings, loading, error } = useSelector(
    (state) => state.dashboard
  );

  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );

  useEffect(() => {
    dispatch(fetchDashboardEarnings());
  }, [dispatch,selectedBranchId]);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const chartData = [...earnings]


  if (loading) {
    return <Revenuskel/>;
  }
  return (
    <Card className="pt-4">
      <CardContent >
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="Income" fill="#FFC35D" radius={5} />
            <Bar dataKey="Expense" fill="#205093" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


export default Revenueovr