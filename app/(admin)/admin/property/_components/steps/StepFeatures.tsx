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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROPERTY_FEATURES } from "@/lib/constants/property-features";
import { FeatureField } from "../FeatureField";

type PropertyFormInput = z.input<typeof propertySchema>;

interface StepFeaturesProps {
  form: UseFormReturn<PropertyFormInput>;
}

export function StepFeatures({ form }: StepFeaturesProps) {
  const category = form.watch("category");
  const currentFeatures = PROPERTY_FEATURES[category] || [];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-lg font-medium border-b pb-2 capitalize">
        {category.replace("_", " ")} Details
      </h3>

      {/* --- RESIDENTIAL (KONUT) FIELDS ---
      {(category === "konut" || category === "is_yeri") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category_data.room_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Count (Oda Sayısı)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rooms" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1+0">1+0</SelectItem>
                    <SelectItem value="1+1">1+1</SelectItem>
                    <SelectItem value="2+1">2+1</SelectItem>
                    <SelectItem value="3+1">3+1</SelectItem>
                    <SelectItem value="4+1">4+1</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category_data.building_age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Building Age</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 5-10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category_data.heating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heating System</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select heating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="natural_gas">
                      Natural Gas (Doğalgaz)
                    </SelectItem>
                    <SelectItem value="underfloor">
                      Underfloor (Yerden Isıtma)
                    </SelectItem>
                    <SelectItem value="central">Central (Merkezi)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-end pb-3">
            <FormField
              control={form.control}
              name="category_data.in_site"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm w-full">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Inside a Housing Estate (Site İçerisinde)
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
      )}

      {/* --- LAND (ARSA) FIELDS --- */}
      {/* {category === "arsa" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category_data.ada"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ada</FormLabel>
                <FormControl>
                  <Input placeholder="Block number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category_data.parsel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parsel</FormLabel>
                <FormControl>
                  <Input placeholder="Plot number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category_data.zoning_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zoning Status (İmar Durumu)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Residential, Commercial"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}  */}

      <div key={category} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentFeatures.map((feature) => (
          <FormField
            key={feature.id}
            control={form.control}
            // category_data altındaki ilgili ID'ye bağla
            // Connect to the relevant ID under category data
            name={`category_data.${feature.id}` as any}
            render={({ field }) => (
              <FeatureField feature={feature} field={field} />
            )}
          />
        ))}
      </div>

      {/* Eğer seçilen kategoride hiç özellik tanımlanmamışsa kullanıcıya bilgi ver */}
      {/* Inform the user if no properties are defined in the selected category */}
      {currentFeatures.length === 0 && (
        <p className="text-muted-foreground text-sm italic">
          No additional features available for this category.
        </p>
      )}
    </div>
  );
}
