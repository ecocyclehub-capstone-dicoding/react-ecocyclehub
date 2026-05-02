import { axiosInstance } from "@/shared/api";
import tokenService from "@/shared/lib/tokenService";

export const authApi = {
  // POST /auth/login/ → { data: { access_token, refresh_token, role } }
  login: async ({ email, password }) => {
    const res = await axiosInstance.post("/auth/login/", { email, password });
    const { access_token, refresh_token } = res.data.data;
    tokenService.setTokens(access_token, refresh_token);
    return res.data.data; // { access_token, refresh_token, role }
  },

  // POST /auth/register/ → { data: { id, name, email, role } }
  register: async ({ name, email, password }) => {
    const res = await axiosInstance.post("/auth/register/", {
      name,
      email,
      password,
    });
    return res.data.data; // { id, name, email, role }
  },

  // GET /me/ → data user yang sedang login
  getMe: async () => {
    const res = await axiosInstance.get("/me/");
    return res.data.data;
  },

  // POST /auth/logout/
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout/");
    } finally {
      // Selalu clear token meski request gagal
      tokenService.clearTokens();
    }
  },
};
