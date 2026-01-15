"use server";

import { rateLimit } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";
import { propertySchema } from "@/schemas/propertySchema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";

// Bu tip, formdan gelen "ham" veriyi temsil eder
export type PropertyFormInput = z.input<typeof propertySchema>;

// Bu tip, Zod'un temizlediği (coerce edilmiş) veriyi temsil eder
export type PropertyValues = z.infer<typeof propertySchema>;

interface ActionResponse {
  success: boolean;
  error?: string;
}

/**
 * Creates a new property in the database with strict typing.
 * Kesin tipleme ile veritabanında yeni bir mülk kaydı oluşturur.
 */

export async function addPropertyAction(
  formData: PropertyFormInput,
  imageUrls: string[]
): Promise<ActionResponse> {
  // Get IP address / IP adresini al
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") || "unknown";

  // Check rate limit / İstek sınırını kontrol et
  const { isRateLimited } = rateLimit(ip);
  if (isRateLimited) {
    return {
      success: false,
      error: "Too many requests. Please try again in a minute.",
    };
  }
  const supabase = await createClient();

  // Re-verify auth on server side / Sunucu tarafında yetkiyi tekrar doğrula
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized access" };
  }

  // 1. Server-side validation with Zod (Returns clean PropertyValues)
  // 1. Zod ile sunucu tarafı doğrulaması (Temizlenmiş PropertyValues döner)

  const result = propertySchema.safeParse(formData);
  if (!result.success) {
    // Format Zod errors into a readable string
    // Zod hatalarını okunabilir bir metne dönüştür
    const errorMessage = result.error.issues.map((e) => e.message).join(", ");
    return { success: false, error: `Validation failed: ${errorMessage}` };
  }

  // 2. Insert validated data into Supabase
  // 2. Doğrulanmış veriyi Supabase'e ekle

  const { error: dbError } = await supabase.from("properties").insert({
    ...result.data,
    images: imageUrls,
    user_id: user.id,
  });

  if (dbError) {
    console.error("Database Insert Error:", dbError);
    return { success: false, error: dbError.message };
  }

  // 3. Clear cache for the property list
  // 3. Mülk listesi için önbelleği temizle
  revalidatePath("/admin/property");

  return { success: true };
}
