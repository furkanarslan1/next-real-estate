// @/constants/propertyFeatures.ts

export type FeatureType = "input" | "number" | "select" | "switch";

export interface FeatureConfig {
  id: string;
  label: string;
  type: FeatureType;
  options?: string[];
}

export const PROPERTY_FEATURES: Record<string, FeatureConfig[]> = {
  residential: [
    {
      id: "room_count",
      label: "Room Count",
      type: "select",
      options: ["1+0", "1+1", "2+1", "3+1", "4+1"],
    },
    { id: "building_age", label: "Building Age", type: "input" },
    { id: "floor_number", label: "Floor Number", type: "input" },
    { id: "total_floor", label: "Total Floors", type: "input" },

    { id: "bathrooms", label: "Bathrooms", type: "input" },
    { id: "balconies", label: "Balconies", type: "input" },
    { id: "maintenance_fee", label: "Maintenance Fee", type: "number" },
    {
      id: "kitchen",
      label: "Kitchen Type",
      type: "select",
      options: ["closed", "open"],
    },
    {
      id: "heating",
      label: "Heating System",
      type: "select",
      options: ["natural gas", "air conditioning", "stove"],
    },
    {
      id: "elevator",
      label: "Elevator",
      type: "select",
      options: ["yes", "no"],
    },
    {
      id: "parking",
      label: "Parking",
      type: "select",
      options: ["no", "open", "close"],
    },
    {
      id: "usage_status",
      label: "Usage Status",
      type: "select",
      options: ["vacant", "tenant", "property_owner"],
    },
    { id: "furnished", label: "Furnished", type: "switch" },
    { id: "swap", label: "Swap / Exchange", type: "switch" },
    { id: "in_site", label: "Inside a Housing Estate", type: "switch" },
  ],
  land: [
    { id: "zoning_status", label: "Zoning Status", type: "input" },
    { id: "ada", label: "Block Number (Ada)", type: "input" },
    { id: "parsel", label: "Plot Number (Parsel)", type: "input" },
    { id: "swap", label: "Swap / Exchange", type: "switch" },
  ],
  commercial: [
    { id: "building_age", label: "Building Age", type: "input" },
    {
      id: "parking",
      label: "Parking",
      type: "select",
      options: ["no", "open", "close"],
    },
    { id: "furnished", label: "Furnished", type: "switch" },
    { id: "swap", label: "Swap / Exchange", type: "switch" },
  ],
  project: [
    {
      id: "usage_status",
      label: "projectct Status",
      type: "select",
      options: ["vacant", "tenant", "property_owner"],
    },
    { id: "swap", label: "Swap / Exchange", type: "switch" },
  ],
};
