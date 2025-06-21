"use client";

import * as React from "react";
import { Pie, PieChart, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { spendingData } from "@/lib/data";

interface CategoryPieChartProps {
  data: {
    name: string;
    spending: number;
    fill: string;
  }[];
}

const chartConfig = spendingData.reduce((acc, category) => {
  acc[category.name.toLowerCase()] = {
    label: category.name,
    color: category.fill,
  };
  return acc;
}, {} as ChartConfig);

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  const chartData = data.map(item => ({...item, value: item.spending, fill: `var(--color-${item.name.toLowerCase()})`}));

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription>
          Your spending distribution for this month.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px]"
        >
          <PieChart>
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
