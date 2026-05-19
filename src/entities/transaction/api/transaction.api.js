import { axiosInstance } from "@/shared/api/axiosInstance";

export const transactionApi = {
  getHistory: async () => {
    const res = await axiosInstance.get("/transactions/");
    return res.data;
  },

  getAll: async (params = {}) => {
    const res = await axiosInstance.get("/transactions/all/", { params });
    return res.data;
  },

  getById: async (transactionId) => {
    const res = await axiosInstance.get(`/transactions/all/${transactionId}/`);
    return res.data;
  },

  create: async (payload) => {
    const res = await axiosInstance.post("/transactions/", payload);
    return res.data;
  },

  verify: async (transactionId) => {
    const res = await axiosInstance.post(
      `/transactions/${transactionId}/verify`,
    );

    return res.data;
  },
};
