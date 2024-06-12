// import { postLogout } from "@/api/member";
import axios, { AxiosError } from "axios";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const saveAccessToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

export const saveRefreshToken = (refreshToken: string) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    try {
      const response = await axios.post(
        "/jwt/reissue",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );
      const newAccessToken = response.data.accessToken;
      saveAccessToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh access token", error);
      return null;
    }
  }
  return null;
};

export const handleSessionExpired = async () => {
  // await postLogout();
  removeTokens();
  alert("세션이 만료되어 다시 로그인 해주세요.");
};

export const retryWithNewAccessToken = async (error: AxiosError) => {
  try {
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) {
      saveAccessToken(newAccessToken);
      // 원래의 요청을 새로운 액세스 토큰으로 다시 시도
      if (error.config) {
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios.request(error.config);
      }
    } else {
      console.error("refresh token이 없습니다.");
      handleSessionExpired();
    }
  } catch (error) {
    console.error("access token을 재발급 받는 중 오류가 발생했습니다.", error);
    handleSessionExpired();
  }
};
