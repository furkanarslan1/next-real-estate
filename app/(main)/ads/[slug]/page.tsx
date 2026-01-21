import { createClient } from "@/lib/supabase/server";
import { Property } from "@/types/propertiesType";
import { notFound } from "next/navigation";
import React from "react";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log("Sayfa yakalandı, gelen slug:", slug);

  const slugParts = slug.split("-");
  const actualId = slugParts.slice(-5).join("-");
  console.log("URL'den Gelen Slug:", slug);
  console.log("Ayıklanan Gerçek ID:", actualId);

  const supabase = await createClient();

  const { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", actualId)
    .single();

  if (error || !property) {
    notFound();
  }

  const typedProperty = property as Property;

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Şimdilik sadece başlığı basalım, her şeyin çalıştığını görelim */}
        <h1 className="text-3xl font-bold">{typedProperty.title}</h1>

        {/* Bölüm bölüm ilerleyeceğiz: Header, Gallery vb. buraya gelecek */}
      </div>
    </div>
  );
}
