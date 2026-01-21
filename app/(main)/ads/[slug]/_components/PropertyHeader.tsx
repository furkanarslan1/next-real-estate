import { Property } from "@/types/propertiesType";
import { Hash, MapPin } from "lucide-react";
import React from "react";

interface PropertyHeaderProps {
  property: Property;
}

export default function PropertyHeader({ property }: PropertyHeaderProps) {
  const formattedPrice = new Intl.NumberFormat("us-US").format(property.price);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
      <div className="space-y-3 flex-1">
        {/* TITLE */}
        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          {property.title}
        </h1>

        <div className="flex items-center text-slate-500 gap-1.5 text-sm md:text-base">
          <MapPin size={18} className="text-orange-500" />

          <span className="font-medium">
            {/* {property.districts?.name},{property.neighborhoods?.name},{" "}
            {property.cities?.name} */}
            Location
          </span>
          <span className="mx-2 text-slate-300">•</span>
          {/* CATEGORY */}
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            <Hash size={12} />

            <span>{property.category}</span>
          </div>
          <span className="mx-2 text-slate-300">•</span>

          <span className="bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm">
            {property.status === "satilik" ? "Satılık" : "Kiralık"}
          </span>
          <span className="mx-2 text-slate-300">•</span>

          {/* PRICE */}
          <div className="bg-orange-600 px-4 py-2 rounded-2xl  text-center md:text-right shadow-lg shadow-orange-100">
            <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">
              Price
            </p>
            <p className="text-white font-black text-sm leading-none">
              {formattedPrice} <span className="text-sm font-medium">$</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
