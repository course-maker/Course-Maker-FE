import { imageAddress } from "../address";
import { apiRequest } from "../axios";
import { uploadImageResponseDto } from "./type";

/**이미지 업로드하기*/
export const postImage = (data: FormData): Promise<uploadImageResponseDto> =>
  apiRequest("post", imageAddress.uploadImage, data);
