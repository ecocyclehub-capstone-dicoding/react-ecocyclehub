import { axiosInstance } from "@/shared/api/axiosInstance";

export const userApi = {
  getUsers: async (params = {}) => {
    const res = await axiosInstance.get("/api/users/", {
      params,
    });

    return res.data;
  },

  getUserById: async (id) => {
    const res = await axiosInstance.get(`/api/users/${id}/`);

    return res.data;
  },

  createUser: async (payload) => {
    const res = await axiosInstance.post("/api/users/", payload);

    return res.data;
  },

  updateUser: async (id, payload) => {
    const res = await axiosInstance.put(`/api/users/${id}/`, payload);

    return res.data;
  },

  deleteUser: async (id) => {
    const res = await axiosInstance.delete(`/api/users/${id}/`);

    return res.data;
  },
};
