"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { propertySchema } from "@/schemas/propertySchema";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { StepBasicInfo } from "./steps/StepBasicInfo";
import { StepLocation } from "./steps/StepLocation";
import { StepFeatures } from "./steps/StepFeatures";
import { StepImages, ImageFile } from "./steps/StepImages";
import { Loader2 } from "lucide-react";
import { addPropertyAction } from "@/app/(actions)/property/addPropertyAction";

// Use input for form initialization, infer for clean data
// Form başlatma için 'input', temiz veri için 'infer' kullanıyoruz
type PropertyFormInput = z.input<typeof propertySchema>;
type PropertyValues = z.infer<typeof propertySchema>;

export default function PropertyAddForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Number(searchParams.get("step") ?? 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [capturedFiles, setCapturedFiles] = useState<ImageFile[]>([]);

  const form = useForm<PropertyFormInput>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      category: "konut",
      status: "satilik",
      price: 0,
      area_gross: 0,
      area_net: 0,
      city_id: 0,
      district_id: 0,
      neighborhood_id: 0,
      category_data: {
        room_count: "",
        building_age: "",
        floor_number: "",
        total_floor: "",
        heating: "natural gas",
        bathrooms: "",
        balconies: "",
        zoning_status: "",
        ada: "",
        parsel: "",

        kitchen: "closed",
        elevator: "yes",
        parking: "no",
        usage_status: "vacant",

        maintenance_fee: 0,

        furnished: false,
        swap: false,
        in_site: false,
      },
      images: [],
    },
  });

  const setStep = (newStep: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", newStep.toString());
    router.push(`?${params.toString()}`);
  };

  const handleNext = async () => {
    // Definitive mapping of fields per step to avoid missing validations
    // Eksik doğrulama kalmaması için her adımın alanlarını kesin olarak eşleştiriyoruz
    const stepFields: Record<number, Array<keyof PropertyFormInput>> = {
      1: ["title", "description", "category", "status", "price"],
      2: ["city_id", "district_id", "neighborhood_id"],
      3: ["category_data"],
      4: ["images"],
    };

    const isValid = await form.trigger(stepFields[step]);
    if (!isValid) return;

    if (step < 4) {
      setStep(step + 1);
    } else {
      // Final Zod check before calling onSubmit
      // onSubmit'i çağırmadan önce son Zod kontrolü
      const values = form.getValues();
      await onSubmit(values);
    }
  };

  const onSubmit = async (values: PropertyFormInput) => {
    // 1. Final Client-side Validation & Transformation
    // Resim yükleme maliyetine girmeden önce temiz veriyi al
    const validationResult = propertySchema.safeParse(values);

    if (!validationResult.success) {
      toast.error("Please check the form for errors.");
      return;
    }

    // result.data artık 'PropertyValues' tipindedir ve tertemizdir!
    const cleanValues = validationResult.data;
    // Keep track of successfully uploaded paths for cleanup in case of error
    // Hata durumunda temizlik yapmak için başarıyla yüklenen yolları takip et
    const successfulUploads: string[] = [];
    try {
      setIsSubmitting(true);
      const supabase = createClient();

      // 1. Auth Check / Kullanıcı Kontrolü
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user)
        throw new Error("Session not found, please log in again.");

      if (capturedFiles.length === 0)
        throw new Error("Please upload at least one picture.");

      // 2. Parallel Upload with Promise.all / Promise.all ile Paralel Yükleme
      // We start all uploads at the same time / Tüm yüklemeleri aynı anda başlatıyoruz
      const uploadPromises = capturedFiles.map(async (imgObj) => {
        const fileExt = imgObj.file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(filePath, imgObj.file);

        if (uploadError) {
          // Log individual errors / Münferit hataları logla
          console.error(`Upload failed for ${imgObj.file.name}:`, uploadError);
          throw new Error(`Failed to upload: ${imgObj.file.name}`);
        }

        // Track successful upload for potential cleanup
        // Olası bir temizlik işlemi için başarılı yüklemeyi listeye ekle
        successfulUploads.push(filePath);

        // Get Public URL after successful upload / Yükleme başarılıysa URL'i al
        const {
          data: { publicUrl },
        } = supabase.storage.from("property-images").getPublicUrl(filePath);

        return publicUrl;
      });

      // Wait for all uploads to complete / Tüm yüklemelerin bitmesini bekle
      const uploadedUrls = await Promise.all(uploadPromises);

      // 3. CALL SERVER ACTION / Server Action'ı Çağır
      // We pass the data, uploaded links, and user ID
      // Verileri, yüklenen linkleri ve kullanıcı ID'sini gönderiyoruz

      const result = await addPropertyAction(cleanValues, uploadedUrls);

      if (!result.success) {
        throw new Error(result.error);
      }

      // Success: Redirect / Başarı: Yönlendir
      router.push("/admin/property?message=PropertyCreated");
    } catch (error: any) {
      console.error("Submit Error ", error);

      // CLEANUP LOGIC / TEMİZLİK MANTIĞI
      // If we have uploaded files but the process failed, delete them from storage
      // Eğer yüklenen dosyalar varsa ama işlem başarısız olduysa, onları depolamadan sil
      if (successfulUploads.length > 0) {
        const supabase = createClient();
        await supabase.storage
          .from("property-images")
          .remove(successfulUploads);

        console.log("Cleanup complete: Orphaned files removed");
      }
      toast.error(error.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full ${
              s <= step ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {step === 1 && <StepBasicInfo form={form} />}
          {step === 2 && <StepLocation form={form} />}
          {step === 3 && <StepFeatures form={form} />}
          {step === 4 && (
            <StepImages form={form} onImagesChange={setCapturedFiles} />
          )}

          <div className="flex justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1 || isSubmitting}
            >
              Previous
            </Button>
            <Button type="button" onClick={handleNext} disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {step === 4 ? "Complete and Publish" : "Next Step"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
