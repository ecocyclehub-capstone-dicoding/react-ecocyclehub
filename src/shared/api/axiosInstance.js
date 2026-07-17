import axios from "axios";
import { tokenService } from "@/shared/lib/tokenService";
import { userSession } from "@/shared/lib/userSession";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

    const isAuthRoute = ["/api/auth/login/", "/api/auth/register/", "/api/auth/refresh/", "/api/auth/logout/"].some(
      (path) => originalRequest.url?.includes(path),
    );

    if (isAuthRoute) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401 || originalRequest._retry) {
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

      if (!refreshToken) {
        throw new Error("No refresh token");
      }

      const res = await axios.post(`${BASE_URL}/api/auth/refresh/`, {
        refresh: refreshToken,
      });

      const accessToken = res.data?.data?.access_token;
      const rotatedRefreshToken = res.data?.data?.refresh_token;

      if (!accessToken || !rotatedRefreshToken) {
        throw new Error("Incomplete rotated token response");
      }

      tokenService.setTokens(accessToken, rotatedRefreshToken);

      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      processQueue(null, accessToken);

      return axiosInstance(originalRequest);
    } catch (err) {
      processQueue(err, null);
      tokenService.clearTokens();
      userSession.clearUser();
      window.location.href = "/login";
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
