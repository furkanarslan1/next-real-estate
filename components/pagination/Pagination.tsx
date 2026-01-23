"use client";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  if (totalPages <= 1) return null;
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;
  const safePage = (page: number) => Math.min(Math.max(page, 1), totalPages);

  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  const pages = React.useMemo(() => getPages(), [currentPage, totalPages]);

  const createPageLink = (page: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `?${params.toString()}`;
  };
  return (
    <div className="flex justify-center gap-2 mt-16">
      {/* PREV */}
      <Link
        href={createPageLink(safePage(currentPage - 1))}
        scroll={true}
        aria-disabled={!hasPrev}
        className={clsx(
          "w-10 h-10 flex items-center justify-center rounded-xl border transition",
          hasPrev
            ? "hover:bg-orange-50 hover:border-orange-200 text-orange-600"
            : "pointer-events-none opacity-40",
        )}
      >
        <ChevronLeft className="w-4 h-4" />
      </Link>
      {/* PAGE NUMBERS */}

      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span key={`dots-${index}`} className="px-2 text-muted-foreground">
              ...
            </span>
          );
        }

        return (
          <Link
            key={`${page}-${index}`}
            href={createPageLink(page)}
            scroll={true}
            className={clsx(
              "w-10 h-10 flex items-center justify-center rounded-xl border text-sm transition font-medium",
              page === currentPage
                ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-200"
                : "hover:bg-orange-50 hover:border-orange-200 text-muted-foreground hover:text-orange-600",
            )}
          >
            {page}
          </Link>
        );
      })}

      {/* NEXT */}
      <Link
        href={createPageLink(safePage(currentPage + 1))}
        scroll={true}
        aria-disabled={!hasNext}
        className={clsx(
          "w-10 h-10 flex items-center justify-center rounded-xl border transition",
          hasNext
            ? "hover:bg-orange-50 hover:border-orange-200 text-orange-600"
            : "pointer-events-none opacity-40",
        )}
      >
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
