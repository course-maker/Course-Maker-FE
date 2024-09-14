import { FilterType } from "@/type/type";

export const REVEIW_FILTER: { id: number; name: string; type: FilterType }[] = [
  { id: 1, name: "최신순", type: "date" },
  { id: 2, name: "추천순", type: "recommendation" },
  { id: 3, name: "별점 낮은 순", type: "asc" },
  { id: 4, name: "별점 높은 순", type: "desc" },
];
