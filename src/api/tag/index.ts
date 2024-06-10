import { tagAddress } from "../address";
import { apiRequest } from "../axios";
import { tagResponseDto } from "./type";

/**태그 데이터 불러오기*/
export const getTag = (): Promise<tagResponseDto[]> => apiRequest("get", tagAddress.tag);
