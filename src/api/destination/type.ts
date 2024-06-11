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
/**여행지 등록하기*/
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

/**여행지 상세정보 조회하기*/
export interface getDestinationResponseDto {
  id: number;
  nickname: string;
  name: string;
  tags: Tag[];
  location: Location;
  pictureLink: string;
  content: string;
}
