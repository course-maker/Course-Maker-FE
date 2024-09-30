import { CourseReview } from "@/api/course/type";
import { DestinationReview } from "@/api/destination/type";
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
  averageRating: number;
  isMyPost: boolean;
  tags: tagResponseDto[];
  isApiData?: boolean;

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

export type Review = DestinationReview | CourseReview;

export interface GetReviewsResponseDto {
  currentPage: number;
  totalPage: number;
  pagingSlice: number;
  totalContents: number;
  contents: Review[];
}

export interface RefinedReview {
  reviewId: number;
  nickname: string;
  title: string;
  description: string;
  pictures: string[];
  rating: number;
  isMyReview: boolean;
  recommendCount: number;
  reviewedAt: string;
  isMyLikeReview: boolean;
}
