"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Zap, Users } from "lucide-react";

const values = [
  {
    title: "Unwavering Trust",
    description:
      "Transparency is our foundation. We build long-term relationships through honesty in every transaction.",
    icon: ShieldCheck,
  },
  {
    title: "Strategic Innovation",
    description:
      "We use the latest technology and data analytics to give our clients a competitive edge in the market.",
    icon: Zap,
  },
  {
    title: "Client-Centricity",
    description:
      "Your goals are our priority. We tailor our services to match your unique real estate aspirations.",
    icon: Target,
  },
  {
    title: "Community Impact",
    description:
      "We don't just sell houses; we help build vibrant neighborhoods and sustainable communities.",
    icon: Users,
  },
];

export default function AboutValues() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-slate-900 mb-4"
          >
            The Values That <span className="text-orange-600">Drive Us</span>
          </motion.h2>
          <p className="text-slate-500">
            Our core principles are the compass that guides every decision we
            make and every home we find.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
