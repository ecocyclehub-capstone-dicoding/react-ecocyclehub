import axios from "axios";
import { tokenService } from "@/shared/lib/tokenService";

const BASE_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRoute =
      originalRequest.url?.includes("/auth/login/") ||
      originalRequest.url?.includes("/auth/register/");

    if (isAuthRoute) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/auth/refresh-token/")) {
      tokenService.clearTokens();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = tokenService.getRefreshToken();

      const res = await axios.post(`${BASE_URL}/auth/refresh-token/`, {
        refresh_token: refreshToken,
      });

      const { access_token } = res.data.data;

      tokenService.setTokens(access_token, refreshToken);

      axiosInstance.defaults.headers.Authorization = `Bearer ${access_token}`;
      originalRequest.headers.Authorization = `Bearer ${access_token}`;

      processQueue(null, access_token);

      return axiosInstance(originalRequest);
    } catch (err) {
      processQueue(err, null);
      tokenService.clearTokens();
      window.location.href = "/login";
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
