import z from "zod";

export const filterSchema = z
  .object({
    minPrice: z
      .string()
      .optional()
      .transform((v) => (v ? Number(v) : undefined)),
    maxPrice: z
      .string()
      .optional()
      .transform((v) => (v ? Number(v) : undefined)),
  })
  .refine(
    (data) => {
      if (data.minPrice !== undefined && data.maxPrice !== undefined) {
        return data.maxPrice >= data.minPrice;
      }
      return true;
    },
    {
      message: "Max price cannot be lower than min price",
      path: ["maxPrice"],
    },
  );
