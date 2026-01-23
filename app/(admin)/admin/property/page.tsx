import { createClient } from "@/lib/supabase/server";
import PropertyTable from "./_components/PropertyTable";
import { PropertySearchFilters } from "./_components/PropertySearchFilters";
import ToastHandler from "./_components/ToastHandler";
import { Suspense } from "react";

export default async function PropertyListPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string }>;
}) {
  const { query, category } = await searchParams;
  const supabase = await createClient();

  let dbQuery = supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (query) {
    dbQuery = dbQuery.ilike("title", `%${query}%`);
  }

  if (category) {
    dbQuery = dbQuery.eq("category", category);
  }

  const { data: properties, error } = await dbQuery;

  if (error) return <div>Error loading properties.</div>;

  return (
    <div className="space-y-6 p-6">
      {/* This handler will check URL for "message=PropertyCreated" 
        Bu işleyici URL'de "message=PropertyCreated" var mı kontrol eder
      */}
      <Suspense fallback={null}>
        <ToastHandler />
      </Suspense>
      <h1 className="text-3xl font-bold">Properties Management</h1>
      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Suspense
          fallback={<div className="p-4 bg-slate-50">Loading filters...</div>}
        >
          <PropertySearchFilters />
        </Suspense>
        <PropertyTable data={properties || []} />
      </div>
    </div>
  );
}
