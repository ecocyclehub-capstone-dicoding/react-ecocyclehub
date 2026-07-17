import { axiosInstance } from "@/shared/api/axiosInstance";

export const authApi = {
  login: async ({ email, password }) => {
    const res = await axiosInstance.post("/api/auth/login/", {
      email,
      password,
    });

    return res.data;
  },

  register: async ({ name, email, password }) => {
    const res = await axiosInstance.post("/api/auth/register/", {
      name,
      email,
      password,
    });

    return res.data;
  },

  logout: async (refresh) => {
    if (!refresh) {
      throw new Error("Missing refresh token for logout");
    }

    const res = await axiosInstance.post("/api/auth/logout/", {
      refresh,
    });

    return res.data;
  },
};
