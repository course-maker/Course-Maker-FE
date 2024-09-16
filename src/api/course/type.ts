import { getDestinationResponseDto } from "@/api/destination/type";
import { tagResponseDto } from "@/api/tag/type";

export interface CourseDestination {
  visitOrder: number;
  date: number;
  destination: getDestinationResponseDto;
}

type Member = {
  nickname: string;
};

export interface Course {
  id: number;
  title: string;
  content: string;
  views: number;
  duration: number;
  travelerCount: number;
  travelType: number;
  pictureLink: string;
  courseDestinations: CourseDestination[];
  tags: tagResponseDto[];
  member: Member;
  isMyCourse: boolean;
  averageRating: number;
  wishCount: number;
  reviewCount: number;
  likeCount: number;
  isMyWishCourse: boolean;
  isMyLikeCourse: boolean;
}

export interface Courses {
  currentPage: number;
  totalPage: number;
  pagingSlice: number;
  contents: Course[];
}

export interface CourseId {
  courseId: number;
}

export type PagenationOptions = {
  courseId: number;
  record?: number;
  page?: number;
  orderBy?: string;
};

export interface CourseReview {
  courseId: number;
  reviewId: number;
  nickname: string;
  title: string;
  description: string;
  pictures: string[];
  rating: number;
  isMyCourseReview: boolean;
  recommendCount: number;
  reviewedAt: string;
  isMyLikeReview: boolean;
}

export interface GetCourseReviewsResponseDto {
  currentPage: number;
  totalPage: number;
  pagingSlice: number;
  totalContents: number;
  contents: CourseReview[];
}

export interface PostCourseReviewRecommendResponseDto {
  courseId: number;
  reviewId: number;
  nickname: string;
  title: string;
  description: string;
  pictures: string[];
  rating: number;
  isMyCourseReview: boolean;
  recommendCount: number;
  isMyLikeReview: boolean;
}

export interface PostCourseReviewsRequestDto {
  title: string;
  description: string;
  pictures: string[];
  rating: number;
}
