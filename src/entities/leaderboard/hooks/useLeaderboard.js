import { useCallback, useEffect, useState } from "react";

import { leaderboardApi } from "../api/leaderboard.api";

import { getApiErrorMessage } from "@/shared/lib/apiError";

export const useLeaderboard = (limit = 10) => {
  const [leaderboard, setLeaderboard] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const [error, setError] = useState(null);

  const getLeaderboard = useCallback(async () => {
    try {
      setError(null);
      setIsFetching(true);

      const res = await leaderboardApi.getLeaderboard(limit);

      setLeaderboard(res.data || []);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to fetch leaderboard"));
    } finally {
      setIsFetching(false);
    }
  }, [limit]);

  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);

  return {
    leaderboard,
    isFetching,
    error,
    refreshLeaderboard: getLeaderboard,
  };
};
