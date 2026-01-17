"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  ExternalLink,
  ImageOff,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteProperty } from "@/app/(actions)/property/deleteProperty";
import Link from "next/link";

export interface Property {
  id: string;
  created_at: string;
  title: string;
  price: number;
  category: "konut" | "arsa" | "is_yeri" | "proje";
  status: "satilik" | "kiralik";
  images: string[] | null;
}

interface PropertyTableProps {
  data: Property[];
}

export default function PropertyTable({ data }: PropertyTableProps) {
  /**
   * Handles the deletion process of a property including user confirmation and server action call.
   * Bir mülkün silinme sürecini, kullanıcı onayını ve server action çağrısını yönetir.
   */
  const handleDelete = async (id: string, images: string[] | null) => {
    // 1. Ask for user confirmation (UX Safety)
    // 1. Kullanıcıdan onay iste (UX Güvenliği)
    const isConfirmed = confirm(
      "Are you sure? This will delete the property and all its images permanently."
    );

    if (!isConfirmed) return;

    // 2. Start loading state with a toast notification
    // 2. Toast bildirimi ile yükleme durumunu başlat
    const loadingToast = toast.loading("Processing your request...");

    try {
      // 3. Trigger the Server Action to delete from DB and Storage
      // 3. Veritabanından ve Storage'dan silmek için Server Action'ı tetikle
      const result = await deleteProperty(id, images);

      // 4. Close the loading toast
      // 4. Yükleme toast'unu kapat
      toast.dismiss(loadingToast);

      if (result.success) {
        // 5. Success feedback - Table will auto-refresh due to revalidatePath
        // 5. Başarı geri bildirimi - revalidatePath sayesinde tablo otomatik yenilenir
        toast.success("Property deleted successfully");
      } else {
        // 6. Error feedback if server action fails
        // 6. Server action başarısız olursa hata geri bildirimi
        toast.error(`Error: ${result.error}`);
      }
    } catch (err) {
      // 7. Generic catch block for unexpected client-side errors
      // 7. Beklenmedik istemci tarafı hataları için genel yakalama bloğu
      toast.dismiss(loadingToast);
      console.error("Client-side delete error:", err);
      toast.error("An unexpected error occurred during deletion.");
    }
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-20">Image</TableHead>
          <TableHead>Property Title</TableHead>
          <TableHead className="hidden md:table-cell">Category</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell">Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="h-32 text-center text-muted-foreground"
            >
              No properties found matching your criteria.
            </TableCell>
          </TableRow>
        ) : (
          data.map((item) => (
            <TableRow key={item.id} className="hover:bg-slate-50/50">
              <TableCell>
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="h-12 w-12 rounded-lg object-cover border shadow-sm"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center border text-slate-400">
                    <ImageOff size={20} />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium ">
                <div className="flex flex-col">
                  <span className="truncate max-w-50 text-xs">
                    {item.title.length > 10
                      ? item.title.slice(0, 10) + "..."
                      : item.title}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono italic">
                    #{item.id.split("-")[0]}
                  </span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline" className="capitalize font-normal">
                  {item.category === "is_yeri"
                    ? "Commercial"
                    : item.category === "konut"
                    ? "Residential"
                    : item.category}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge
                  className={
                    item.status === "satilik"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-sky-50 text-sky-700 border-sky-200"
                  }
                  variant="outline"
                >
                  {item.status === "satilik" ? "FOR SALE" : "FOR RENT"}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold hidden md:table-cell">
                {new Intl.NumberFormat("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                  maximumFractionDigits: 0,
                }).format(item.price)}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <ExternalLink className="mr-2 h-4 w-4" /> Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/admin/property/edit/${item.id}`}
                        className="flex w-full items-center cursor-pointer"
                      >
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer"
                      onSelect={(e) => {
                        // 1. Prevent dropdown from closing immediately if needed
                        // 1. Gerekirse dropdown'ın hemen kapanmasını engelle
                        // e.preventDefault();

                        // 2. Trigger the delete handler with property ID and image list
                        // 2. Mülk ID'si ve resim listesiyle silme işleyicisini tetikle
                        handleDelete(item.id, item.images);
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
