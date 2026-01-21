import {
  DoorOpen,
  Calendar,
  Layers,
  Thermometer,
  Bath,
  Home,
  Maximize,
  Map,
  Landmark,
} from "lucide-react";
import { Property } from "@/types/propertiesType";

interface PropertyFeaturesProps {
  categoryData: Property["category_data"];
  areaGross: number;
}

// JSON anahtarlarını İkonlar ve İsimlerle eşleştirelim
// Let's match JSON keys with Icons and Names
const featureMap: Record<string, { label: string; icon: any }> = {
  room_count: { label: "Rooms", icon: DoorOpen },
  building_age: { label: "Building Age", icon: Calendar },
  floor_number: { label: "Floor", icon: Layers },
  heating: { label: "Heating", icon: Thermometer },
  bathrooms: { label: "Bathrooms", icon: Bath },
  in_site: { label: "In Complex", icon: Home },
  zoning_status: { label: "Zoning", icon: Map },
  ada: { label: "Block (Ada)", icon: Landmark },
  parsel: { label: "Plot (Parsel)", icon: Landmark },
};

export default function PropertyFeatures({
  categoryData,
  areaGross,
}: PropertyFeaturesProps) {
  return (
    <div className="bg-slate-50 rounded-3xl p-6 md:p-8">
      <h3 className="text-xl font-bold text-slate-900 mb-6">
        Technical Specifications
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {/* Metrekare her zaman görünmeli (JSON dışında olduğu için manuel ekliyoruz) */}
        {/* Square meters should always be visible (we add it manually because it's not JSON) */}
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-orange-500">
            <Maximize size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Area (Gross)
            </p>
            <p className="text-slate-800 font-bold">{areaGross} m²</p>
          </div>
        </div>

        {/* JSONB içindeki dinamik veriler */}
        {/* Dynamic data within JSONB */}
        {Object.entries(categoryData).map(([key, value]) => {
          const config = featureMap[key];
          if (!config || value === undefined || value === null) return null;

          const Icon = config.icon;

          return (
            <div key={key} className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-orange-500">
                <Icon size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {config.label}
                </p>
                <p className="text-slate-800 font-bold">
                  {typeof value === "boolean"
                    ? value
                      ? "Yes"
                      : "No"
                    : String(value)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
