const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const REDIRECT_URI = "http://localhost:5173/auth/kakao/callback";

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
  signUp: "/v1/member",
};

export const destinationAddress = {
  //post
  postDestination: "/v1/destination",
  //get
  get: "/v1/destination",
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
};

export const oauthAddress = {
  //post
  kakao: {
    login: `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`,
    redirect: (code: string) => `/login/oauth2/code/kakao?code=${code}`,
  },
};
