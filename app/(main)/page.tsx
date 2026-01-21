import Image from "next/image";
import Hero from "./_components/hero/Hero";

import { Suspense } from "react";

import { STATIC_CATEGORIES } from "@/lib/constants/categories";

import BannerFamily from "./_components/banner/BannerFamily";
import AboutStats from "./about/_components/AboutStats";
import PropertiesFilter from "@/components/properties/PropertiesCategories/PropertiesFilter";
import PropertiesCategories from "@/components/properties/PropertiesCategories/PropertiesCategories";
import SortFilter from "@/components/properties/SortFilter";
import PropertiesList from "@/components/properties/PropertiesCategories/PropertiesList";
import PropertyCardSkeleton from "@/components/properties/PropertyCardSkeleton";

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
        <PropertiesFilter />
        <PropertiesCategories categories={STATIC_CATEGORIES || []} />
        <SortFilter />
      </div>

      <Suspense key={suspenseKey} fallback={<PropertyCardSkeleton />}>
        <PropertiesList sort={sort} selectedCategory={category} params="home" />
      </Suspense>
      <BannerFamily />
      <AboutStats />
    </div>
  );
}
