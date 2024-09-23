import { GetReviewsResponseDto } from "@/type/type";
import { FieldValues } from "react-hook-form";
import {
  destinationAddress,
  destinationLikeAddress,
  destinationReviewAddress,
  destinationWishAddress,
} from "../address";
import { apiRequest } from "../axios";
import {
  DestinationId,
  getDestinationResponseDto,
  GetDestinationsResponseDto,
  PagenationOptions,
  postDestinationRequestDto,
  postDestinationResponseDto,
  PostDestinationReviewRecommendResponseDto,
} from "./type";

// 여행지 정보
export const getDestination = (qs: GetDestinationsResponseDto): Promise<GetDestinationsResponseDto> =>
  apiRequest("get", destinationAddress.get, null, qs);

export const getDestinations = (param: string): Promise<GetDestinationsResponseDto> =>
  apiRequest("get", `${destinationAddress.get}?${param}`);

/**여행지 등록하기*/
export const postDestinationApi = (data: postDestinationRequestDto): Promise<postDestinationResponseDto> =>
  apiRequest("post", destinationAddress.postDestination, data, null, { requireAuth: true });

/**여행지 상세정보 조회하기*/
export const getDestinationApi = (postId: number): Promise<getDestinationResponseDto> =>
  apiRequest("get", destinationAddress.getDestination(postId), null, null, { requireAuth: true });

/**여행지 수정하기*/
export const patchDestinationApi = (
  postId: number,
  data: postDestinationRequestDto,
): Promise<postDestinationResponseDto> =>
  apiRequest("patch", destinationAddress.patchDestination(postId), data, null, { requireAuth: true });

// 여행지 삭제
export const deleteDestinationDetail = (id: number) =>
  apiRequest("delete", destinationAddress.delete(id), null, null, { requireAuth: true });

// 여행지 좋아요 등록
export const addDestinationLike = (data: DestinationId) =>
  apiRequest("post", destinationLikeAddress.addLike, data, null, { requireAuth: true });

// 여행지 좋아요 취소
export const deleteDestinationLike = (id: number) =>
  apiRequest("delete", destinationLikeAddress.deleteLike(id), null, null, { requireAuth: true });

// 여행지 찜 등록
export const addDestinationWish = (data: DestinationId) =>
  apiRequest("post", destinationWishAddress.addWish, data, null, { requireAuth: true });

// 여행지 찜 취소
export const deleteDestinationWish = (id: number) =>
  apiRequest("delete", destinationWishAddress.deleteWish(id), null, null, { requireAuth: true });

//여행지 리뷰 조회
export const getDestinationReviews = (qs: PagenationOptions): Promise<GetReviewsResponseDto> =>
  apiRequest("get", destinationReviewAddress.getDestinationReviews, null, qs);

//여행지 리뷰 등록
export const postDestinationReviews = (qs: PagenationOptions, data: FieldValues): Promise<getDestinationResponseDto> =>
  apiRequest("post", destinationReviewAddress.getDestinationReviews, data, qs, { requireAuth: true });

//여행지 리뷰 추천 등록
export const postDestinationReviewRecommend = (id: number): Promise<PostDestinationReviewRecommendResponseDto> =>
  apiRequest("post", destinationReviewAddress.postDestinationReviewRecommend(id), null, null, { requireAuth: true });

//여행지 리뷰 추천 취소
export const postDestinationReviewUnrecommend = (id: number): Promise<PostDestinationReviewRecommendResponseDto> =>
  apiRequest("post", destinationReviewAddress.postDestinationReviewUnrecommend(id), null, null, { requireAuth: true });

//여행지 리뷰 수정
export const putDestinationReviewEdit = (id: number, data: FieldValues) =>
  apiRequest("put", destinationReviewAddress.destinationReviewEditAndDelete(id), data, null, { requireAuth: true });

//여행지 리뷰 삭제
export const deleteDestinationReview = (id: number) =>
  apiRequest("delete", destinationReviewAddress.destinationReviewEditAndDelete(id), null, null, { requireAuth: true });
