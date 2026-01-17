"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function AdCategories({ categories }: CategoriesProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const selectedCategory = searchParams.get("category");

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value || "all");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-4 text-sm">
      <Swiper spaceBetween={9} slidesPerView={"auto"} freeMode>
        {/* ALL */}
        <SwiperSlide style={{ width: "auto" }}>
          <div
            onClick={() => handleChange("all")}
            className={`px-4 py-2 rounded-md cursor-pointer text-sm ${
              !selectedCategory || selectedCategory === "all"
                ? "bg-white"
                : "bg-gray-200"
            }`}
          >
            All
          </div>
        </SwiperSlide>
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
