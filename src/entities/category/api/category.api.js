import { axiosInstance } from "@/shared/api/axiosInstance";

export const categoryApi = {
  getCategories: async (params = {}) => {
    const res = await axiosInstance.get("/categories/", {
      params,
    });

    return res.data;
  },

  getCategoryById: async (id) => {
    const res = await axiosInstance.get(`/categories/${id}/`);

    return res.data;
  },

  createCategory: async (payload) => {
    const res = await axiosInstance.post("/categories/", payload);

    return res.data;
  },

  updateCategory: async (id, payload) => {
    const res = await axiosInstance.put(`/categories/${id}/`, payload);

    return res.data;
  },

  deleteCategory: async (id) => {
    const res = await axiosInstance.delete(`/categories/${id}/`);

    return res.data;
  },
};
