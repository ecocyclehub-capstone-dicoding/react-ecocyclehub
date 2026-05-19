import { axiosInstance } from "@/shared/api/axiosInstance";

export const dashboardApi = {
  getAdminDashboard: async () => {
    const res = await axiosInstance.get("/dashboard/admin/");
    return res.data;
  },

  getOfficerDashboard: async () => {
    const res = await axiosInstance.get("/dashboard/officer/");
    return res.data;
  },

  getCustomerDashboard: async () => {
    const res = await axiosInstance.get("/dashboard/customers/");
    return res.data;
  },
};
