import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import React from "react";

import PropertyCard, { PropertyCardData } from "./PropertyCard";
import Pagination from "@/components/pagination/Pagination";

const ITEMS_PER_PAGE = 8;

export default async function PropertiesList({
  selectedCategory,
  params,
  sort,
  searchParams,
}: {
  selectedCategory: string;
  params: "home" | "adsList";
  sort?: string;
  searchParams?: {
    [key: string]: string | undefined;
  };
}) {
  const supabase = await createClient();
  const city = searchParams?.city;
  const district = searchParams?.district;
  // const minPrice = searchParams?.minPrice
  //   ? Number(searchParams.minPrice)
  //   : null;
  // const maxPrice = searchParams?.maxPrice
  //   ? Number(searchParams.maxPrice)
  //   : null;
  // const rooms = searchParams?.rooms ? Number(searchParams.rooms) : null;
  const minPrice = searchParams?.minPrice
    ? Number(searchParams.minPrice)
    : null;
  const maxPrice = searchParams?.maxPrice
    ? Number(searchParams.maxPrice)
    : null;
  const neighborhood = searchParams?.neighborhood;
  const currentPage = searchParams?.page ? Number(searchParams.page) : 1;

  // CATEGORY FILTER
  let query = supabase
    .from("properties")
    .select(
      `
      id, 
      title, 
      price, 
      category, 
      status,
      images, 
      category_data, 
      area_gross
    `,
      { count: "exact" },
    )
    .eq("is_active", true);
  if (selectedCategory) {
    query = query.eq("category", selectedCategory);
  }

  if (city) query.eq("city_id", city);
  if (district) query.eq("district_id", district);
  if (minPrice) query.gte("price", minPrice);
  if (maxPrice) query.lte("price", maxPrice);
  if (neighborhood) query.eq("neighborhood_id", Number(neighborhood));
  // if (rooms) query.contains("category_data", { rooms: rooms });

  //Bu liste dışındaki her parametre category_data içinde aranacak
  //Any parameter not included in this list will be searched within category_data.
  const coreKeys = [
    "city",
    "district",
    "neighborhood",
    "minPrice",
    "maxPrice",
    "category",
    "page",
    "sort",
  ];

  // if (searchParams) {
  //   Object.entries(searchParams).forEach(([key, value]) => {
  //     if (!coreKeys.includes(key) && value) {
  //       query = query.filter(`category_data->>${key}`, "eq", value);
  //     }
  //   });
  // }

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (!value || coreKeys.includes(key)) return;

      // furnished (boolean stored as json)
      if (key === "furnished") {
        query = query.eq("category_data->>furnished", value);
        return;
      }

      // floor (number but compared as string)
      if (key === "floor") {
        query = query.eq("category_data->>floor", value);
        return;
      }

      // building_age (range)
      if (key === "building_age") {
        if (value.includes("-")) {
          const [min, max] = value.split("-").map(Number);
          query = query
            .gte("category_data->>building_age::int", min)
            .lte("category_data->>building_age::int", max);
        } else if (value.endsWith("+")) {
          const min = Number(value.replace("+", ""));
          query = query.gte("category_data->>building_age::int", min);
        } else {
          query = query.eq("category_data->>building_age::int", Number(value));
        }
        return;
      }

      // default string fields
      query = query.eq(`category_data->>${key}`, value);
    });
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
    query = query.limit(8);
  } else {
    const from = (currentPage - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;
    query = query.range(from, to);
  }

  const { data: adsData, error, count } = await query;

  if (error) {
    console.error("Supabase Error:", error.message);
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-semibold">
          An error occurred while loading the ads.
        </p>
        <p className="text-sm text-gray-400">Please refresh the page.</p>
      </div>
    );
  }

  const totalPages = count ? Math.ceil(count / ITEMS_PER_PAGE) : 0;

  return (
    <div className="max-w-7xl mx-auto py-1 px-4">
      <p className="text-sm text-muted-foreground mt-4">
        Total <span className="font-bold text-foreground">{count || 0}</span>{" "}
        ads founded.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 ">
        {adsData && adsData.length > 0 ? (
          adsData.map((ad: PropertyCardData) => (
            <PropertyCard key={ad.id} property={ad} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 border-2 border-dashed rounded-3xl">
            <p className="text-muted-foreground italic">
              No listings found in this category.
            </p>
          </div>
        )}
      </div>

      {params === "home" && (
        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            <Link href="/properties">View All Listings</Link>
          </Button>
        </div>
      )}
      {params === "adsList" && totalPages > 1 && (
        <Pagination totalPages={totalPages} />
      )}
    </div>
  );
}
