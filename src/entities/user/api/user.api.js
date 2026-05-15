import { axiosInstance } from "@/shared/api/axiosInstance";

export const userApi = {
  getUsers: async () => {
    const res = await axiosInstance.get("/users/");
    return res.data;
  },

  createUser: async (payload) => {
    const res = await axiosInstance.post("/users/", payload);
    return res.data;
  },

  updateUser: async (id, payload) => {
    const res = await axiosInstance.put(`/users/${id}/`, payload);
    return res.data;
  },

  deleteUser: async (id) => {
    const res = await axiosInstance.delete(`/users/${id}/`);
    return res.data;
  },
};
