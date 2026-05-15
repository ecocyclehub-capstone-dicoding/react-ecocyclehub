import { axiosInstance } from "@/shared/api/axiosInstance";

export const dashboardApi = {
  getAdminStats: async () => {
    const res = await axiosInstance.get("/dashboard/admin/stats/");

    return res.data;
  },

  getRecentTransactions: async () => {
    const res = await axiosInstance.get(
      "/dashboard/admin/recent-transactions/",
    );

    return res.data;
  },
};
