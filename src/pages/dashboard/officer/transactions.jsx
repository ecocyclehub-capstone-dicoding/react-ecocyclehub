import { useEffect, useMemo, useState } from "react";
import { MdAdd } from "react-icons/md";

import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import { officerSidebar } from "@/features/dashboard/components/configs/officer.config";
import TransactionTable from "@/features/transaction/components/TransactionTable";
import TransactionCreateModal from "@/features/transaction/components/TransactionCreateModal";
import Pagination from "@/shared/components/Pagination";
import SuccessModal from "@/shared/components/SuccessModal";
import { useFeedbackModal } from "@/shared/hooks/useFeedbackModal";
import { useCategory } from "@/entities/category/hooks/useCategory";
import { useTransaction } from "@/entities/transaction/hooks/useTransaction";
import { useUser } from "@/entities/user/hooks/useUser";
import {
  TRANSACTION_PAGE_SIZE,
  TRANSACTION_STATUS_OPTIONS,
} from "@/features/transaction/lib/transactionConstants";

const PAGE_SIZE = 5;

const OfficerTransactionsPage = () => {
  const {
    transactions,
    pagination,
    isFetching,
    isMutating,
    error,
    fieldErrors,
    getTransactions,
    createTransaction,
    verifyTransaction,
    rejectTransaction,
  } = useTransaction();

  const {
    transactions: historyTransactions,
    pagination: historyPagination,
    isFetching: historyLoading,
    error: historyError,
    getTransactions: getHistoryTransactions,
  } = useTransaction();

  const { categories } = useCategory();
  const { users } = useUser();
  const { feedback, showFeedback, closeFeedback } = useFeedbackModal();

  const [historyPage, setHistoryPage] = useState(1);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("pending");
  const [modalOpen, setModalOpen] = useState(false);
  const [verifyingId, setVerifyingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);

  const params = useMemo(
    () => ({
      page,
      page_size: TRANSACTION_PAGE_SIZE,
      ...(status ? { status } : {}),
    }),
    [page, status],
  );

  const customers = useMemo(
    () => users.filter((user) => user.role?.key === "customer"),
    [users],
  );

  useEffect(() => {
    getTransactions(params);
  }, [getTransactions, params]);

  useEffect(() => {
    getHistoryTransactions({
      page: historyPage,
      page_size: PAGE_SIZE,
    });
  }, [getHistoryTransactions, historyPage]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const handleCreate = async (payload) => {
    await createTransaction(payload, params);
    setModalOpen(false);
    showFeedback("Transaksi Dibuat", "Transaksi berhasil disimpan.");
  };

  const handleVerify = async (id) => {
    try {
      setVerifyingId(id);
      await verifyTransaction(id);
      await getTransactions(params);

      await getHistoryTransactions({
        page: historyPage,
        page_size: PAGE_SIZE,
      });

      showFeedback("Transaksi Diverifikasi", "Status transaksi diperbarui.");
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
      await getTransactions(params);
      await getHistoryTransactions({
        page: historyPage,
        page_size: PAGE_SIZE,
      });

      showFeedback(
        "Transaksi Ditolak",
        "Status transaksi berhasil diperbarui.",
      );
    } catch {
      // Error state is handled inside useTransaction
    } finally {
      setRejectingId(null);
    }
  };

  return (
    <DashboardLayout
      sidebar={officerSidebar}
      title="Kelola Transaksi"
      subtitle="Buat transaksi setoran sampah dan verifikasi transaksi pending."
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-[#ded6ad] bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#639922]">
              Total transaksi
            </p>
            <h2 className="mt-1 text-3xl font-bold text-[#0d4f2c]">
              {(pagination?.count ?? transactions.length).toLocaleString(
                "id-ID",
              )}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Gunakan filter status untuk memprioritaskan transaksi pending.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={status}
              onChange={handleStatusChange}
              className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-[#173c28] outline-none focus:border-[#14532d]"
            >
              {TRANSACTION_STATUS_OPTIONS.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#14532d] px-6 py-3 font-semibold text-white transition hover:bg-[#0f3d22]"
            >
              <MdAdd size={18} />
              Buat Transaksi
            </button>
          </div>
        </div>

        {isFetching && (
          <div className="rounded-2xl bg-white p-6 text-sm font-medium text-gray-500 shadow-sm">
            Loading...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {!isFetching && !error && (
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
      </div>

      <TransactionCreateModal
        open={modalOpen}
        customers={customers}
        categories={categories}
        fieldErrors={fieldErrors}
        loading={isMutating}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreate}
      />

      <SuccessModal
        open={feedback.open}
        title={feedback.title}
        message={feedback.message}
        onClose={closeFeedback}
      />

      {/* History Transactions */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-[#0d4f2c]">
            Riwayat Semua Transaksi
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Semua transaksi dari seluruh status.
          </p>
        </div>

        {historyError && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-700">
            {historyError}
          </div>
        )}

        {historyLoading ? (
          <div className="rounded-2xl bg-white p-6 text-sm font-medium text-gray-500 shadow-sm">
            Loading...
          </div>
        ) : (
          !historyError && (
            <>
              <TransactionTable data={historyTransactions} />

              <Pagination
                page={historyPage}
                totalPages={historyPagination?.total_pages || 1}
                onPageChange={setHistoryPage}
              />
            </>
          )
        )}
      </section>
    </DashboardLayout>
  );
};

export default OfficerTransactionsPage;
