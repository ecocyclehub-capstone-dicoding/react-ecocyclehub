import { axiosInstance } from "@/shared/api/axiosInstance";

export const transactionApi = {
  getHistory: async (params = {}) => {
    const res = await axiosInstance.get("/api/transactions/", {
      params,
    });

    return res.data;
  },

  getAll: async (params = {}) => {
    const res = await axiosInstance.get("/api/transactions/all/", {
      params,
    });

    return res.data;
  },

  getById: async (transactionId) => {
    const res = await axiosInstance.get(`/api/transactions/all/${transactionId}/`);

    return res.data;
  },

  create: async (payload) => {
    const res = await axiosInstance.post("/api/transactions/", payload);

    return res.data;
  },

  verify: async (transactionId, password) => {
    const res = await axiosInstance.post(
      `/api/transactions/${transactionId}/verify/`,
      {
        password,
      },
    );

    return res.data;
  },

  reject: async (transactionId, password) => {
    const res = await axiosInstance.post(
      `/api/transactions/${transactionId}/reject/`,
      { password },
    );

    return res.data;
  },
};
