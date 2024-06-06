import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export interface ApiRequestResponse<T> {
  data?: T | null;
  errorMessage?: string | null;
}

export const BASE_URL = "http://34.64.85.245";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export async function apiRequest<T, U>(
  method: HttpMethod,
  url: string,
  data?: U,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<T> {
  const request: AxiosRequestConfig = {
    url,
    method,
    data,
    params,
    ...config,
  };
  const response: AxiosResponse<T> = await axiosInstance(request);
  return response.data;
}
