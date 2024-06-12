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
