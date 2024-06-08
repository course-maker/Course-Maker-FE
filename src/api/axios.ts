import axios, { isAxiosError, HttpStatusCode, AxiosRequestConfig, AxiosResponse } from "axios";
import { getAccessToken } from "@/utils/manageTokenInfo";

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export interface ApiRequestResponse<T> {
  data?: T | null;
  errorMessage?: string | null;
}

export const BASE_URL = process.env.APP_BASE_URL || "http://34.64.85.245";

// 기본 Axios 설정
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
  withCredentials: true,
});

// 요청 인터셉터
api.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (isAxiosError(error)) {
      switch (error.response?.status) {
        case HttpStatusCode.BadRequest:
          console.error("400 Error: Bad request.");
          break;
        case HttpStatusCode.Unauthorized:
          console.error("401 Error: Unauthorized.");
          // try {
          //   // Refresh 토큰을 이용해 새로운 액세스 토큰을 요청
          //   const refreshToken = getRefreshToken();
          //   if (refreshToken) {
          //     const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
          //       token: refreshToken,
          //     });
          //     const newAccessToken = response.data.accessToken;
          //     setAccessToken(newAccessToken);

          //     // 원래의 요청을 새로운 액세스 토큰으로 다시 시도
          //     error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          //     return axios.request(error.config);
          //   } else {
          //     console.error("No refresh token available.");
          //     // 로그아웃 또는 로그인 페이지로 리다이렉트 등 추가 처리
          //   }
          // } catch (refreshError) {
          //   console.error("Error refreshing token:", refreshError);
          //   // 로그아웃 또는 로그인 페이지로 리다이렉트 등 추가 처리
          // }
          break;
        case HttpStatusCode.Forbidden:
          console.error("403 Error: Forbidden.");
          break;
        case HttpStatusCode.NotFound:
          console.error("404 Error: Resource not found.");
          break;
        case HttpStatusCode.InternalServerError:
          console.error("500 Error: Internal server error.");
          break;
        default:
          console.error(`Unknown error: ${error.response?.status}`);
          break;
      }
    } else {
      console.error("Unknown error:", error);
    }
    return Promise.reject(error);
  },
);

// API 요청 함수
export async function apiRequest<T, U>(
  method: HttpMethod,
  url: string,
  data?: U,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const request: AxiosRequestConfig = {
      url,
      method,
      data,
      params,
      ...config,
    };
    const response: AxiosResponse<T> = await api(request);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(`Axios Error : `, error);
    } else {
      console.error(`${method} Error : `, error);
    }
    throw error;
  }
}

export default api;
