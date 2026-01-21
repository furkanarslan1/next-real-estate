"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // URL'den mevcut sıralamayı al, yoksa 'newest' vlandy
  // Get the current ranking from the URL, otherwise assume 'newest'
  const currentSort = searchParams.get("sort") || "newest";

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "newest") {
      // Eğer vlandyılan seçildiyse URL'yi temiz tutmak için parametreyi silelim
      // If the default is selected, delete the parameter to keep the URL clean.
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    // Filtreleme değiştiğinde genellikle ilk sayfaya dönmek istenir
    // When the filtering changes, it is usually desirable to return to the first page.
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex items-center justify-end gap-3 text-sm my-6">
      <span className="text-muted-foreground font-medium">Order:</span>

      <select
        value={currentSort}
        className="bg-white border border-gray-200 text-gray-700 rounded-lg px-3 py-1.5 
                   outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 
                   transition-all cursor-pointer shadow-sm"
        onChange={(e) => handleSort(e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="price-asc">Price: Low to High</option>
      </select>
    </div>
  );
}
