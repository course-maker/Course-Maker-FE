import { authPages, dynamicPages, registerPages } from "@/constants/pagePath";

export const isAuthPage = (path: string) => authPages.includes(path);
export const isRegisterPage = (path: string) =>
  registerPages.includes(path) || dynamicPages.some((regex) => regex.test(path));
