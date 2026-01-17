// app/admin/page.tsx
import { getDashboardStats } from "@/app/(actions)/property/getPropertyStats";
import { CategoryChart } from "./_components/statistics/CategoryChart";
import { StatsGrid } from "./_components/statistics/StatsGrid";

export default async function AdminPage() {
  // Veriyi action üzerinden çekiyoruz
  const stats = await getDashboardStats();

  return (
    <div className="p-6 space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground text-sm">
          Welcome back! Here is your current real estate portfolio status.
        </p>
      </header>

      <StatsGrid
        total={stats.total}
        forSale={stats.forSale}
        forRent={stats.forRent}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CategoryChart data={stats.chartData} />
      </div>
    </div>
  );
}
