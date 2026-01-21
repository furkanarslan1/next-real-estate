import { createClient } from "@/lib/supabase/server";
import { Property } from "@/types/propertiesType";
import { notFound } from "next/navigation";
import React from "react";
import PropertyHeader from "./_components/PropertyHeader";
import PropertyGallery from "./_components/galery/PropertyGallery";

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
      </div>
    </div>
  );
}
