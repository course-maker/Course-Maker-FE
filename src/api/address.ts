import { BASE_URL } from "./axios";

export const memberAddress = {
  //post
  validateNickname: "/v1/auth/validate/nickname",
  //post
  validateEmail: "/v1/auth/validate/email",
  //post
  validateCode: "/v1/auth/validate/email/code",
  //post
  login: "/v1/auth/login",
  //post
  logout: "/v1/auth/logout",
  //post
  signUp: "/v1/auth/join",
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
  getList: "/v1/courses",
  getDetail: (id: number) => `/v1/courses/${id}`,
  delete: (id: number) => `/v1/courses/${id}`,
  create: "/v1/courses",
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

export const courseLikeAddress = {
  //post
  addLike: "/v1/courseLikes",
  //delete
  deleteLike: (id: number) => `/v1/courseLikes/${id}`,
};

export const courseWishAddress = {
  //post
  addWish: "/v1/coursewishes",
  //delete
  deleteWish: (id: number) => `/v1/coursewishes/${id}`,
};

export const destinationLikeAddress = {
  //post
  addLike: "/v1/destinationLike",
  //delete
  deleteLike: (id: number) => `/v1/destinationLike/${id}`,
};

export const destinationWishAddress = {
  //post
  addWish: "/v1/destinationwish",
  //delete
  deleteWish: (id: number) => `/v1/destinationwish/${id}`,
};
