"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface AdCategoriesProps {
  categories: Category[];
}

export default function PropertiesCategories({
  categories,
}: AdCategoriesProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const selectedCategory = searchParams.get("category") || "residential";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-4 text-sm">
      <Swiper spaceBetween={9} slidesPerView={"auto"} freeMode>
        {categories.map((cat) => (
          <SwiperSlide key={cat.id} style={{ width: "auto" }}>
            <div
              onClick={() => handleChange(cat.slug)}
              className={`px-4 py-2 rounded-md cursor-pointer text-sm ${
                cat.slug === selectedCategory ? "bg-white" : "bg-gray-200"
              }`}
            >
              {cat.name}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
