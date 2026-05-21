import { useEffect, useState } from "react";
import {
  MdAssignmentTurnedIn,
  MdChecklist,
  MdPendingActions,
} from "react-icons/md";

import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import StatCard from "@/features/dashboard/components/cards/StatCard";
import TransactionTable from "@/features/transaction/components/TransactionTable";
import Pagination from "@/shared/components/Pagination";

import { officerSidebar } from "@/features/dashboard/components/configs/officer.config";

import { useDashboard } from "@/entities/dashboard/hooks/useDashboard";
import { useTransaction } from "@/entities/transaction/hooks/useTransaction";

import { formatNumber } from "@/shared/lib/formatters";

const PAGE_SIZE = 5;

const OfficerDashboardPage = () => {
  const { data, loading, error } = useDashboard("officer");

  const {
    transactions,
    pagination,
    isFetching: transactionsLoading,
    error: transactionsError,
    getTransactions,
    verifyTransaction,
    rejectTransaction,
  } = useTransaction();

  const [pendingPage, setPendingPage] = useState(1);
  const [verifyingId, setVerifyingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);

  useEffect(() => {
    getTransactions({
      status: "pending",
      page: pendingPage,
      page_size: PAGE_SIZE,
    });
  }, [getTransactions, pendingPage]);

  const dashboard = {
    pending_transactions: data?.pending_transactions ?? 0,
    verified_today: data?.verified_today ?? 0,
    handled_by_me: data?.handled_by_me ?? 0,
  };

  const handleVerify = async (id) => {
    try {
      setVerifyingId(id);

      await verifyTransaction(id);

      await getTransactions({
        status: "pending",
        page: pendingPage,
        page_size: PAGE_SIZE,
      });
    } catch {
      // Error state is handled inside useTransaction
    } finally {
      setVerifyingId(null);
    }
  };

  const handleReject = async (id) => {
    try {
      setRejectingId(id);
      await rejectTransaction(id);
      await getTransactions({
        status: "pending",
        page: pendingPage,
        page_size: PAGE_SIZE,
      });
    } catch {
      // Error state is handled inside useTransaction
    } finally {
      setRejectingId(null);
    }
  };

  return (
    <DashboardLayout
      sidebar={officerSidebar}
      title="Dashboard Petugas"
      subtitle="Pantau transaksi yang perlu diverifikasi dan setoran yang kamu tangani."
    >
      <div className="space-y-6">
        {error && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 ">
          <StatCard
            title="Menunggu Verifikasi"
            value={
              loading ? "..." : formatNumber(dashboard.pending_transactions)
            }
            icon={<MdPendingActions size={24} />}
            tone="amber"
          />

          <StatCard
            title="Diverifikasi Hari Ini"
            value={loading ? "..." : formatNumber(dashboard.verified_today)}
            icon={<MdAssignmentTurnedIn size={24} />}
            tone="green"
          />

          <StatCard
            title="Ditangani Saya"
            value={loading ? "..." : formatNumber(dashboard.handled_by_me)}
            icon={<MdChecklist size={24} />}
            tone="blue"
          />
        </div>

        {/* Pending Transactions */}
        <section className="space-y-4 ">
          <div>
            <h2 className="text-xl font-bold text-[#0d4f2c]">
              Transaksi Menunggu Verifikasi
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Verifikasi transaksi pending langsung dari daftar ini.
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
            !transactionsError && (
              <>
                <TransactionTable
                  data={transactions}
                  onVerify={handleVerify}
                  onReject={handleReject}
                  verifyingId={verifyingId}
                  rejectingId={rejectingId}
                />

                <Pagination
                  page={pendingPage}
                  totalPages={pagination?.total_pages || 1}
                  onPageChange={setPendingPage}
                />
              </>
            )
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default OfficerDashboardPage;
