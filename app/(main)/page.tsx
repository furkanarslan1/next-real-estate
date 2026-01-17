import Image from "next/image";
import Hero from "./_components/hero/Hero";
import AdsList from "@/components/ads/adCategories/AdsList";
import { Suspense } from "react";
import { AdsListSkeleton } from "@/components/ads/PropertyCardSkeleton";
import SortFilter from "@/components/ads/SortFilter";
import AdCategories from "@/components/ads/adCategories/AdCategories";
import { STATIC_CATEGORIES } from "@/lib/constants/categories";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category || "all";
  const suspenseKey = JSON.stringify(params);

  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto">
        <AdCategories categories={STATIC_CATEGORIES || []} />
        <SortFilter />
      </div>

      <Suspense key={suspenseKey} fallback={<AdsListSkeleton />}>
        <AdsList category={category} key={category} params="home" />
      </Suspense>
    </div>
  );
}
