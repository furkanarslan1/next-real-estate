import { Property } from "@/types/propertiesType";
import { BedDouble, Square } from "lucide-react";
import Link from "next/link";
import React from "react";
import slugify from "slugify";

export type PropertyCardData = Pick<
  Property,
  | "id"
  | "title"
  | "price"
  | "category"
  | "status"
  | "images"
  | "category_data"
  | "area_gross"
>;

type PropertyCardProps = {
  property: PropertyCardData;
};
export default function PropertyCard({
  property,
}: {
  property: PropertyCardData;
}) {
  const mainImage = property.images?.[0] || "/placeholder.jpg";
  const titleSlug = slugify(property.title, {
    lower: true,
    strict: true,
    locale: "tr",
  });

  return (
    <Link href={`/properties/${titleSlug}-${property.id}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
        {/* IMAGE */}
        <div className="relative aspect-4/3 overflow-hidden">
          <img
            src={mainImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-bold uppercase text-slate-700">
              {property.status === "sale" ? "sale" : "KİRALIK"}
            </span>
          </div>
        </div>

        {/* DETAIL */}
        <div className="p-4">
          <h3 className="font-bold text-slate-800 text-lg truncate group-hover:text-orange-500 transition-colors">
            {property.title}
          </h3>

          <p className="text-orange-600 font-extrabold text-xl mt-1">
            {new Intl.NumberFormat("tr-TR").format(property.price)} ₺
          </p>

          {/* FEATURES M2 ROOM COUNT VS */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-50 text-slate-500 text-sm">
            <div className="flex items-center gap-1">
              <BedDouble size={16} className="text-orange-500" />
              <span>{property.category_data?.room_count || "N/A"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Square size={14} className="text-orange-500" />
              <span>{property.area_gross} m²</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
