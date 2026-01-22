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
import Script from "next/script";

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/properties/${slug}`,
    name: typedProperty.title,
    description: typedProperty.description,
    image: typedProperty.images,
    datePosted: typedProperty.created_at,
    category: typedProperty.category,
    offers: {
      "@type": "Offer",
      price: typedProperty.price,
      priceCurrency: "TRY",
      availability: "https://schema.org/InStock",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/properties/${slug}`,
    },
  };

  return (
    <>
      {/* 1. Google Rich Results için Script */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  );
}
