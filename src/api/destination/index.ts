import {
  destinationAddress,
  destinationLikeAddress,
  destinationReviewAddress,
  destinationWishAddress,
} from "../address";
import { apiRequest } from "../axios";
import { PagenationOptions } from "../course/type";
import {
  DestinationId,
  getDestinationResponseDto,
  GetDestinationReviewsResponseDto,
  GetDestinationsResponseDto,
  postDestinationRequestDto,
  postDestinationResponseDto,
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
  apiRequest("get", destinationAddress.getDestination(postId));

/**여행지 수정하기*/
export const patchDestinationApi = (
  postId: number,
  data: postDestinationRequestDto,
): Promise<postDestinationResponseDto> => apiRequest("patch", destinationAddress.patchDestination(postId), data);

// 목적지 좋아요 등록
export const addDestinationLike = (data: DestinationId) =>
  apiRequest("post", destinationLikeAddress.addLike, data, null, { requireAuth: true });

// 목적지 좋아요 취소
export const deleteDestinationLike = (id: number) =>
  apiRequest("delete", destinationLikeAddress.deleteLike(id), null, null, { requireAuth: true });

// 목적지 찜 등록
export const addDestinationWish = (data: DestinationId) =>
  apiRequest("post", destinationWishAddress.addWish, data, null, { requireAuth: true });

// 목적지 찜 취소
export const deleteDestinationWish = (id: number) =>
  apiRequest("delete", destinationWishAddress.deleteWish(id), null, null, { requireAuth: true });

//목적지 리뷰 조회
export const getDestinationReviews = (qs: PagenationOptions): Promise<GetDestinationReviewsResponseDto> =>
  apiRequest("get", destinationReviewAddress.getDestinationReviews, null, qs);
