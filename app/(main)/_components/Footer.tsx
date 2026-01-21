import React from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { STATIC_CATEGORIES } from "@/lib/constants/categories";

const footerLinks = {
  quickLinks: [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  categories: [
    { name: "Apartments", href: "/propertiesperties?category=apartment" },
    { name: "Villas", href: "/propertiesperties?category=villa" },
    { name: "Commercial", href: "/propertiesperties?category=commercial" },
    { name: "Land", href: "/propertiesperties?category=land" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* BRAND SECTION */}
          <div className="space-y-6">
            <Link
              href="/"
              className="text-2xl font-black text-white tracking-tighter"
            >
              NEXT<span className="text-orange-600">ESTATE</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Redefining the real estate experience with trust, innovation, and
              exceptional service since 2014. Find your dream home with us.
            </p>
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
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-orange-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CATEGORIES */}
          <div>
            <h4 className="text-white font-bold mb-6">Categories</h4>
            <ul className="space-y-4">
              {STATIC_CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/properties?category=${category.slug}`}
                    className="text-sm hover:text-orange-500 transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER SECTION */}
          <div className="space-y-6">
            <h4 className="text-white font-bold">Stay Updated</h4>
            <p className="text-sm text-slate-400">
              Subscribe to get the latest property listings and market news.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-slate-800 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-orange-600 outline-none transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-orange-600 text-white px-4 rounded-xl hover:bg-orange-700 transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:row-reverse md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 Next Estate Real Estate. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
