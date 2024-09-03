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
