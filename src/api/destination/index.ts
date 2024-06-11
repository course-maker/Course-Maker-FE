import { destinationAddress } from "../address";
import { apiRequest } from "../axios";
import { Destination } from "./type";

// 여행지 정보
export const getDestination = (params: Destination): Promise<Destination> =>
  apiRequest("get", `${destinationAddress.get}?${params}`);
