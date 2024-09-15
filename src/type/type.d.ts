export interface TabBarIconProps {
  title: string;
  color: string;
}

export interface Status {
  status: string;
  message: string;
}

export interface Location {
  lat: number;
  lng: number;
}
export interface LocationWithId {
  id: number;
  lat: number;
  lng: number;
}

export type FilterType = "date" | "recommendation" | "asc" | "desc";

export interface ReviewFormType {
  rating: number;
  content: string;
  images: string[];
}
