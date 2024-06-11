import { tagResponseDto } from "@/api/tag/type";

export interface Tag {
  id: number;
  name: string;
  description: string;
}

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
}
export interface postDestinationRequestDto {
  name: string;
  tags: Tag[];
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

export interface postDestinationResponseDto {
  id: number;
  nickname: string;
  name: string;
  tags: Tag[];
  location: Location;
  pictureLink: string;
  content: string;
}
