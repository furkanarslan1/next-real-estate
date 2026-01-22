import { FilterFieldType } from "@/types/filterFieldType";

export const CATEGORY_DETAILS: Record<string, FilterFieldType[]> = {
  residential: [
    {
      label: "Room Count",
      key: "room_count",
      type: "select",
      options: ["1+0", "1+1", "2+1", "3+1", "4+1", "5+1"],
    },
    {
      label: "Building Age",
      key: "building_age",
      type: "select",
      options: ["0", "1-5", "6-10", "11-15", "16-20", "21+"],
      valueType: "range",
    },
    { label: "Floor Level", key: "floor", type: "number" },
    { label: "Total Floors", key: "total_floor", type: "number" },
    {
      label: "Heating",
      key: "heating",
      type: "select",
      options: ["natural gas", "stove", "air conditioning"],
    },
    {
      label: "Furnished",
      key: "furnished",
      type: "select",
      options: ["Yes", "No"],
      valueType: "boolean",
    },
    {
      label: "In Site",
      key: "in_site",
      type: "select",
      options: ["Yes", "No"],
      valueType: "boolean",
    },
    {
      label: "Using Status",
      key: "usage_status",
      type: "select",
      options: ["vacant", "tenant", "property_owner"],
    },
  ],
  land: [
    {
      label: "Zoning Status",
      key: "zoning_status",
      type: "select",
      options: [
        "Residential",
        "Commercial",
        "Industrial",
        "Agricultural",
        "Tourism",
      ],
    },
    { label: "Precedent ", key: "precedent", type: "text" },
    {
      label: "Title Deed Status",
      key: "deed_status",
      type: "select",
      options: ["Detached", "Shared"],
    },
  ],
  commercial: [
    {
      label: "Usage Type",
      key: "usage",
      type: "select",
      options: ["Office", "Shop", "Warehouse", "Factory", "Hotel"],
    },
    {
      label: "Building Age",
      key: "age",
      type: "select",
      options: ["0", "1-5", "6-10", "11-20", "21+"],
    },
    {
      label: "Entry Level",
      key: "entry_level",
      type: "select",
      options: ["Street Level", "Basement", "Upper Floor"],
    },
  ],
  project: [
    {
      label: "Project Status",
      key: "project_status",
      type: "select",
      options: ["Under Construction", "Ready to Move", "Off-plan"],
    },
    { label: "Delivery Date", key: "delivery", type: "date" },
    { label: "Developer", key: "developer", type: "text" },
  ],
};
