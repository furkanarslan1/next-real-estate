"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

type City = { id: number; name: string };
type District = { id: number; name: string; city_id: number };
type Neighborhood = { id: number; name: string; county_id: number };

export default function AdsFilter() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  // selected values (URL’den başlatılır)
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [district, setDistrict] = useState(searchParams.get("district") || "");
  const [neighborhood, setNeighborhood] = useState(
    searchParams.get("neighborhood") || ""
  );

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  // data lists
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);

  // Load cities once
  useEffect(() => {
    supabase
      .from("cities")
      .select("id,name")
      .then(({ data }) => {
        if (data) setCities(data);
      });
  }, []);

  // Load districts when city changes
  useEffect(() => {
    if (!city) return;
    supabase
      .from("districts")
      .select("id,name,city_id")
      .eq("city_id", city)
      .then(({ data }) => {
        if (data) setDistricts(data);
      });
  }, [city]);

  // Load neighborhoods when district changes
  useEffect(() => {
    if (!district) return;
    supabase
      .from("neighborhoods")
      .select("id,name,county_id")
      .eq("county_id", district)
      .then(({ data }) => {
        if (data) setNeighborhoods(data);
      });
  }, [district]);

  function applyFilter() {
    const params = new URLSearchParams();

    if (city) params.set("city", city);
    if (district) params.set("district", district);
    if (neighborhood) params.set("neighborhood", neighborhood);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    router.push(`/ads?${params.toString()}`);
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap gap-3">
      {/* City */}
      <select
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          setDistrict("");
          setNeighborhood("");
        }}
        className="border rounded px-3 py-2"
      >
        <option value="">Şehir</option>
        {cities.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* District */}
      <select
        value={district}
        onChange={(e) => {
          setDistrict(e.target.value);
          setNeighborhood("");
        }}
        className="border rounded px-3 py-2"
        disabled={!city}
      >
        <option value="">İlçe</option>
        {districts.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      {/* Neighborhood */}
      <select
        value={neighborhood}
        onChange={(e) => setNeighborhood(e.target.value)}
        className="border rounded px-3 py-2"
        disabled={!district}
      >
        <option value="">Mahalle</option>
        {neighborhoods.map((n) => (
          <option key={n.id} value={n.id}>
            {n.name}
          </option>
        ))}
      </select>

      {/* Price */}
      <input
        placeholder="Min ₺"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="border rounded px-3 py-2 w-28"
      />

      <input
        placeholder="Max ₺"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="border rounded px-3 py-2 w-28"
      />

      <Button onClick={applyFilter}>Filtrele</Button>
    </div>
  );
}
