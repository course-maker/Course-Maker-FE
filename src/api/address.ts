import { BASE_URL } from "./axios";

export const memberAddress = {
  //post
  validateNickname: "/v1/member/validate-nickname",
  //post
  validateEmail: "/v1/member/validate-email",
  //post
  login: "/v1/member/login",
  //post
  logout: "/v1/member/logout",
  //post
  signUp: "/v1/member/signup",
};

export const destinationAddress = {
  //post
  postDestination: "/v1/destination",
  //get
  get: "/v1/destination",
  //get
  getDestination: (postId: number) => `/v1/destination/${postId}`,
  //patch
  patchDestination: (postId: number) => `/v1/destination/${postId}`,
};

export const imageAddress = {
  //post
  uploadImage: "/upload",
};

export const tagAddress = {
  //get
  tag: "/v1/tags",
};

export const coursesAddress = {
  //get
  get: "/v1/courses",
  delete: "/v1/course",
};

export const oauthAddress = {
  //post
  kakao: {
    login: `${BASE_URL}/auth/kakao/login`,
    redirect: (code: string) => `/login/oauth2/code/kakao?code=${code}`,
  },
};

export const courseAddress = {
  //post
  courses: "/v1/courses",
};
