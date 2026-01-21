"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";

interface Props {
  images: string[];
  onSwiperReady: (swiper: SwiperType) => void;
  onIndexChange: (index: number) => void;
  onOpenModal: () => void;
}

export default function HeroSwiper({
  images,
  onSwiperReady,
  onIndexChange,
  onOpenModal,
}: Props) {
  return (
    <div className="relative w-full h-[55vh] rounded-2xl overflow-hidden">
      <Swiper
        modules={[Navigation]}
        navigation
        onSwiper={onSwiperReady}
        onSlideChange={(swiper) => onIndexChange(swiper.activeIndex)}
        className="w-full h-full"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div
              className="relative w-full h-full cursor-pointer"
              onClick={onOpenModal}
            >
              <Image
                src={img}
                alt={`İlan Fotoğrafı ${i + 1}`}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
