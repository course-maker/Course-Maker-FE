import { coursesAddress } from "../address";
import { apiRequest } from "../axios";
import { Courses, PostCourseRequestDto } from "./type";

//코스 정보
export const getCourse = (params: string): Promise<Courses> => apiRequest("get", `${coursesAddress.get}?${params}`);

/**코스 등록*/
export const postCourses = (data: PostCourseRequestDto): Promise<PostCourseRequestDto> =>
  apiRequest("post", coursesAddress.get, data);
