import Image from "next/image";
import Hero from "./_components/hero/Hero";
import AdsList from "@/components/ads/adCategories/AdsList";
import { Suspense } from "react";
import { AdsListSkeleton } from "@/components/ads/PropertyCardSkeleton";
import SortFilter from "@/components/ads/SortFilter";
import AdCategories from "@/components/ads/adCategories/AdCategories";
import { STATIC_CATEGORIES } from "@/lib/constants/categories";
import AdsFilter from "@/components/ads/adCategories/AdsFilter";
import BannerFamily from "./_components/banner/BannerFamily";
import AboutStats from "./about/_components/AboutStats";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const category = params.category || "all";
  const suspenseKey = JSON.stringify(params);
  const sort = params.sort;

  return (
    <div className="space-y-6">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 space-y-4">
        <AdsFilter />
        <AdCategories categories={STATIC_CATEGORIES || []} />
        <SortFilter />
      </div>

      <Suspense key={suspenseKey} fallback={<AdsListSkeleton />}>
        <AdsList sort={sort} selectedCategory={category} params="home" />
      </Suspense>
      <BannerFamily />
      <AboutStats />
    </div>
  );
}
