import { Destination, postDestinationRequestDto, postDestinationResponseDto } from "./type";
import { destinationAddress } from "../address";
import { apiRequest } from "../axios";

// 여행지 정보
export const getDestination = (params: Destination): Promise<Destination> =>
  apiRequest("get", `${destinationAddress.get}?${params}`);

/**여행지 등록하기*/
export const postDestinationApi = (data: postDestinationRequestDto): Promise<postDestinationResponseDto> =>
  apiRequest("post", destinationAddress.postDestination, data);
