import { destinationAddress } from "../address";
import { apiRequest } from "../axios";
import { List, Destination } from "./type";

// 여행지 정보
export const getDestination = (params: Destination): Promise<List> =>
  apiRequest("get", `${destinationAddress.get}?${params}`);
