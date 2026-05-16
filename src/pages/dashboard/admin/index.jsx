import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";

import StatCard from "@/features/dashboard/components/cards/StatCard";

import SectionWrapper from "@/features/dashboard/components/common/SectionWrapper";

import RecentTransactionTable from "@/features/dashboard/components/sections/RecentTransactionTable";

import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";

import { buildSidebar } from "@/features/dashboard/lib/buildSidebar";

import { useAdminDashboard } from "@/entities/dashboard/hooks/useAdminDashboard";

import {
  HiUsers,
  HiDocumentText,
  HiArrowPath,
  HiCurrencyDollar,
} from "react-icons/hi2";
import { useAuthContext } from "@/app/provider/AuthProvider";

const AdminDashboardPage = () => {
  const { user } = useAuthContext();

  const sidebar = buildSidebar(adminSidebar, user);

  const { data, loading, error } = useAdminDashboard();

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
          title="Total Users"
          value={data?.total_users || 0}
          icon={<HiUsers size={24} />}
        />

        <StatCard
          title="Transactions"
          value={data?.total_transactions || 0}
          icon={<HiDocumentText size={24} />}
        />

        <StatCard
          title="Waste Volume"
          value={`${data?.total_weight || 0} kg`}
          icon={<HiArrowPath size={24} />}
        />

        <StatCard
          title="Revenue"
          value={`Rp ${data?.total_balance || 0}`}
          icon={<HiCurrencyDollar size={24} />}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
