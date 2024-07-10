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
const chartData = [
  { browser: "ElectricityBill", visitors: 275, fill: "#FFA100" },
  { browser: "GasBill", visitors: 200, fill: "#9747FF" },
  { browser: "WaterBill", visitors: 287, fill: "#0096FF" },
  { browser: "InternetBill", visitors: 173, fill: "#ED6300" },
];

const chartConfig = {
  visitors: {
    label: "Increase in Expense",
  },
  ElectricityBill: {
    label: "Electricity Bill",
    color: "#FFA100",
  },
  GasBill: {
    label: "Gas Bill",
    color: "#9747FF",
  },
  WaterBill: {
    label: "Water Bill",
    color: "#0096FF",
  },
  InternetBill: {
    label: "Internet Bill",
    color: "#ED6300",
  },
};

export function Expensebreak() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-full"
        >
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
                          className="fill-foreground text-3xl font-bold"
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
        </ChartContainer>
      </CardContent>
    
    </Card>
  );
}

export default Expensebreak;
