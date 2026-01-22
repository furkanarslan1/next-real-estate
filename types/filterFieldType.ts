export interface FilterFieldType {
  label: string;
  key: string;
  type: "select" | "number" | "text" | "date";
  options?: string[];
}
