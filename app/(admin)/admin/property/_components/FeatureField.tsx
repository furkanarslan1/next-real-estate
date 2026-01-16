"use client";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps } from "react-hook-form";
import { FeatureConfig } from "@/lib/constants/property-features";

interface FeatureFieldProps {
  feature: FeatureConfig;
  field: ControllerRenderProps<any, any>;
}

export function FeatureField({ feature, field }: FeatureFieldProps) {
  if (feature.type === "switch") {
    return (
      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm bg-card">
        <div className="space-y-0.5">
          <FormLabel className="text-base cursor-pointer">
            {feature.label}
          </FormLabel>
        </div>
        <FormControl>
          <Switch checked={!!field.value} onCheckedChange={field.onChange} />
        </FormControl>
      </FormItem>
    );
  }

  return (
    <FormItem>
      <FormLabel>{feature.label}</FormLabel>
      <FormControl>
        {(() => {
          switch (feature.type) {
            case "select":
              return (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${feature.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {feature.options?.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            case "number":
            case "input":
              return (
                <Input
                  type={feature.type === "number" ? "number" : "text"}
                  placeholder={`Enter ${feature.label.toLowerCase()}`}
                  {...field}
                  value={field.value ?? ""}
                />
              );
            default:
              return null;
          }
        })()}
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
