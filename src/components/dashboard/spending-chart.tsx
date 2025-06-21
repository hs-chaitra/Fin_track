"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
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

interface SpendingChartProps {
  data: {
    name: string;
    spending: number;
    budget: number;
  }[];
}

const chartConfig = {
  spending: {
    label: "Spending",
    color: "hsl(var(--primary))",
  },
  budget: {
    label: "Budget",
    color: "hsl(var(--secondary))",
  },
} satisfies ChartConfig;

export function SpendingChart({ data }: SpendingChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending vs. Budget</CardTitle>
        <CardDescription>
          A comparison of your spending and budget for this month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <Tooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="spending"
              fill="var(--color-spending)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="budget"
              fill="var(--color-budget)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
