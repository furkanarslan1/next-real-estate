import AdCategories from "@/components/ads/adCategories/AdCategories";
import AdsFilter from "@/components/ads/adCategories/AdsFilter";
import AdsList from "@/components/ads/adCategories/AdsList";
import { AdsListSkeleton } from "@/components/ads/PropertyCardSkeleton";
import SortFilter from "@/components/ads/SortFilter";
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
    <div className=" ">
      <div className="h-16 bg-black"></div>
      <div className="max-w-7xl mx-auto ">
        <AdsFilter />
        <AdCategories categories={STATIC_CATEGORIES || []} />
        <SortFilter />
        <Suspense key={suspenseKey} fallback={<AdsListSkeleton />}>
          <AdsList
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
