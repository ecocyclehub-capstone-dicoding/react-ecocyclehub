import { useCallback, useEffect, useState } from "react";
import { dashboardApi } from "../api/dashboard.api";
import { getApiErrorMessage } from "@/shared/lib/apiError";

export const useAdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await dashboardApi.getAdminDashboard();

      setData(res.data);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to load dashboard"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      getDashboard();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [getDashboard]);

  return {
    data,
    loading,
    error,
    refetch: getDashboard,
  };
};
