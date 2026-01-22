import { Property } from "@/types/propertiesType";
import { Hash, MapPin } from "lucide-react";
import React from "react";

interface PropertyHeaderProps {
  property: Property;
}

export default function PropertyHeader({ property }: PropertyHeaderProps) {
  const formattedPrice = new Intl.NumberFormat("tr-TR").format(property.price);

  return (
    <header className="mb-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        {/* LEFT */}
        <div className="space-y-2">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-snug">
            {property.title}
          </h1>

          {/* META */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <MapPin size={16} className="text-orange-500" />
              <span>Location</span>
            </div>

            <span className="text-slate-300">•</span>

            <div className="flex items-center gap-1 uppercase tracking-wide text-xs">
              <Hash size={12} />
              {property.category}
            </div>

            <span className="text-slate-300">•</span>

            <span className="bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-xs font-semibold border border-orange-100">
              {property.status === "sale" ? "sale" : "rent"}
            </span>
          </div>
        </div>

        {/* RIGHT – PRICE */}
        <div className="bg-orange-500/10 border border-orange-200 rounded-2xl px-6 py-4 text-right min-w-55">
          <p className="text-xs text-orange-500 font-medium mb-1">Price</p>
          <p className="text-2xl font-black text-orange-500">
            $ {formattedPrice}
          </p>
        </div>
      </div>
    </header>
  );
}
