import { atom } from "recoil";

export const authState = atom<boolean | null>({
  key: "authState",
  default: null,
});
