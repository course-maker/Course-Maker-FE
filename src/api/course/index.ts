import { FieldValues } from "react-hook-form";
import { courseLikeAddress, courseReviewAddress, coursesAddress, courseWishAddress } from "../address";
import { apiRequest } from "../axios";
import { postCourse } from "./register";
import {
  Course,
  CourseId,
  Courses,
  GetCourseReviewsResponseDto,
  PagenationOptions,
  PostCourseReviewRecommendResponseDto,
} from "./type";

// 코스 목록 조회
export const getCourse = (params: string): Promise<Courses> => apiRequest("get", `${coursesAddress.getList}?${params}`);

// 코스 상세정보 조회
export const getCourseDetail = (id: number): Promise<Course> =>
  apiRequest("get", coursesAddress.getDetail(id), null, null, { requireAuth: true });

// 코스 삭제
export const deleteCourseDetail = (id: number): Promise<Course> =>
  apiRequest("delete", coursesAddress.delete(id), null, null, { requireAuth: true });

// 코스 등록
export const createCourse = (data: postCourse): Promise<postCourse> => apiRequest("post", coursesAddress.create, data);

// 코스 좋아요 등록
export const addCourseLike = (data: CourseId) =>
  apiRequest("post", courseLikeAddress.addLike, data, null, { requireAuth: true });

// 코스 좋아요 취소
export const deleteCourseLike = (id: number) =>
  apiRequest("delete", courseLikeAddress.deleteLike(id), null, null, { requireAuth: true });

// 코스 찜 등록
export const addCourseWish = (data: CourseId) =>
  apiRequest("post", courseWishAddress.addWish, data, null, { requireAuth: true });

// 코스 찜 취소
export const deleteCourseWish = (id: number) =>
  apiRequest("delete", courseWishAddress.deleteWish(id), null, null, { requireAuth: true });

//코스 리뷰 조회
export const getCourseReviews = (qs: PagenationOptions): Promise<GetCourseReviewsResponseDto> =>
  apiRequest("get", courseReviewAddress.getCourseReviews, null, qs, { requireAuth: true });

//코스 리뷰 등록
export const postCourseReviews = (qs: PagenationOptions, data: FieldValues): Promise<GetCourseReviewsResponseDto> =>
  apiRequest("post", courseReviewAddress.getCourseReviews, data, qs, { requireAuth: true });

//코스 리뷰 추천 등록
export const postCourseReviewRecommend = (id: number): Promise<PostCourseReviewRecommendResponseDto> =>
  apiRequest("post", courseReviewAddress.postCourseReviewRecommend(id), null, null, { requireAuth: true });

//코스 리뷰 추천 취소
export const postCourseReviewUnrecommend = (id: number): Promise<PostCourseReviewRecommendResponseDto> =>
  apiRequest("post", courseReviewAddress.postCourseReviewUnrecommend(id), null, null, { requireAuth: true });

//코스 리뷰 수정
export const putCourseReviewEdit = (qs: { courseId: number; id: number }, data: FieldValues) =>
  apiRequest("put", courseReviewAddress.putCourseReviewEdit, data, qs, { requireAuth: true });

//코스 리뷰 삭제
export const deleteCourseReview = (id: number) =>
  apiRequest("delete", courseReviewAddress.deleteCourseReview(id), null, null, { requireAuth: true });
