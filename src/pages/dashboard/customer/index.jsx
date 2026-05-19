import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import CustomerLevelCard from "@/features/dashboard/components/cards/CustomerLevelCard";
import StatCard from "@/features/dashboard/components/cards/StatCard";
import SectionWrapper from "@/features/dashboard/components/common/SectionWrapper";
import CustomerTransactionList from "@/features/dashboard/components/sections/CustomerTransactionList";
import { customerSidebar } from "@/features/dashboard/components/configs/customer.config";
import { useDashboard } from "@/entities/dashboard/hooks/useDashboard";
import { useGamification } from "@/entities/gamification/hooks/useGamification";
import { formatCurrency, formatNumber } from "@/shared/lib/formatters";
import { useAuthContext } from "@/app/provider/AuthContext";
import { MdAccountBalanceWallet, MdReceiptLong, MdStars } from "react-icons/md";

const CustomerDashboardPage = () => {
  const { user } = useAuthContext();
  const { data, loading, error } = useDashboard("customer");
  const { levels } = useGamification();

  const dashboard = {
    total_points: data?.total_points ?? 0,
    total_balance: data?.total_balance ?? 0,
    total_transactions: data?.total_transactions ?? 0,
    recent_transactions: data?.recent_transactions ?? [],
  };

  return (
    <DashboardLayout
      sidebar={customerSidebar}
      title={`Halo, ${user?.name || "Nasabah"}`}
      subtitle="Pantau poin, saldo, level, dan transaksi setoran sampahmu."
    >
      <div className="space-y-6">
        {error && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-700">
            {error}
          </div>
        )}

        <CustomerLevelCard
          points={dashboard.total_points}
          balance={dashboard.total_balance}
          levels={levels}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Total Poin"
            value={loading ? "..." : formatNumber(dashboard.total_points)}
            icon={<MdStars size={24} />}
            tone="green"
          />
          <StatCard
            title="Saldo Tabungan"
            value={loading ? "..." : formatCurrency(dashboard.total_balance)}
            icon={<MdAccountBalanceWallet size={24} />}
            tone="teal"
          />
          <StatCard
            title="Total Transaksi"
            value={loading ? "..." : formatNumber(dashboard.total_transactions)}
            icon={<MdReceiptLong size={24} />}
            tone="blue"
          />
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-6 text-sm font-medium text-gray-500">
            Loading...
          </div>
        ) : (
          <CustomerTransactionList
            items={dashboard.recent_transactions}
            compact
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboardPage;
