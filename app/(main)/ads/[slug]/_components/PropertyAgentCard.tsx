import { Phone, MessageCircle, User, ShieldCheck } from "lucide-react";
import React from "react";

interface PropertyAgentCardProps {
  price: number;
}

export default function PropertyAgentCard({ price }: PropertyAgentCardProps) {
  const formattedPrice = new Intl.NumberFormat("us-US").format(price);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl shadow-slate-100/50 space-y-6">
      {/* PRICE SECTION  */}
      <div className="pb-6 border-b border-slate-100 text-center lg:text-left">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
          Price
        </p>
        <div className="flex items-baseline justify-center lg:justify-start gap-1">
          <span className="text-3xl font-black text-slate-900">
            {formattedPrice}
          </span>
          <span className="text-xl font-bold text-slate-600">$</span>
        </div>
      </div>

      {/* AGENT INFO */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
          <User size={28} />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-lg leading-tight">
            Next Real Estate
          </h4>
          <div className="flex items-center gap-1 text-green-600 text-xs font-semibold mt-1">
            <ShieldCheck size={14} />
            <span>Verified Professional</span>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="space-y-3">
        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-200 active:scale-[0.98]">
          <Phone size={20} />
          Show Phone Number
        </button>

        <button className="w-full bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
          <MessageCircle size={20} />
          WhatsApp Message
        </button>
      </div>

      {/* DISCLAIMER */}
      <p className="text-[10px] text-slate-400 text-center leading-relaxed italic">
        By contacting the agent, you agree to our Terms of Use and Privacy
        Policy.
      </p>
    </div>
  );
}
