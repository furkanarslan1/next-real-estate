import Image from "next/image";
import Hero from "./_components/hero/Hero";
import AdsList from "@/components/ads/adCategories/AdsList";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category || "all";
  return (
    <div>
      <Hero />
      <AdsList category={category} key={category} params="home" />
    </div>
  );
}
