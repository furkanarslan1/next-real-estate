"use client";

import { useEffect, useMemo, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";

// Database Interfaces
interface City {
  id: number;
  name: string;
}

interface District {
  id: number;
  name: string;
  city_id: number;
}

interface Neighborhood {
  id: number;
  name: string;
  county_id: number; // This is the column name in DB
}

type PropertyFormInput = z.input<typeof propertySchema>;

interface StepLocationProps {
  form: UseFormReturn<PropertyFormInput>;
}

export function StepLocation({ form }: StepLocationProps) {
  const supabase = useMemo(() => createClient(), []);

  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);

  // 1. WATCH THE FORM FIELD DEFINED IN ZOD SCHEMA (district_id)
  const selectedCityId = form.watch("city_id");
  const selectedDistrictId = form.watch("district_id");

  // Fetch Cities
  useEffect(() => {
    const fetchCities = async () => {
      const { data, error } = await supabase
        .from("cities")
        .select("id, name")
        .order("name");

      if (!error && data) setCities(data as City[]);
    };
    fetchCities();
  }, [supabase]);

  // Fetch Districts
  useEffect(() => {
    if (!selectedCityId || Number(selectedCityId) === 0) {
      setDistricts([]);
      return;
    }

    const fetchDistricts = async () => {
      const { data, error } = await supabase
        .from("districts")
        .select("id, name, city_id")
        .eq("city_id", selectedCityId)
        .order("name");

      if (!error && data) {
        setDistricts(data as District[]);
        // Reset district and neighborhood in FORM

        const currentDistrictId = form.getValues("district_id");
        const isCurrentDistrictInNewData = data.some(
          (d) => d.id === currentDistrictId
        );

        if (!isCurrentDistrictInNewData && currentDistrictId) {
          form.setValue("district_id", 0);
          form.setValue("neighborhood_id", 0);
        }
      }
    };
    fetchDistricts();
  }, [selectedCityId, form, supabase]);

  // Fetch Neighborhoods
  useEffect(() => {
    if (!selectedDistrictId || Number(selectedDistrictId) === 0) {
      setNeighborhoods([]);
      return;
    }

    const fetchNeighborhoods = async () => {
      const { data, error } = await supabase
        .from("neighborhoods")
        .select("id, name, county_id")
        .eq("county_id", selectedDistrictId) // Use the DB column name here
        .order("name");

      if (!error && data) {
        setNeighborhoods(data as Neighborhood[]);
        const currentNeighborhoodId = form.getValues("neighborhood_id");
        const isCurrentNeighborhoodInNewData = data.some(
          (n) => n.id === currentNeighborhoodId
        );

        if (!isCurrentNeighborhoodInNewData && currentNeighborhoodId !== 0) {
          form.setValue("neighborhood_id", 0);
        }
      }
    };
    fetchNeighborhoods();
  }, [selectedDistrictId, form, supabase]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* City Select */}
        <FormField
          control={form.control}
          name="city_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={field.value === 0 ? undefined : field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id.toString()}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* District Select */}
        <FormField
          control={form.control}
          name="district_id" // Use Zod field name
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={field.value === 0 ? undefined : field.value?.toString()}
                disabled={!selectedCityId || selectedCityId === 0}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {districts.map((d) => (
                    <SelectItem key={d.id} value={d.id.toString()}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Neighborhood Select */}
        <FormField
          control={form.control}
          name="neighborhood_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Neighborhood</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={field.value === 0 ? undefined : field.value?.toString()}
                disabled={!selectedDistrictId || selectedDistrictId === 0}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Neighborhood" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {neighborhoods.map((n) => (
                    <SelectItem key={n.id} value={n.id.toString()}>
                      {n.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
