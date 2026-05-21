import { useEffect, useState } from "react";

import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import StatCard from "@/features/dashboard/components/cards/StatCard";
import TransactionTable from "@/features/transaction/components/TransactionTable";
import Pagination from "@/shared/components/Pagination";

import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";

import { useDashboard } from "@/entities/dashboard/hooks/useDashboard";
import { useTransaction } from "@/entities/transaction/hooks/useTransaction";

import {
  HiUsers,
  HiDocumentText,
  HiArrowPath,
  HiCurrencyDollar,
  HiTrophy,
} from "react-icons/hi2";

const PAGE_SIZE = 5;

const AdminDashboardPage = () => {
  const { data, loading, error } = useDashboard("admin");

  const {
    transactions,
    pagination,
    isFetching: transactionsLoading,
    error: transactionsError,
    getTransactions,
    verifyTransaction,
    rejectTransaction,
  } = useTransaction();

  const [page, setPage] = useState(1);
  const [verifyingId, setVerifyingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);

  useEffect(() => {
    getTransactions({
      page,
      page_size: PAGE_SIZE,
    });
  }, [getTransactions, page]);

  const dashboard = {
    total_users: data?.total_users ?? 0,
    total_transactions: data?.total_transactions ?? 0,
    total_weight: data?.total_weight ?? 0,
    total_points: data?.total_points ?? 0,
    total_balance: data?.total_balance ?? 0,
  };

  const refreshTransactions = async () => {
    await getTransactions({
      page,
      page_size: PAGE_SIZE,
    });
  };

  const handleVerify = async (id) => {
    try {
      setVerifyingId(id);

      await verifyTransaction(id);

      await refreshTransactions();
    } finally {
      setVerifyingId(null);
    }
  };

  const handleReject = async (id) => {
    try {
      setRejectingId(id);

      await rejectTransaction(id);

      await refreshTransactions();
    } finally {
      setRejectingId(null);
    }
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
          {error}
        </div>
      )}

      {/* Stats */}
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
          value={`${dashboard.total_points || 0}`}
          icon={<HiTrophy size={24} />}
          tone="purple"
        />

        <StatCard
          title="Revenue"
          value={`Rp ${dashboard.total_balance.toLocaleString("id-ID")}`}
          icon={<HiCurrencyDollar size={24} />}
          tone="teal"
        />
      </div>

      {/* Transaction History */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-[#0d4f2c]">
            Riwayat Transaksi
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Semua transaksi terbaru dalam sistem.
          </p>
        </div>

        {transactionsError && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-700">
            {transactionsError}
          </div>
        )}

        {transactionsLoading ? (
          <div className="rounded-2xl bg-white p-6 text-sm font-medium text-gray-500 shadow-sm">
            Loading...
          </div>
        ) : (
          <>
            <TransactionTable
              data={transactions}
              onVerify={handleVerify}
              onReject={handleReject}
              verifyingId={verifyingId}
              rejectingId={rejectingId}
            />

            <Pagination
              page={page}
              totalPages={pagination?.total_pages || 1}
              onPageChange={setPage}
            />
          </>
        )}
      </section>
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
