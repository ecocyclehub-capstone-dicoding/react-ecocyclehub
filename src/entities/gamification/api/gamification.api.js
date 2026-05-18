import { axiosInstance } from "@/shared/api/axiosInstance";

export const gamificationApi = {
  getLevels: async () => {
    const res = await axiosInstance.get("/gamification/levels/");

    return res.data;
  },

  createLevel: async (payload) => {
    const res = await axiosInstance.post("/gamification/levels/", payload);

    return res.data;
  },

  updateLevel: async (id, payload) => {
    const res = await axiosInstance.put(`/gamification/levels/${id}/`, payload);

    return res.data;
  },

  deleteLevel: async (id) => {
    const res = await axiosInstance.delete(`/gamification/levels/${id}/`);

    return res.data;
  },
};
