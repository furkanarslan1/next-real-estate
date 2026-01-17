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
