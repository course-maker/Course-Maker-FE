import { tagResponseDto } from "@/api/tag/type";
import { getDestinationResponseDto } from "@/api/destination/type";

export interface CourseDestination {
  visitOrder: number;
  date: number;
  destination: getDestinationResponseDto;
}

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
  courseTags: tagResponseDto[];
  member: {
    nickname: string;
  };
}

export interface Courses {
  currentPage: number;
  totalPage: number;
  pagingSlice: number;
  contents: Course[];
}

/** 코스 등록하기 */
export interface PostTagRequestDto {
  id: number;
  name: string;
  description: string;
}

export interface PostLocationRequestDto {
  address: string;
  longitude: number;
  latitude: number;
}

export interface PostDestinationRequestDto {
  id: number;
  nickname: string;
  name: string;
  tags: PostTagRequestDto[];
  location: PostLocationRequestDto;
  pictureLink: string;
  content: string;
}

export interface PostCourseDestinationRequestDto {
  visitOrder: number;
  date: number;
  destination: PostDestinationRequestDto;
}

export interface PostCourseRequestDto {
  title: string;
  content: string;
  duration: number;
  travelerCount: number;
  travelType: number;
  pictureLink: string;
  courseDestinations: PostCourseDestinationRequestDto[];
  tags: PostTagRequestDto[];
}
