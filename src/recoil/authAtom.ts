import { UserBasicInfo } from "@/api/my/type";
import { atom } from "recoil";

export const authState = atom<UserBasicInfo | null>({
  key: "authState",
  default: null,
});
