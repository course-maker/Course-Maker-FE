import { memberAddress } from "../address";
import { apiRequest } from "../axios";
import { validateNicknameRequestDto } from "./type";

/**닉네임 중복 검사하기*/
export const postNickname = (data: validateNicknameRequestDto) =>
  apiRequest("post", memberAddress.validateNickname, data);
