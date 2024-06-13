import { Destination } from "@/api/destination/type";
import { Courses } from "@/api/course/type";

//여행지 초기값 설정
export const initialDestination: Destination = {
  currentPage: 1,
  totalPage: 1,
  pagingSlice: 12,
  contents: [],
};

//코스 초기값 설정
export const initialCourse: Courses = {
  currentPage: 1,
  totalPage: 1,
  pagingSlice: 12,
  contents: [],
};

//정렬 기준
export const initialSortOrder = {
  course: "NEWEST",
  destination: "NEWEST",
};
