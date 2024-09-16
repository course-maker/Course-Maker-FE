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
  views: number;
  tags: Tag[];
  location: Location;
  pictureLink: string;
  content: string;
  averageRating: number;
  isMyDestination: boolean;
  disabled: boolean | null;
  isApiData: boolean;
  wishCount: number;
  reviewCount: number;
  likeCount: number;
  isMyWishDestination: boolean;
  isMyLikeDestination: boolean;
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

export type PagenationOptions = {
  destinationId: number;
  record?: number;
  page?: number;
  orderBy?: string;
};

type DestinationReview = {
  destinationId: number;
  reviewId: number;
  nickname: string;
  title: string;
  description: string;
  pictures: [];
  rating: number;
  isMyDestinationReview: boolean;
  recommendCount: number;
  reviewedAt: string;
  isMyLikeReview: boolean;
};

export interface GetDestinationReviewsResponseDto {
  currentPage: number;
  totalPage: number;
  pagingSlice: number;
  totalContents: number;
  contents: DestinationReview[];
}

export interface PostDestinationReviewRecommendResponseDto {
  destinationId: number;
  reviewId: number;
  nickname: string;
  title: string;
  description: string;
  pictures: string[];
  rating: number;
  isMyDestinationReview: boolean;
  recommendCount: number;
  isMyLikeReview: boolean;
}
