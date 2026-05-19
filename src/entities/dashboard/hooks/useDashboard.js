import { useCallback, useEffect, useState } from "react";
import { dashboardApi } from "../api/dashboard.api";
import { getApiErrorMessage } from "@/shared/lib/apiError";

const dashboardRequest = {
  admin: dashboardApi.getAdminDashboard,
  officer: dashboardApi.getOfficerDashboard,
  customer: dashboardApi.getCustomerDashboard,
};

export const useDashboard = (role) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDashboard = useCallback(async () => {
    const request = dashboardRequest[role];

    if (!request) {
      setLoading(false);
      setError("Invalid dashboard role");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await request();

      setData(res.data);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to load dashboard"));
    } finally {
      setLoading(false);
    }
  }, [role]);

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
