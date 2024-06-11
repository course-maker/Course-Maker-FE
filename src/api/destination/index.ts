import { destinationAddress } from "../address";
import { postDestinationRequestDto, postDestinationResponseDto } from "./type";
import { apiRequest } from "../axios";

/**여행지 등록하기*/
export const postDestinationApi = (data: postDestinationRequestDto): Promise<postDestinationResponseDto> =>
  apiRequest("post", destinationAddress.postDestination, data);
