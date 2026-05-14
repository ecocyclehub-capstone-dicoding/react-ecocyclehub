import { axiosInstance } from "@/shared/api/axiosInstance";

export const customerApi = {
  getCustomers: async () => {
    const res = await axiosInstance.get("/customers/");
    return res.data;
  },

  updateCustomer: async (id, data) => {
    const res = await axiosInstance.put(`/customers/${id}/`, data);
    return res.data;
  },

  deleteCustomer: async (id) => {
    const res = await axiosInstance.delete(`/customers/${id}/`);
    return res.data;
  },
};
