"use client";
import { CATEGORY_DETAILS } from "@/lib/constants/filterConfig";
import { FilterFieldType } from "@/types/filterFieldType";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface DetailedFiltersProps {
  category: string;
  extraParams: Record<string, string>;
  setExtraParams: (params: Record<string, string>) => void;
}

export default function DetailedFilters({
  category,
  extraParams,
  setExtraParams,
}: DetailedFiltersProps) {
  // Config içerisinden ilgili kategorinin alanlarını bir alıyoruz
  // We retrieve the fields of the relevant category from the config file.
  const fields: FilterFieldType[] = CATEGORY_DETAILS[category] || [];

  if (fields.length === 0) {
    return (
      <div className="py-8 text-center border-2 border-dashed border-slate-100 rounded-2xl">
        <p className="text-sm text-slate-400">
          Please select a category to see more details.
        </p>
      </div>
    );
  }

  const handleFieldChange = (key: string, value: string) => {
    setExtraParams({
      ...extraParams,
      [key]: value,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 px-6">
      {fields.map((field) => (
        <div key={field.key} className="space-y-2">
          <Label className="text-sm font-bold text-slate-700">
            {field.label}
          </Label>

          {field.type === "select" ? (
            <select
              value={extraParams[field.key] || ""}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all appearance-none bg-white"
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <Input
              type={field.type}
              value={extraParams[field.key] || ""}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              className="rounded-xl border-slate-200 h-12 focus-visible:ring-orange-500"
            />
          )}
        </div>
      ))}
    </div>
  );
}
