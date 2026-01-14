"use server"; // Mark this file as Server Actions / Bu dosyayı Server Action olarak işaretler

import { createClient } from "@/lib/supabase/server"; // Server-side client / Sunucu tarafı istemcisi
import { revalidatePath } from "next/cache";

/**
 * Deletes a property and its associated images from storage.
 * Bir mülkü ve onunla ilişkili resimleri depolama alanından siler.
 * * @param id - The unique identifier of the property / Mülkün benzersiz kimliği
 * @param imageUrls - Array of public URLs of images / Resimlerin genel URL dizisi
 */
export async function deleteProperty(id: string, imageUrls: string[] | null) {
  const supabase = await createClient();

  try {
    // 1. Storage Cleanup / Depolama Alanı Temizliği
    if (imageUrls && imageUrls.length > 0) {
      // Extract file names from full public URLs
      // Tam URL'lerden dosya adlarını ayıkla
      // Example: .../property-images/file-123.png -> file-123.png
      const filePaths = imageUrls.map((url) => {
        const parts = url.split("/");
        return parts[parts.length - 1];
      });

      const { error: storageError } = await supabase.storage
        .from("property-images")
        .remove(filePaths);

      if (storageError) {
        // Log but don't stop; property removal is more critical
        // Logla ama durdurma; mülkün silinmesi daha kritiktir
        console.error("Storage delete error:", storageError);
      }
    }

    // 2. Database Deletion / Veritabanından Silme
    const { error: dbError } = await supabase
      .from("properties")
      .delete()
      .eq("id", id);

    if (dbError) {
      throw dbError;
    }

    // 3. Revalidate the list page to show fresh data
    // Güncel verileri göstermek için liste sayfasını yeniden doğrula (cache temizle)
    revalidatePath("/admin/property");

    return { success: true };
  } catch (error: any) {
    console.error("Delete Action Error :", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}
