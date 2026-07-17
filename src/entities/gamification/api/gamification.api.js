import { axiosInstance } from "@/shared/api/axiosInstance";

export const gamificationApi = {
  getLevels: async () => {
    const res = await axiosInstance.get("/api/gamification/levels/");

    return res.data;
  },

  createLevel: async (payload) => {
    const res = await axiosInstance.post("/api/gamification/levels/", payload);

    return res.data;
  },

  updateLevel: async (id, payload) => {
    const res = await axiosInstance.put(`/api/gamification/levels/${id}/`, payload);

    return res.data;
  },

  deleteLevel: async (id) => {
    const res = await axiosInstance.delete(`/api/gamification/levels/${id}/`);

    return res.data;
  },
};
