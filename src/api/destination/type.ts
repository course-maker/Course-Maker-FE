import { tagResponseDto } from "@/api/tag/type";

export interface Location {
  address: string;
  longitude: number;
  latitude: number;
}

export interface List {
  id: number;
  nickname: string;
  name: string;
  tags: tagResponseDto[];
  location: Location;
  pictureLink: string;
  content: string;
}

export interface Destination {
  currentPage: number;
  totalPage: number;
  pagingSlice: number;
  contents: List[];
}
