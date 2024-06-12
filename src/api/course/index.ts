import { coursesAddress } from "../address";
import { apiRequest } from "../axios";
import { Courses } from "./type";

//코스 정보
export const getCourse = (params: any): Promise<Courses> => apiRequest("get", `${coursesAddress.get}${params}`);
