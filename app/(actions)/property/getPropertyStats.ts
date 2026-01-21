"use server";

import { createClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
  const supabase = await createClient();

  const { data: properties, error } = await supabase
    .from("properties")
    .select("category, status");

  if (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch statistics");
  }

  const total = properties.length;
  const forSale = properties.filter((p) => p.status === "sale").length;
  const forRent = properties.filter((p) => p.status === "rent").length;

  const categoryLabels: Record<string, string> = {
    residential: "Residential",
    commercial: "Commercial",
    land: "Land",
  };

  const categoryColors: Record<string, string> = {
    residential: "#f97316",
    commercial: "#22c55e",
    land: "#3b82f6",
  };

  const chartData = Object.keys(categoryLabels).map((cat) => ({
    category: categoryLabels[cat],
    count: properties.filter((p) => p.category === cat).length,
    fill: categoryColors[cat],
  }));

  return { total, forSale, forRent, chartData };
}
