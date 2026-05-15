import { useEffect, useState } from "react";

import { useUser } from "@/entities/user/hooks/useUser";
import { useTransaction } from "@/entities/transaction/hooks/useTransaction";

export const useAdminDashboard = () => {
  const { users, getUsers } = useUser();

  const { transactions, getTransactions } = useTransaction();

  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalTransactions: 0,
    totalWaste: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    getUsers();
    getTransactions();
  }, []);

  useEffect(() => {
    const totalCustomers = users.filter(
      (user) => user.role?.key === "customer",
    ).length;

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

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return {
    stats,
    recentTransactions,
  };
};
