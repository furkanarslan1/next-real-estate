"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Menu,
  Search,
  Info,
  Phone,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Phone },
  { name: "Properties", href: "/properties", icon: Search },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex justify-around items-center gap-4 h-16 w-full bg-transparent text-white font-bold border-b border-slate-300/70 md:border-0">
      {/* BRAND */}
      <Link href="/" className="flex items-center gap-2">
        <div className="bg-orange-500 text-2xl px-2 py-1 rounded-lg">
          <Home />
        </div>
        <h1 className="font-semibold text-md">Next Real Estate</h1>
      </Link>

      {/* DESKTOP NAV */}
      <nav className="hidden md:flex items-center gap-4">
        {navLinks.map((nav) => (
          <Link
            key={nav.href}
            href={nav.href}
            className="relative font-light text-white group"
          >
            {nav.name}
            <span
              className={`absolute left-0 -bottom-1 h-0.5 bg-white transition-all duration-300 ease-out 
              ${pathname === nav.href ? "w-full" : "w-0 group-hover:w-full group-hover:left-0"}`}
            ></span>
          </Link>
        ))}
      </nav>

      {/* DESKTOP SOCIALS */}
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

      {/* MOBILE NAV (SHEET) */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 text-white hover:text-orange-500 transition-colors">
              <Menu size={28} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-linear-to-bl from-slate-950 to-slate-700 border-slate-800 text-white w-75"
          >
            <SheetHeader className="text-left border-b border-slate-800 pb-6">
              <SheetTitle className="text-white flex items-center gap-2">
                <div className="bg-orange-500 p-1.5 rounded-lg">
                  <Home size={18} />
                </div>
                Next Estate
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-2 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-4 p-4 rounded-2xl text-lg font-medium transition-all ${
                    pathname === link.href
                      ? "bg-orange-600 text-white"
                      : "hover:bg-slate-800 text-slate-300"
                  }`}
                >
                  <link.icon size={20} />
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-slate-800 p-4">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-4">
                Follow Us
              </p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="text-slate-400 hover:text-orange-500 transition-colors"
                  >
                    <Icon size={20} />
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
