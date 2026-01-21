import React from "react";
import PropertyCard from "@/components/properties/PropertyCard"; //
import { Property } from "@/types/propertiesType";

type SimilarPropertyMinimal = Pick<
  Property,
  | "id"
  | "title"
  | "price"
  | "images"
  | "status"
  | "category"
  | "area_gross"
  | "category_data"
> & {
  cities?: { name: string }[] | { name: string } | null;
  districts?: { name: string }[] | { name: string } | null;
};

interface SimilarPropertiesProps {
  properties: SimilarPropertyMinimal[];
}
export default function SimilarProperties({
  properties,
}: SimilarPropertiesProps) {
  if (!properties || properties.length === 0) return null;

  return (
    <section className="mt-20 pt-10 border-t border-slate-100">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="text-2xl font-black text-slate-900">
            Similar Listings
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            Properties you might also be interested in.
          </p>
        </div>
        <button className="text-orange-600 font-bold text-sm hover:underline">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((item) => (
          <PropertyCard key={item.id} property={item} />
        ))}
      </div>
    </section>
  );
}
