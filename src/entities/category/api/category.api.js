import { axiosInstance } from "@/shared/api/axiosInstance";

export const categoryApi = {
  getCategories: async (params = {}) => {
    const res = await axiosInstance.get("/api/categories/", {
      params,
    });

    return res.data;
  },

  createCategory: async (payload) => {
    const res = await axiosInstance.post("/api/categories/", payload);

    return res.data;
  },

  updateCategory: async (id, payload) => {
    const res = await axiosInstance.put(`/api/categories/${id}/`, payload);

    return res.data;
  },

  deleteCategory: async (id) => {
    const res = await axiosInstance.delete(`/api/categories/${id}/`);

    return res.data;
  },
};
