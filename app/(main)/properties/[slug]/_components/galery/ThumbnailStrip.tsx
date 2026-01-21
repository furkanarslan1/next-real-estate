"use client";

import Image from "next/image";
import clsx from "clsx";

interface ThumbnailStripProps {
  images: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const MAX_THUMBNAILS = 5;

export default function ThumbnailStrip({
  images,
  activeIndex,
  onSelect,
}: ThumbnailStripProps) {
  const visibleImages = images.slice(0, MAX_THUMBNAILS);
  const extraCount = images.length - MAX_THUMBNAILS;

  return (
    <div className="mt-4 flex gap-3">
      {visibleImages.map((img, index) => {
        const isLast = index === MAX_THUMBNAILS - 1;
        const showOverlay = isLast && extraCount > 0;

        return (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={clsx(
              "relative w-24 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition",
              activeIndex === index
                ? "border-orange-500"
                : "border-transparent hover:border-slate-300",
            )}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              fill
              sizes="96px"
              className="object-cover"
            />

            {/* +X overlay */}
            {showOverlay && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  +{extraCount}
                </span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
