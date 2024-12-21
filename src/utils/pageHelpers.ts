import { authPages, dynamicPages, myPages, registerPages } from "@/constants/pagePath";

export const isSignPage = (path: string) => authPages.includes(path);
export const isRegisterPage = (path: string) =>
  registerPages.includes(path) || dynamicPages.some((regex) => regex.test(path));
export const isMyPage = (path: string) => myPages.test(path);
