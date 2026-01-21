"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { useState } from "react";

import "swiper/css";
import "swiper/css/navigation";

interface Props {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

export default function GalleryModal({ images, startIndex, onClose }: Props) {
  const [activeIndex, setActiveIndex] = useState(startIndex);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="w-screen h-screen max-w-none bg-black p-0">
        <DialogTitle className="sr-only">İlan Fotoğrafları</DialogTitle>

        {/* CLOSE*/}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-50 text-white"
        >
          <X size={32} />
        </button>

        {/* 🔢 COUNT */}
        <div className="absolute top-5 left-5 z-50 text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur">
          {activeIndex + 1} / {images.length}
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          initialSlide={startIndex}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-full h-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-screen">
                <Image
                  src={img}
                  alt={`Fotoğraf ${i + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </DialogContent>
    </Dialog>
  );
}
