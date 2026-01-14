import { createClient } from "@/lib/supabase/server";
import PropertyTable from "./_components/PropertyTable";
import { PropertySearchFilters } from "./_components/PropertySearchFilters";

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
      <h1 className="text-3xl font-bold">Properties Management</h1>
      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <PropertySearchFilters />
        <PropertyTable data={properties || []} />
      </div>
    </div>
  );
}
