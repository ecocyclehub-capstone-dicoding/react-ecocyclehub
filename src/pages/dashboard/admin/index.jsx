import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import StatCard from "@/features/dashboard/components/cards/StatCard";
import SectionWrapper from "@/features/dashboard/components/common/SectionWrapper";
import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";
import { useAdminDashboard } from "@/entities/dashboard/hooks/useAdminDashboard";
import {
  HiUsers,
  HiDocumentText,
  HiArrowPath,
  HiCurrencyDollar,
  HiTrophy,
} from "react-icons/hi2";

const AdminDashboardPage = () => {
  const { data, loading, error } = useAdminDashboard();
  const dashboard = data || {
    total_users: 124,
    total_transactions: 538,
    total_weight: 2840.5,
    total_points: 284050,
    total_balance: 5680000,
  };

  if (loading) {
    return (
      <DashboardLayout
        sidebar={adminSidebar}
        title="Dashboard Admin"
        subtitle="Ringkasan operasional Ecocycle Hub"
      >
        <div className="rounded-2xl bg-white p-6 shadow-sm">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      sidebar={adminSidebar}
      title="Dashboard Admin"
      subtitle="Pantau pengguna, transaksi, saldo, dan kategori sampah."
    >
      {error && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
          {error}. Menampilkan data contoh sementara.
        </div>
      )}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total Users"
          value={dashboard.total_users || 0}
          icon={<HiUsers size={24} />}
          tone="blue"
        />

        <StatCard
          title="Transactions"
          value={dashboard.total_transactions || 0}
          icon={<HiDocumentText size={24} />}
          tone="green"
        />

        <StatCard
          title="Waste Volume"
          value={`${dashboard.total_weight || 0} kg`}
          icon={<HiArrowPath size={24} />}
          tone="amber"
        />

        <StatCard
          title="Points"
          value={`${dashboard.total_points || 0} kg`}
          icon={<HiTrophy size={24} />}
          tone="purple"
        />

        <StatCard
          title="Revenue"
          value={`Rp ${dashboard.total_balance.toLocaleString("id-ID") || 0}`}
          icon={<HiCurrencyDollar size={24} />}
          tone="teal"
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
