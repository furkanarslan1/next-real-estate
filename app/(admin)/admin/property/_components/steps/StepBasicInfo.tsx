"use client";

import { UseFormReturn } from "react-hook-form";
import { propertySchema } from "@/schemas/propertySchema";
import z from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef } from "react";

const EMPTY_CATEGORY_DATA = {
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
} as const;

// Defining types from the schema
// Şemadan tipleri tanımlıyoruz
type PropertyFormInput = z.input<typeof propertySchema>;

interface StepBasicInfoProps {
  form: UseFormReturn<PropertyFormInput>;
}

export function StepBasicInfo({ form }: StepBasicInfoProps) {
  // Watch the category field / Kategori alanını izle
  const category = form.watch("category");

  // Create a flag to track the first render
  // İlk render'ı takip etmek için bir bayrak (flag) oluşturuyoruz
  const isFirstRender = useRef(true);

  useEffect(() => {
    // 1. If it's the first time the component loads, do nothing
    // 1. Bileşen ilk yüklendiğinde (mount) hiçbir şey yapma
    if (isFirstRender.current) {
      isFirstRender.current = false; // Mark it as no longer first render / Artık ilk render değil diye işaretle
      return;
    }

    // 2. Only reset if the category actually changes AFTER the initial load
    // 2. Sadece ilk yüklemeden SONRA kategori gerçekten değişirse sıfırla
    form.setValue("category_data", EMPTY_CATEGORY_DATA);

    // 2. Kırmızı hata mesajlarını temizle (UX iyileştirmesi)
    // Kullanıcı yeni kategoriye "temiz bir sayfa" ile başlasın
    // 2. Remove red error messages (UX improvement) // Allow users to start with a "clean slate" in the new category
    form.clearErrors("category_data");
  }, [category, form]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Title / Başlık */}
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Listing Title</FormLabel>
            <FormControl>
              <Input
                id="property-title-input"
                placeholder="e.g. Luxury Apartment in City Center"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category / Kategori */}
        {/* Category and Status / Kategori ve Durum */}

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              {/* defaultValue yerine value ekledik / Switched defaultValue to value */}
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="residential">
                    Residential (residential)
                  </SelectItem>
                  <SelectItem value="commercial">
                    Commercial (commercial)
                  </SelectItem>
                  <SelectItem value="land">Land (land)</SelectItem>
                  <SelectItem value="project">projectct (project)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status  */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sale">For Sale </SelectItem>
                  <SelectItem value="rent">For Rent </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="area_gross"
          render={({ field }) => (
            <FormItem>
              <FormLabel>m² (Gross)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter m2"
                  {...field}
                  value={(field.value as number | string) ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="area_net"
          render={({ field }) => (
            <FormItem>
              <FormLabel>m² (Net)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter m2"
                  {...field}
                  value={(field.value as number | string) ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Price / Fiyat */}
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter amount"
                {...field}
                // Explicitly cast unknown to string/number for the HTML input
                // HTML input için unknown değeri açıkça string veya number'a çeviriyoruz
                value={field.value as number | string}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Description / Açıklama */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Detailed Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Write all details about the property..."
                className="min-h-37.5 resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
