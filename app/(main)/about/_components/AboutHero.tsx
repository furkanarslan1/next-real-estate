"use client";
import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Arka Plan Görseli / Overlay */}
      <div className="absolute inset-0 opacity-40">
        <img
          src="/real-estate-hero-2.jpg"
          alt="Luxury Architecture"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl px-4">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm mb-4 block"
        >
          Since 2014
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-7xl font-black text-white leading-tight"
        >
          Redefining the <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">
            Real Estate Experience
          </span>
        </motion.h1>
      </div>
    </section>
  );
}
