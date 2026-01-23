import Image from "next/image";
import React from "react";

export default function BannerFamily() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 p-4 overflow-hidden">
      <div className="relative h-100 w-full md:min-w-160 ">
        <Image
          src="/real-estate-hero.png"
          alt="banner-family-image"
          fill
          className="object-cover object-center rounded-lg"
        />
      </div>
      <div className="bg-slate-100 text-gray-500 p-4 rounded-md space-y-2">
        <h1 className="font-bold text-gray-600">
          The Easiest Way to Find the Right Home for Your Family
        </h1>
        <p className="text-sm ">
          Searching for a new home is more than just a move — it’s a journey
          toward creating a safer, more comfortable, and happier life for your
          family. Spacious living areas, secure environments for children,
          convenient locations, and easy access to daily amenities are among the
          most important factors when choosing the perfect home. That’s exactly
          where we step in to support you every step of the way. Our platform
          offers a wide range of real estate listings, from apartments for sale
          and rental homes to family houses, gated communities, and investment
          properties. With advanced filtering options, you can quickly find
          properties that match your budget, preferred location, and lifestyle
          needs. We aim to simplify the home search process by providing clear,
          up-to-date, and detailed information — making it easier for families
          to make confident decisions together. With our experience in the real
          estate market and a user-focused approach, we strive to be more than
          just a listing platform. Our goal is to guide you toward the right
          property, in the right location, at the right price. Start exploring
          today and discover the home where your family can build lasting
          memories and a brighter future.
        </p>
      </div>
    </div>
  );
}
