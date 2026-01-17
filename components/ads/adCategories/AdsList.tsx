import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import React from "react";
import AdCategories from "./AdCategories";

export default async function AdsList({
  category,
  params,
  sort,
}: {
  category: string;
  params: "home" | "adsList";
  sort?: string;
}) {
  const supabase = await createClient();

  // CATEGORY
  const { data: categoriesData } = await supabase
    .from("categories")
    .select("id,name,slug");

  // CATEGORY FILTER
  let query = supabase
    .from("properties")
    .select("id, title, price, category, images, category_data")
    .eq("is_active", true);
  if (category && category !== "all") {
    query = query.eq("category", category);
  }
  // SORT
  if (sort === "price-asc") {
    query = query.order("price", { ascending: true });
  } else if (sort === "price-desc") {
    query = query.order("price", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  //LIMIT
  if (params === "home") {
    query = query.limit(5);
  }

  const { data: adsData, error } = await query;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* Kategori Barı */}
      <AdCategories categories={categoriesData || []} />

      {/* İlan Listesi Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {adsData && adsData.length > 0 ? (
          adsData.map((ad) => <PropertyCard key={ad.id} property={ad} />)
        ) : (
          <div className="col-span-full text-center py-20 border-2 border-dashed rounded-3xl">
            <p className="text-muted-foreground italic">
              No listings found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Alt Buton: Sadece Ana Sayfadaysak */}
      {params === "home" && (
        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            <Link href="/ads">View All Listings</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
