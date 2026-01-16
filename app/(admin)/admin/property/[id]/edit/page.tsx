import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import React from "react";
import PropertyAddForm from "../../_components/PropertyAddForm";

export default async function PropertyEditPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !property) {
    notFound();
  }
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">
        Edit Property: {property.title}
      </h1>
      <PropertyAddForm initialData={property} />
    </div>
  );
}
