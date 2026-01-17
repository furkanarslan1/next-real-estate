"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentSort = searchParams.get("sort") || "newest";

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex items-center justify-end gap-2 text-sm text-gray-500 my-6">
      <span>Sort by:</span>

      <select
        value={currentSort}
        className="border border-gray-200 rounded-md shadow-sm p-1"
        onChange={(e) => handleSort(e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="price-asc">Price: Low to High</option>
      </select>
    </div>
  );
}
