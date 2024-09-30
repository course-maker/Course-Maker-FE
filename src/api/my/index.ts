import { basicInfoAddress } from "../address";
import { apiRequest } from "../axios";
import { UserBasicInfo } from "./type";

// 첫 진입 시 유저 정보 조회
export const getBasicInfo = (): Promise<UserBasicInfo> =>
  apiRequest("get", basicInfoAddress, null, null, { requireAuth: true });
