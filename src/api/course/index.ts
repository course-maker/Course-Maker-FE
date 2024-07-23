import { coursesAddress } from "../address";
import { apiRequest } from "../axios";
import { postCourse } from "./register";
import { Courses, Course } from "./type";

// 코스 목록 조회
export const getCourse = (params: string): Promise<Courses> => apiRequest("get", `${coursesAddress.getList}?${params}`);

// 코스 상세정보 조회
export const getCourseDetail = (id: number): Promise<Course> => apiRequest("get", coursesAddress.getDetail(id));

// 코스 삭제
export const deleteCourseDetail = (id: number): Promise<Course> => apiRequest("delete", coursesAddress.delete(id));

// 코스 등록
export const createCourse = (data: postCourse): Promise<postCourse> => apiRequest("post", coursesAddress.create, data);
