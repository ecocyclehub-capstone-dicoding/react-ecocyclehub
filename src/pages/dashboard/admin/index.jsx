import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";

import StatCard from "@/features/dashboard/components/cards/StatCard";

import SectionWrapper from "@/features/dashboard/components/common/SectionWrapper";

import RecentTransactionTable from "@/features/dashboard/components/sections/RecentTransactionTable";

import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";

import { buildSidebar } from "@/features/dashboard/lib/buildSidebar";

import { useAdminDashboard } from "@/entities/dashboard/hooks/useAdminDashboard";

import { useAuth } from "@/entities/auth/hooks/useAuth";

import {
  HiUsers,
  HiDocumentText,
  HiArrowPath,
  HiCurrencyDollar,
} from "react-icons/hi2";

const AdminDashboardPage = () => {
  const { user } = useAuth();

  const sidebar = buildSidebar(adminSidebar, user);

  const { stats, transactions, loading, error } = useAdminDashboard();

  if (loading) {
    return (
      <DashboardLayout sidebar={sidebar}>
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          Loading dashboard...
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout sidebar={sidebar}>
        <div className="bg-white rounded-3xl p-6 shadow-sm text-red-500">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      sidebar={sidebar}
      title="Admin Dashboard"
      subtitle="Operational Overview"
    >
      {/* STATS */}
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Customers"
          value={stats?.totalCustomers || 0}
          icon={<HiUsers size={24} />}
        />

        <StatCard
          title="Transactions"
          value={stats?.totalTransactions || 0}
          icon={<HiDocumentText size={24} />}
        />

        <StatCard
          title="Waste Volume"
          value={`${stats?.totalWeight || 0} kg`}
          icon={<HiArrowPath size={24} />}
        />

        <StatCard
          title="Revenue"
          value={`Rp ${stats?.totalRevenue || 0}`}
          icon={<HiCurrencyDollar size={24} />}
          dark
        />
      </div>

      {/* RECENT TRANSACTIONS */}
      <SectionWrapper title="Recent Transactions" action="View All">
        <RecentTransactionTable items={transactions} />
      </SectionWrapper>
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
