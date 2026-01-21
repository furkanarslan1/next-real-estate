"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutStory() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Görsel Alanı */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-100 md:h-150 w-full rounded-3xl overflow-hidden shadow-2xl z-10">
              <Image
                src="/real-estate-hero-2.jpg"
                alt="Our Journey"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-orange-100 rounded-3xl z-0 hidden md:block" />
          </motion.div>

          {/* TEXT AREA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              A Legacy of Trust and <br />
              <span className="text-orange-600 font-serif italic">
                Exceptional
              </span>{" "}
              Service
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Founded in 2014, Next Real Estate has grown from a local boutique
              agency to a premier real estate destination. Our philosophy is
              simple: we believe that every client deserves a tailored
              experience that goes beyond a mere transaction.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Whether you are looking for your first home or a high-yield
              investment, our team of experts provides the insight and integrity
              needed to navigate today’s dynamic market.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
