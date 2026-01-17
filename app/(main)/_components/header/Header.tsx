"use client";
import React from "react";

import Link from "next/link";
import { Facebook, Home, Instagram, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Lists", href: "/lists" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="flex justify-around items-center gap-4 h-16 w-full  bg-transparent text-white font-bold">
      {/* BRAND */}
      <section className="flex items-center gap-2 ">
        <div className="bg-orange-500 text-2xl  px-2 py-1 rounded-lg ">
          <Home />
        </div>
        <h1 className="font-semibold text-md">NextReal Estate</h1>
      </section>

      <section className="flex items-center gap-4">
        {navLinks.map((nav) => (
          <Link
            key={nav.href}
            href={nav.href}
            className={`border-b-2 border-transparent hover:border-white transition-all duration-300 ${
              pathname === nav.href ? "border-b-2 border-white" : ""
            }`}
          >
            {nav.name}
          </Link>
        ))}
      </section>
      <section>
        <div className="flex gap-4">
          <Link
            href="/facebook"
            className="cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <Facebook size={24} color="#1877F2" />
          </Link>
          <Link
            href="/instagram"
            className="cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <Instagram size={24} color="#E4405F" />
          </Link>
          <Link
            href="/twitter"
            className="cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <Twitter size={24} color="#000000" />{" "}
          </Link>
        </div>
      </section>
    </header>
  );
}
