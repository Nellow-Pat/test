import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { ApiResponse } from '../types/ApiResponse';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleResponse = <T>(response: AxiosResponse<ApiResponse<T>>): ApiResponse<T> => {
  return response.data;
};

const handleError = (error: any) => {
  return Promise.reject(error);
};

export const get = <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  return api.get<ApiResponse<T>>(url, config)
    .then(handleResponse)
    .catch(handleError);
};

export const post = <T, U>(url: string, data?: U, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  return api.post<ApiResponse<T>>(url, data, config)
    .then(handleResponse)
    .catch(handleError);
};

export const put = <T, U>(url: string, data?: U, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  return api.put<ApiResponse<T>>(url, data, config)
    .then(handleResponse)
    .catch(handleError);
};

export const del = <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  return api.delete<ApiResponse<T>>(url, config)
    .then(handleResponse)
    .catch(handleError);
};

export default api;