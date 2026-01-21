import { createClient } from "@/lib/supabase/server";
import { Property } from "@/types/propertiesType";
import { notFound } from "next/navigation";
import React from "react";
import PropertyHeader from "./_components/PropertyHeader";
import PropertyGallery from "./_components/galery/PropertyGallery";
import PropertyFeatures from "./_components/PropertyFeatures";
import PropertyDescription from "./_components/PropertyDescription";

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

  if (error || !property) {
    notFound();
  }

  const typedProperty = property as Property;

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

          {/* RIGHT SİDE TARAF: Sticky ASSISTANT CARD (%33) -  */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* <PropertyAgentCard user={typedProperty.user} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
