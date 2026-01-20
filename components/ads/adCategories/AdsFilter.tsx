"use client";

import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useTransition,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

type City = { id: number; name: string };
type District = { id: number; name: string; city_id: number };
type Neighborhood = { id: number; name: string; county_id: number };

export default function AdsFilter() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // --- States ---
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [district, setDistrict] = useState(searchParams.get("district") || "");
  const [neighborhood, setNeighborhood] = useState(
    searchParams.get("neighborhood") || "",
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // --- URL Değiştiğinde State'leri Güncelle (Geri/İleri butonu için) ---
  // --- Update States When URL Changes (For Back/Next Button) ---
  useEffect(() => {
    setCity(searchParams.get("city") || "");
    setDistrict(searchParams.get("district") || "");
    setNeighborhood(searchParams.get("neighborhood") || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
  }, [searchParams]);

  // --- Data Fetching ---

  useEffect(() => {
    const fetchCities = async () => {
      const { data } = await supabase
        .from("cities")
        .select("id,name")
        .order("name");
      if (data) setCities(data);
    };
    fetchCities();
  }, [supabase]);

  useEffect(() => {
    if (!city) {
      setDistricts([]);
      return;
    }

    let cancelled = false;

    const fetchDistricts = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from("districts")
        .select("id,name,city_id")
        .eq("city_id", Number(city))
        .order("name");
      if (!cancelled && data) {
        setDistricts(data);
      }
      setIsLoading(false);
    };
    fetchDistricts();
    return () => {
      cancelled = true;
    };
  }, [city, supabase]);

  useEffect(() => {
    if (!district) {
      setNeighborhoods([]);
      return;
    }

    let cancelled = false;

    const fetchNeighborhoods = async () => {
      const { data } = await supabase
        .from("neighborhoods")
        .select("id,name,county_id")
        .eq("county_id", Number(district))
        .order("name");

      if (!cancelled && data) {
        setNeighborhoods(data);
      }
    };

    fetchNeighborhoods();

    return () => {
      cancelled = true;
    };
  }, [district, supabase]);

  // --- Handlers ---
  const applyFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Sayfalamayı sıfırla (Filtre değişince 1. sayfaya dönmeli)
    // Reset pagination (Should return to page 1 when filter changes)
    params.delete("page");

    if (city) params.set("city", city);
    else params.delete("city");
    if (district) params.set("district", district);
    else params.delete("district");
    if (neighborhood) params.set("neighborhood", neighborhood);
    else params.delete("neighborhood");
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");
    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    const nextUrl = `/ads?${params.toString()}`;
    const currentUrl = `/ads?${searchParams.toString()}`;

    if (nextUrl !== currentUrl) {
      startTransition(() => {
        router.push(nextUrl);
      });
    }
  }, [city, district, neighborhood, minPrice, maxPrice, router, searchParams]);

  const resetFilters = () => {
    setCity("");
    setDistrict("");
    setNeighborhood("");
    setMinPrice("");
    setMaxPrice("");
    startTransition(() => {
      router.push("/ads");
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap items-end gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-500 ml-1">City</label>
        <select
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setDistrict("");
            setNeighborhood("");
          }}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none min-w-35"
        >
          <option value="">All</option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* İlçe Seçimi */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-500 ml-1">
          Discrict
        </label>
        <select
          value={district}
          onChange={(e) => {
            setDistrict(e.target.value);
            setNeighborhood("");
          }}
          disabled={!city || isLoading}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none min-w-35 disabled:bg-gray-50"
        >
          <option value="">All</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-500 ml-1">
          Neighborhood
        </label>
        <select
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          disabled={!district}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none min-w-35 disabled:bg-gray-50"
        >
          <option value="">All</option>
          {neighborhoods.map((n) => (
            <option key={n.id} value={n.id}>
              {n.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-500 ml-1">
          Price ($)
        </label>
        <div className="flex items-center gap-2">
          <input
            placeholder="Min"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-24 focus:ring-2 focus:ring-orange-500 outline-none"
          />
          <input
            placeholder="Max"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-24 focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>
      </div>

      <div className="flex gap-2 ml-auto">
        <Button
          variant="ghost"
          onClick={resetFilters}
          className="text-gray-500 text-sm"
        >
          Clean
        </Button>
        <Button
          onClick={applyFilter}
          disabled={isPending}
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 rounded-lg shadow-md transition-all active:scale-95"
        >
          {isPending ? "Filtering.." : "Filter"}
        </Button>
      </div>
    </div>
  );
}
