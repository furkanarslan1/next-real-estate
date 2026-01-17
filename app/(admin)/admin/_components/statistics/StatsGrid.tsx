import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Key, Tag } from "lucide-react";

interface StatsGridProps {
  total: number;
  forSale: number;
  forRent: number;
}

export function StatsGrid({ total, forSale, forRent }: StatsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Total Listings
          </CardTitle>
          <Building2 className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
          <p className="text-xs text-muted-foreground italic">Portfolio size</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            For Sale
          </CardTitle>
          <Tag className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{forSale}</div>
          <p className="text-xs text-muted-foreground italic">Active sales</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            For Rent
          </CardTitle>
          <Key className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{forRent}</div>
          <p className="text-xs text-muted-foreground italic">
            Rental portfolio
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
