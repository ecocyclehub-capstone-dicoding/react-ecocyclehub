import { axiosInstance } from "@/shared/api/axiosInstance";

export const leaderboardApi = {
  getLeaderboard: async (limit = 10) => {
    const res = await axiosInstance.get(
      `/gamification/leaderboard/?limit=${limit}`,
    );

    return res.data;
  },
};
