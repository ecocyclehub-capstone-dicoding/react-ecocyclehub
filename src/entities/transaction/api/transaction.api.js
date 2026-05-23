import { axiosInstance } from "@/shared/api/axiosInstance";

export const transactionApi = {
  getHistory: async (params = {}) => {
    const res = await axiosInstance.get("/transactions/", {
      params,
    });

    return res.data;
  },

  getAll: async (params = {}) => {
    const res = await axiosInstance.get("/transactions/all/", {
      params,
    });

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

  verify: async (transactionId, password) => {
    const res = await axiosInstance.post(
      `/transactions/${transactionId}/verify/`,
      {
        password,
      },
    );

    return res.data;
  },

  reject: async (transactionId) => {
    const res = await axiosInstance.post(
      `/transactions/${transactionId}/reject/`,
    );

    return res.data;
  },
};
