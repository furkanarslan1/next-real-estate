"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PropertySearchFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 400);

  const handleCategoryChange = (val: string) => {
    const params = new URLSearchParams(searchParams);
    if (val !== "all") {
      params.set("category", val);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 border-b bg-slate-50/50">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title..."
          defaultValue={searchParams.get("query")?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-9 bg-white"
        />
      </div>
      <div className="flex gap-2">
        <Select
          value={searchParams.get("category")?.toString() || "all"}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-45 bg-white text-sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="residential">Residential</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="land">Land</SelectItem>
            <SelectItem value="project">projectct</SelectItem>
          </SelectContent>
        </Select>

        {(searchParams.get("query") || searchParams.get("category")) && (
          <Button variant="ghost" onClick={() => replace(pathname)}>
            Reset <FilterX className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
