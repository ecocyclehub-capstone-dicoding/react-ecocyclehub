import { axiosInstance } from "@/shared/api/axiosInstance";

export const authApi = {
  login: async ({ email, password }) => {
    const res = await axiosInstance.post("/auth/login/", {
      email,
      password,
    });

    return res.data;
  },

  register: async ({ name, email, password }) => {
    const res = await axiosInstance.post("/auth/register/", {
      name,
      email,
      password,
    });

    return res.data;
  },

  getMe: async () => {
    const res = await axiosInstance.get("/me/");
    return res.data.data;
  },

  logout: async () => {
    const res = await axiosInstance.post("/auth/logout/");
    return res.data;
  },
};
