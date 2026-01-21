"use client";
import React from "react";

import Link from "next/link";
import { Home, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Properties", href: "/properties" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="flex justify-around items-center gap-4 h-16 w-full  bg-transparent text-white font-bold">
      {/* BRAND */}
      <Link href="/" className="flex items-center gap-2 ">
        <div className="bg-orange-500 text-2xl  px-2 py-1 rounded-lg ">
          <Home />
        </div>
        <h1 className="font-semibold text-md">Next Real Estate</h1>
      </Link>

      <section className="hidden md:flex items-center gap-4 ">
        {navLinks.map((nav) => (
          <Link
            key={nav.href}
            href={nav.href}
            className="relative font-light text-white group"
          >
            {nav.name}

            {/* Animasyonlu Alt Çizgi */}
            <span
              className={`absolute left-0 -bottom-1 h-0.5bg-white transition-all duration-300 ease-out 
    ${pathname === nav.href ? "w-full" : "w-0 group-hover:w-full group-hover:left-0"} 
    origin-center`}
            ></span>
          </Link>
        ))}
      </section>
      <section className="hidden md:block">
        <div className="flex gap-4">
          {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
            <Link
              key={i}
              href="#"
              className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all"
            >
              <Icon size={18} />
            </Link>
          ))}
        </div>
      </section>
    </header>
  );
}
