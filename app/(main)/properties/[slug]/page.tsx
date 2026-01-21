import { createClient } from "@/lib/supabase/server";
import { Property } from "@/types/propertiesType";
import { notFound } from "next/navigation";
import React from "react";
import PropertyHeader from "./_components/PropertyHeader";
import PropertyGallery from "./_components/galery/PropertyGallery";
import PropertyFeatures from "./_components/PropertyFeatures";
import PropertyDescription from "./_components/PropertyDescription";
import PropertyAgentCard from "./_components/PropertyAgentCard";
import SimilarProperties from "./_components/SimilarProperties";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const slugParts = slug.split("-");
  const actualId = slugParts.slice(-5).join("-");

  const supabase = await createClient();

  const { data: property, error } = await supabase
    .from("properties")
    .select(
      `
      *
    `,
    )

    .eq("id", actualId)
    .single();
  const typedProperty = property as Property;

  const { data: similarProperties } = await supabase
    .from("properties")
    .select(
      `
    id, 
    title, 
    price, 
    images, 
    status, 
    category, 
    area_gross, 
    category_data,
    cities:city_id(name),
    districts:district_id(name)
  `,
    )
    .eq("category", typedProperty.category)
    .eq("city_id", typedProperty.city_id)
    .neq("id", actualId)
    .limit(4);

  if (error || !property) {
    notFound();
  }

  return (
    <div>
      <div className="h-16 w-full bg-black"></div>
      <div className="max-w-7xl mx-auto px-4 py-10 overflow-hidden">
        <PropertyHeader property={typedProperty} />
        <PropertyGallery images={typedProperty.images ?? []} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          {/* LEFT SIDE: DESCRIPTION AND FEATURES (%66) */}
          <div className="lg:col-span-2 space-y-12">
            <PropertyFeatures
              categoryData={typedProperty.category_data}
              areaGross={typedProperty.area_gross}
            />
            <hr className="border-slate-100" />
            <PropertyDescription description={typedProperty.description} />
          </div>

          {/* RIGHT SİDE : Sticky ASSISTANT CARD (%33) -  */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <PropertyAgentCard price={typedProperty.price} />
            </div>
          </div>
        </div>
        <SimilarProperties properties={similarProperties || []} />
      </div>
    </div>
  );
}
