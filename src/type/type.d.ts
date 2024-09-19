import { tagResponseDto } from "@/api/tag/type";

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

export type FilterType = "NEWEST" | "RECOMMEND" | "RATING_DOWN" | "RATING_UP";

export interface ReviewFormType {
  title: string;
  description: string;
  pictures: string[];
  rating: number;
}

export interface ReviewEditForm {
  reviewId: number;
  initialValue: ReviewFormType;
}

export interface DetailHeaderDataType {
  title: string;
  nickname: string;
  reviewCount: number;
  isMyPost: boolean;
  tags: tagResponseDto[];

  actionData: DetailActionData;
}

export interface DetailActionData {
  id: number;
  title: string;
  content: string;
  pictureLink: string;
  isMyWish: boolean;
  isMyLike: boolean;
}
