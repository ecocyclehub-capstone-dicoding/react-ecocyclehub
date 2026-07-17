import { useQuery } from "@tanstack/react-query";

import { leaderboardApi } from "../api/leaderboard.api";

import { getApiErrorMessage } from "@/shared/lib/apiError";

export const useLeaderboard = (limit = 10) => {
  const query = useQuery({
    queryKey: ["leaderboard", limit],
    queryFn: () => leaderboardApi.getLeaderboard(limit),
    select: (response) => response.data || [],
  });

  return {
    leaderboard: query.data || [],
    isFetching: query.isFetching,
    error: query.error
      ? getApiErrorMessage(query.error, "Failed to fetch leaderboard")
      : null,
    refreshLeaderboard: query.refetch,
  };
};
