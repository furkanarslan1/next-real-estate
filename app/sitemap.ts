import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const supabase = await createClient();

  const staticPages = ["", "/about", "/contact", "/properties"];

  const staticRoutes = staticPages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  // İlanları çekiyoruz - is_active kontrolü ekledik

  // properties çekme kısmını şu şekilde güncelle:
  const { data: properties, error } = await supabase
    .from("properties")
    .select("id, title, updated_at")
    .eq("is_active", true);

  if (error) {
    console.error("Sitemap error:", error);
    return staticRoutes;
  }

  const propertyRoutes =
    properties?.map((prop) => {
      // URL'in sayfa yapısıyla (page.tsx) birebir aynı olması şart!
      const slug = `${prop.title.toLowerCase().replace(/ /g, "-")}-${prop.id}`;

      return {
        url: `${siteUrl}/properties/${slug}`,
        lastModified: prop.updated_at ? new Date(prop.updated_at) : new Date(),
        changeFrequency: "daily" as const,
        priority: 0.9,
      };
    }) || [];

  return [...staticRoutes, ...propertyRoutes];
}
