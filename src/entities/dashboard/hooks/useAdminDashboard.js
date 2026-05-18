import { useEffect, useMemo, useState } from "react";
import { useUser } from "@/entities/user/hooks/useUser";
import { useTransaction } from "@/entities/transaction/hooks/useTransaction";
import { dashboardApi } from "../api/dashboard.api";

export const useAdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await dashboardApi.getAdminDashboard();

      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: getDashboard,
  };
};
