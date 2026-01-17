import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <div className="relative h-150 lg:h-200">
      <Image
        src="/real-estate-hero-2.jpg"
        alt="real-estate-home-hero"
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/40 "></div>
      <div className="absolute h-full w-full flex items-center justify-start px-6">
        <div className="flex flex-col gap-4 ">
          <h1 className="text-white text-4xl lg:text-6xl font-bold mb-4">
            Find Your Way Home.
          </h1>
          <p className="text-gray-200 text-lg lg:text-xl max-w-2xl">
            Discover the finest properties in the city with our expert guidance.
          </p>
        </div>
      </div>
    </div>
  );
}
