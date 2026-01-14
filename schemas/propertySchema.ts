import * as z from "zod";

export const propertySchema = z.object({
  title: z.string().min(10).max(100),
  description: z.string().min(20),
  category: z.enum(["konut", "is_yeri", "arsa", "proje"]),
  status: z.enum(["satilik", "kiralik"]),

  // 🔴 Buradaki transform(Number) KRİTİK
  price: z.coerce.number().min(0).transform(Number),
  city_id: z.coerce.number().min(1).transform(Number),
  district_id: z.coerce.number().min(1).transform(Number),
  neighborhood_id: z.coerce.number().min(1).transform(Number),

  category_data: z
    .object({
      room_count: z.string().optional(),
      building_age: z.string().optional(),
      floor_number: z.string().optional(),
      heating: z.string().optional(),
      bathrooms: z.string().optional(),
      balconies: z.string().optional(),
      in_site: z.boolean().optional(),
      zoning_status: z.string().optional(),
      ada: z.string().optional(),
      parsel: z.string().optional(),
    })
    .default({}),

  images: z.array(z.string()).default([]),
});

// ✅ Type export
export type PropertyValues = z.infer<typeof propertySchema>;
