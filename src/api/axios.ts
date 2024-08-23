import { getAccessToken, retryWithNewAccessToken } from "@/utils/manageTokenInfo";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  requireAuth?: boolean;
}

export interface ApiRequestResponse<T> {
  data?: T | null;
  errorMessage?: string | null;
}

export const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://api.course-maker.net:8080";

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
  async (config: InternalAxiosRequestConfig & CustomAxiosRequestConfig) => {
    if (config.requireAuth) {
      const accessToken = getAccessToken();
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
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
          return retryWithNewAccessToken(error);
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
  params?: Record<string, unknown> | null,
  config?: CustomAxiosRequestConfig,
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
