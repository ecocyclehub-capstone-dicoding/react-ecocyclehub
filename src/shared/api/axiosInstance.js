import axios from "axios";
import tokenService from "@/shared/lib/tokenService";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // http://127.0.0.1:8000/api
  headers: { "Content-Type": "application/json" },
  timeout: 10_000,
});

// ── Request: sisipkan access token ────────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccess();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response: auto-refresh jika 401 ──────────────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // Kalau 401 dan bukan request refresh itu sendiri
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const refresh = tokenService.getRefresh();
        if (!refresh) throw new Error("No refresh token");

        // Hit endpoint refresh — response: { data: { access_token } }
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh/`,
          { refresh },
          { headers: { "Content-Type": "application/json" } },
        );

        const newAccess = data.data.access_token;
        tokenService.setTokens(newAccess, null); // hanya update access
        original.headers.Authorization = `Bearer ${newAccess}`;

        return axiosInstance(original); // retry request awal
      } catch {
        tokenService.clearTokens();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
