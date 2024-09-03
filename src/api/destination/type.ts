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
  apiData: 0 | 1;
}

/**여행지 전체 목록 조회*/
export interface GetTagResponseDto {
  id: number;
  name: string;
  description: string;
}

export interface GetLocationDto {
  address: string;
  longitude: number;
  latitude: number;
}

export interface GetDestinationDto {
  id: number;
  nickname: string;
  name: string;
  tags: GetTagResponseDto[];
  location: GetLocationDto;
  pictureLink: string;
  content: string;
}

export type GetDestinationsResponseDto = {
  currentPage: number;
  totalPage: number;
  pagingSlice: number;
  contents: GetDestinationDto[];
};

export interface DestinationId {
  destinationId: number;
}
