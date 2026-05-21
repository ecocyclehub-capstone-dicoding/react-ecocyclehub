import { useEffect, useState } from "react";

import {
  MdAccountBalanceWallet,
  MdAdd,
  MdReceiptLong,
  MdStars,
} from "react-icons/md";

import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";

import CustomerLevelCard from "@/features/dashboard/components/cards/CustomerLevelCard";
import StatCard from "@/features/dashboard/components/cards/StatCard";

import TransactionTable from "@/features/transaction/components/TransactionTable";
import TransactionCreateModal from "@/features/transaction/components/TransactionCreateModal";

import { customerSidebar } from "@/features/dashboard/components/configs/customer.config";

import { useDashboard } from "@/entities/dashboard/hooks/useDashboard";
import { useTransaction } from "@/entities/transaction/hooks/useTransaction";
import { useCategory } from "@/entities/category/hooks/useCategory";

import { formatCurrency, formatNumber } from "@/shared/lib/formatters";

import { useAuthContext } from "@/app/provider/AuthContext";

const CustomerDashboardPage = () => {
  const { user } = useAuthContext();

  const { data, loading, error } = useDashboard("customer");

  const { categories } = useCategory();

  const {
    transactions,
    isFetching: transactionsLoading,
    isMutating,
    fieldErrors,
    getTransactionHistory,
    createTransaction,
  } = useTransaction();

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getTransactionHistory();
  }, [getTransactionHistory]);

  const dashboard = {
    total_points: data?.total_points ?? 0,
    total_balance: data?.total_balance ?? 0,
    total_transactions: data?.total_transactions ?? 0,
  };

  const recentTransactions = transactions.slice(0, 3);

  const handleCreate = async (payload) => {
    await createTransaction(payload);

    setModalOpen(false);

    await getTransactionHistory();
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
          level={data?.level}
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

        <div className="rounded-2xl border border-[#ded6ad] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#639922]">
                Setor Sampah Baru
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#0d4f2c]">
                Buat Transaksi
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Tambahkan jenis sampah dan berat untuk mendapatkan poin.
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#14532d] px-6 py-3 font-semibold text-white transition hover:bg-[#0f3d22]"
            >
              <MdAdd size={18} />
              Tambah Setoran
            </button>
          </div>
        </div>

        {loading || transactionsLoading ? (
          <div className="rounded-2xl bg-white p-6 text-sm font-medium text-gray-500">
            Loading...
          </div>
        ) : (
          <TransactionTable data={recentTransactions} audience="customer" />
        )}
      </div>

      <TransactionCreateModal
        open={modalOpen}
        audience="customer"
        categories={categories}
        fieldErrors={fieldErrors}
        loading={isMutating}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreate}
      />
    </DashboardLayout>
  );
};

export default CustomerDashboardPage;
