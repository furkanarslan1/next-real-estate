import * as z from "zod";

export const propertySchema = z.object({
  title: z.string().min(10).max(100),
  description: z.string().min(20),
  category: z.enum(["residential", "commercial", "land", "project"]),
  status: z.enum(["sale", "rent"]),

  // 🔴 Buradaki transform(Number) KRİTİK
  price: z.coerce.number().min(0).transform(Number),
  city_id: z.coerce.number().min(1).transform(Number),
  district_id: z.coerce.number().min(1).transform(Number),
  neighborhood_id: z.coerce.number().min(1).transform(Number),
  area_gross: z.coerce
    .number()
    .min(1, { message: "Gross area must be greater than 0" }),
  area_net: z.coerce
    .number()
    .min(1, { message: "Net area must be greater than 0" }),

  category_data: z
    .object({
      room_count: z.string().optional(),
      building_age: z.string().optional(),
      floor_number: z.string().optional(),
      total_floor: z.string().optional(),
      kitchen: z.enum(["closed", "open"]).default("closed"),
      elevator: z.enum(["yes", "no"]).default("yes"),
      heating: z
        .enum(["natural gas", "air conditioning", "stove"])
        .default("natural gas"),
      bathrooms: z.string().optional(),
      balconies: z.string().optional(),
      maintenance_fee: z.coerce.number().min(0).optional().default(0),
      parking: z.enum(["no", "open", "close"]).default("no"),
      usage_status: z
        .enum(["vacant", "tenant", "property_owner"])
        .default("vacant"),
      furnished: z.boolean().default(false),
      swap: z.boolean().default(false),
      in_site: z.boolean().optional(),
      zoning_status: z.string().optional(),
      ada: z.string().optional(),
      parsel: z.string().optional(),
    })
    .default({
      maintenance_fee: 0,
      parking: "no",
      usage_status: "vacant",
      furnished: false,
      swap: false,
      kitchen: "closed",
      elevator: "yes",
      heating: "natural gas",
    }),

  images: z.array(z.string()).default([]),
});

// ✅ Type export
export type PropertyValues = z.infer<typeof propertySchema>;
