import api from './apiCaller';
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from '../paths/auth';

const whitelistUrls = [
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
];

api.interceptors.request.use(
  (config) => {
    const isWhitelisted = whitelistUrls.some(url => config.url?.endsWith(url));
    if (isWhitelisted) {
      return config;
    }

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);