import PropertiesCategories from "@/components/properties/PropertiesCategories/PropertiesCategories";
import PropertiesFilter from "@/components/properties/PropertiesCategories/PropertiesFilter";
import PropertiesList from "@/components/properties/PropertiesCategories/PropertiesList";
import { AdsListSkeleton } from "@/components/properties/PropertyCardSkeleton";
import SortFilter from "@/components/properties/SortFilter";
import { STATIC_CATEGORIES } from "@/lib/constants/categories";
import { Suspense } from "react";

export default async function AdsPage({
  searchParams,
}: {
  searchParams: Promise<{
    city?: string;
    district?: string;
    minPrice?: string;
    maxPrice?: string;
    rooms?: string;
    sort?: string;
    category?: string;
  }>;
}) {
  const params = await searchParams;
  const suspenseKey = JSON.stringify(params);
  const category = params.category || "all";
  return (
    <div className=" space-y-8">
      <div className="h-16 bg-linear-to-bl from-slate-950 to-slate-700"></div>
      <div className="max-w-7xl mx-auto px-4  space-y-4">
        <PropertiesFilter />
        <PropertiesCategories categories={STATIC_CATEGORIES || []} />
        <SortFilter />
        <Suspense key={suspenseKey} fallback={<AdsListSkeleton />}>
          <PropertiesList
            selectedCategory={category}
            params="adsList"
            sort={params.sort}
            searchParams={params}
          />
        </Suspense>
      </div>
    </div>
  );
}
