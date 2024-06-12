import { Destination, postDestinationRequestDto, postDestinationResponseDto, getDestinationResponseDto } from "./type";
import { destinationAddress } from "../address";
import { apiRequest } from "../axios";

// 여행지 정보
export const getDestination = (params: string): Promise<Destination> =>
  apiRequest("get", `${destinationAddress.get}?${params}`);

/**여행지 등록하기*/
export const postDestinationApi = (data: postDestinationRequestDto): Promise<postDestinationResponseDto> =>
  apiRequest("post", destinationAddress.postDestination, data);

/**여행지 상세정보 조회하기*/
export const getDestinationApi = (postId: number): Promise<getDestinationResponseDto> =>
  apiRequest("get", destinationAddress.getDestination(postId));

/**여행지 수정하기*/
export const patchDestinationApi = (
  postId: number,
  data: postDestinationRequestDto,
): Promise<postDestinationResponseDto> => apiRequest("patch", destinationAddress.patchDestination(postId), data);
