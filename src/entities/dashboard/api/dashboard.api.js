import { axiosInstance } from "@/shared/api/axiosInstance";

export const dashboardApi = {
  getAdminDashboard: async () => {
    const res = await axiosInstance.get("/dashboard/admin/");
    return res.data;
  },
};
