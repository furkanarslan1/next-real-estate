"use server";

import { createClient } from "@/lib/supabase/server";
import { PropertyValues } from "@/schemas/propertySchema";

export async function updatePropertyAction(
  id: string,
  values: PropertyValues,
  finalImageUrls: string[]
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("properties")
    .update({
      title: values.title,
      description: values.description,
      price: values.price,
      category: values.category,
      status: values.status,
      area_gross: values.area_gross,
      area_net: values.area_net,
      city_id: values.city_id,
      district_id: values.district_id,
      neighborhood_id: values.neighborhood_id,
      category_data: values.category_data,
      images: finalImageUrls,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
