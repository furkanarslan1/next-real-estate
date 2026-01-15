"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

export default function ToastHandler() {
  const seacrhParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const message = seacrhParams.get("message");

    if (message === "PropertyCreated") {
      // Show success toast / Başarı toast'unu göster
      toast.success("Property has been successfully published!");

      // Clear the URL to prevent showing toast again on page refresh
      // Sayfa yenilendiğinde toast'un tekrar çıkmasını engellemek için URL'i temizle

      const params = new URLSearchParams(seacrhParams.toString());
      params.delete("message");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [seacrhParams, pathname, router]);
  return null; // This component doesn't render anything / Bu bileşen bir şey render etmez
}
