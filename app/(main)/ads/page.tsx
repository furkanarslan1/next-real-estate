import AdsFilter from "@/components/ads/adCategories/AdsFilter";
import AdsList from "@/components/ads/adCategories/AdsList";
import SortFilter from "@/components/ads/SortFilter";

export default async function AdsPage({
  searchParams,
}: {
  searchParams: {
    city?: string;
    district?: string;
    minPrice?: string;
    maxPrice?: string;
    rooms?: string;
    sort?: string;
  };
}) {
  const params = await searchParams;
  return (
    <div className=" ">
      <div className="h-16 bg-black"></div>
      <div className="max-w-7xl mx-auto ">
        <AdsFilter />

        <AdsList
          category="all"
          params="adsList"
          sort={params.sort}
          searchParams={params}
        />
      </div>
    </div>
  );
}
