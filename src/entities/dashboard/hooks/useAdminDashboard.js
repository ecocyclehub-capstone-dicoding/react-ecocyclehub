import { useEffect, useMemo, useState } from "react";

import { useUser } from "@/entities/user/hooks/useUser";
import { useTransaction } from "@/entities/transaction/hooks/useTransaction";

export const useAdminDashboard = () => {
  const { users, getUsers } = useUser();
  const { transactions, getTransactions } = useTransaction();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalTransactions: 0,
    totalWaste: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    Promise.all([getUsers(), getTransactions()])
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [getUsers, getTransactions]);

  useEffect(() => {
    const totalCustomers = users.filter((user) => {
      const role = typeof user.role === "string" ? user.role : user.role?.key;
      return role?.toLowerCase() === "customer";
    }).length;

    const totalTransactions = transactions.length;

    const totalWaste = transactions.reduce(
      (acc, item) => acc + Number(item.total_weight || 0),
      0,
    );

    const totalRevenue = transactions.reduce(
      (acc, item) => acc + Number(item.total_price || 0),
      0,
    );

    setStats({
      totalCustomers,
      totalTransactions,
      totalWaste,
      totalRevenue,
    });
  }, [users, transactions]);

  const recentTransactions = useMemo(
    () =>
      [...transactions]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5),
    [transactions],
  );

  return {
    stats,
    recentTransactions,
    loading,
    error,
  };
};
