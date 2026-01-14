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

type PropertyFormInput = z.input<typeof propertySchema>;

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
      city_id: 0,
      district_id: 0,
      neighborhood_id: 0,
      category_data: {
        room_count: "",
        building_age: "",
        floor_number: "",
        heating: "",
        bathrooms: "",
        balconies: "",
        in_site: false,
        zoning_status: "",
        ada: "",
        parsel: "",
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
      const values = form.getValues();
      await onSubmit(values);
    }
  };

  const onSubmit = async (values: PropertyFormInput) => {
    try {
      setIsSubmitting(true);
      const supabase = createClient();

      // 1. Kullanıcı Kontrolü (İşlem başında yapalım ki boşuna resim yüklemesin)
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user)
        throw new Error("Oturum bulunamadı, lütfen tekrar giriş yapın.");

      // 2. Resimleri Storage'a Yükle
      const uploadedUrls: string[] = [];

      // Eğer hiç resim seçilmemişse uyarı ver (Tabloda zorunlu değilse geçebilirsin)
      if (capturedFiles.length === 0) {
        throw new Error("Lütfen en az bir resim yükleyin.");
      }

      for (const imgObj of capturedFiles) {
        const fileExt = imgObj.file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(filePath, imgObj.file);

        if (uploadError) {
          console.error("Storage Error:", uploadError);
          throw new Error("Resim yüklenirken hata oluştu.");
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("property-images").getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      // 3. Veritabanı Kaydı (Explicit Mapping - Her alanı elle eşleştiriyoruz)
      // Bu yöntem RLS hatalarını önlemek için en güvenli yoldur.
      const { error: dbError } = await supabase.from("properties").insert({
        title: values.title,
        description: values.description,
        price: Number(values.price),
        category: values.category,
        status: values.status,
        city_id: Number(values.city_id),
        district_id: Number(values.district_id),
        neighborhood_id: Number(values.neighborhood_id),
        category_data: values.category_data,
        images: uploadedUrls, // Formdaki değil, storage'dan gelen linkler
        user_id: user.id,
      });

      if (dbError) {
        console.error("Database Error Details:", dbError);
        throw dbError;
      }

      toast.success("Property added successfully!");

      // Formu temizle ve ilk adıma dön
      form.reset();
      setCapturedFiles([]);
      router.push("/admin/property");
      router.refresh();
    } catch (error: any) {
      console.error("Submit Error:", error);
      toast.error(error.message || "Bir hata oluştu.");
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
