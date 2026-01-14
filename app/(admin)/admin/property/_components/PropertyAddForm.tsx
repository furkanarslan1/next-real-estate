"use client";
import { Button } from "@/components/ui/button";
import { propertySchema, PropertyValues } from "@/schemas/propertySchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { StepBasicInfo } from "./steps/StepBasicInfo";
import { Form } from "@/components/ui/form";
import { StepLocation } from "./steps/StepLocation";
import { StepFeatures } from "./steps/StepFeatures";

export default function PropertyAddForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL'den hangisinin kalıcılığını oku
  // Read the persistence of which URL
  const step = Number(searchParams.get("step") ?? 1);

  type PropertyFormInput = z.input<typeof propertySchema>;

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
      // Provide explicit empty strings for optional fields to avoid hydration mismatch
      // Hydration hatasını önlemek için opsiyonel alanlara açıkça boş string veriyoruz
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

  // Adım değiştirme fonksiyonu (URL'i günceller)
  // Step change function (updates URL)
  const setStep = (newStep: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", newStep.toString());
    router.push(`?${params.toString()}`);
  };

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];

    if (step === 1) {
      fieldsToValidate = [
        "title",
        "description",
        "category",
        "status",
        "price",
      ];
    } else if (step === 2) {
      fieldsToValidate = ["city_id", "district_id", "neighborhood_id"];
    } else if (step === 3) {
      // Dynamic fields under category_data
      fieldsToValidate = ["category_data"];
    }

    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) setStep(step + 1);
  };

  const onSubmit: SubmitHandler<PropertyFormInput> = async (values) => {
    console.log(values);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-6">
      {/* İlerleme Çubuğu (Progress Bar) Buraya Gelecek */}
      {/* Progress Bar Goes Here */}
      <div className="p-4 bg-slate-100 rounded-lg">Step {step} of 4</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* ADIMLAR BURAYA GELECEK */}
          {step === 1 && <StepBasicInfo form={form} />}
          {step === 2 && <StepLocation form={form} />}
          {step === 3 && <StepFeatures form={form} />}
          {step === 4 && (
            <div className="p-10 border border-dashed text-center">
              Step 4: Images (Soon)
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              Previous
            </Button>

            {step < 4 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="cursor-pointer"
              >
                Next
              </Button>
            ) : (
              <Button type="submit">Finish</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
