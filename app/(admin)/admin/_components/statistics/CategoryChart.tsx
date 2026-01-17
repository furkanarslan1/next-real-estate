"use client";

import { Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Grafiğe gelecek verinin tipi
export interface CategoryData {
  category: string;
  count: number;
  fill: string;
}

interface CategoryChartProps {
  data: CategoryData[];
}

const chartConfig = {
  konut: { label: "Residential", color: "#f97316" },
  arsa: { label: "Land", color: "#3b82f6" },
  isyeri: { label: "Commercial", color: "#22c55e" },
};

export function CategoryChart({ data }: CategoryChartProps) {
  return (
    <Card className="flex flex-col border-none shadow-none lg:border lg:shadow-sm">
      <CardHeader className="items-center pb-0">
        <CardTitle>Category Distribution</CardTitle>
        <CardDescription>Analysis of listings by property type</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          id="admin-category-chart"
          config={chartConfig}
          className="mx-auto aspect-square max-h-75"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="category"
              innerRadius={60}
              strokeWidth={8}
              // Üstüne gelmeden isimleri göstermek için label özelliği:
              label={({ category, count }) => `${category}: ${count}`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
