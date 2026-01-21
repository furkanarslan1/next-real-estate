"use client";

import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";

import HeroSwiper from "./HeroSwiper";
import ThumbnailStrip from "./ThumbnailStrip";
import GalleryModal from "./GalleryModal";

interface Props {
  images: string[];
}

export default function PropertyGallery({ images }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <section className="mb-8">
      <HeroSwiper
        images={images}
        onSwiperReady={(swiper) => (swiperRef.current = swiper)}
        onIndexChange={setActiveIndex}
        onOpenModal={() => setOpen(true)}
      />

      <ThumbnailStrip
        images={images}
        activeIndex={activeIndex}
        onSelect={(index) => {
          swiperRef.current?.slideTo(index);
          setActiveIndex(index);
        }}
      />

      {open && (
        <GalleryModal
          images={images}
          startIndex={activeIndex}
          onClose={() => setOpen(false)}
        />
      )}
    </section>
  );
}
