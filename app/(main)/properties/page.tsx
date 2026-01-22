import type { Metadata } from "next";
import PropertiesCategories from "@/components/properties/PropertiesCategories/PropertiesCategories";
import PropertiesFilter from "@/components/properties/PropertiesCategories/PropertiesFilter";
import PropertiesList from "@/components/properties/PropertiesCategories/PropertiesList";
import { AdsListSkeleton } from "@/components/properties/PropertyCardSkeleton";
import SortFilter from "@/components/properties/SortFilter";
import { STATIC_CATEGORIES } from "@/lib/constants/categories";
import { Suspense } from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const category = searchParams.category || "residential";

  const titleMap: Record<string, string> = {
    residential: "Residential Properties",
    commercial: "Commercial Properties",
    land: "Land & Plots for Sale",
  };

  const title = titleMap[category] || "Property Listings";

  const description = `Browse ${title.toLowerCase()} with real prices, photos and detailed information.`;

  const isFiltered =
    Object.keys(searchParams).length > 1 ||
    (Object.keys(searchParams).length === 1 && !searchParams.category);

  return {
    title: `${title} | Modern Real Estate`,
    description,

    alternates: {
      canonical: `${siteUrl}/properties${
        searchParams.category ? `?category=${category}` : ""
      }`,
    },

    robots: {
      index: !isFiltered,
      follow: true,
    },
  };
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{
    // city?: string;
    // district?: string;
    // minPrice?: string;
    // maxPrice?: string;
    // rooms?: string;
    // sort?: string;
    // category?: string;
    [key: string]: string | undefined;
  }>;
}) {
  const params = await searchParams;
  const suspenseKey = JSON.stringify(params);
  const category = params.category || "residential";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Property Listings",
    url: `${siteUrl}/properties`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

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
    </>
  );
}
