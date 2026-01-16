import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import React from "react";
import PropertyAddForm from "../../_components/PropertyAddForm";

interface EditPageProps {
  params: Promise<{ id: string }>; // Params artık bir Promise!
}

export default async function EditPropertyPage({ params }: EditPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
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
