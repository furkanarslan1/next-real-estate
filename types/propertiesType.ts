export interface Property {
  id: string;
  created_at: string;
  title: string;
  description: string | null;
  price: number;
  category: "konut" | "arsa" | "is_yeri" | "proje";
  status: "satilik" | "kiralik";
  city_id: number;
  district_id: number;
  neighborhood_id: number;
  category_data: {
    room_count?: string;
    building_age?: string;
    floor_number?: string;
    heating?: string;
    bathrooms?: string;
    balconies?: string;
    in_site?: boolean;
    zoning_status?: string;
    ada?: string;
    parsel?: string;
    [key: string]: any;
  };
  images: string[] | null;
  user_id: string | null;
  is_active: boolean;
}
