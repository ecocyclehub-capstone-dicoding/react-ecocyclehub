import { useEffect, useMemo, useState } from "react";
import { MdAdd } from "react-icons/md";

import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";

import { officerSidebar } from "@/features/dashboard/components/configs/officer.config";

import TransactionTable from "@/features/transaction/components/TransactionTable";
import TransactionCreateModal from "@/features/transaction/components/TransactionCreateModal";
import VerifyPasswordModal from "@/features/transaction/components/VerifyPasswordModal";

import Pagination from "@/shared/components/Pagination";
import SearchBar from "@/shared/components/SearchBar";
import SuccessModal from "@/shared/components/SuccessModal";

import { useFeedbackModal } from "@/shared/hooks/useFeedbackModal";

import { useCategory } from "@/entities/category/hooks/useCategory";
import { useTransaction } from "@/entities/transaction/hooks/useTransaction";
import { useUser } from "@/entities/user/hooks/useUser";

import {
  TRANSACTION_PAGE_SIZE,
  TRANSACTION_STATUS_OPTIONS,
} from "@/features/transaction/lib/transactionConstants";

const HISTORY_PAGE_SIZE = 5;

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

  const {
    categories,
    getCategories,

    isFetching: categoriesLoading,
  } = useCategory();

  const {
    users,

    getUsers,

    isFetching: usersLoading,
  } = useUser();

  const { feedback, showFeedback, closeFeedback } = useFeedbackModal();

  const [page, setPage] = useState(1);

  const [historyPage, setHistoryPage] = useState(1);

  const [status, setStatus] = useState("pending");

  const [search, setSearch] = useState("");

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [verifyModalOpen, setVerifyModalOpen] = useState(false);

  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  const [verifyError, setVerifyError] = useState("");

  const [verifyingId, setVerifyingId] = useState(null);

  const [rejectingId, setRejectingId] = useState(null);

  // =========================
  // PENDING PARAMS
  // =========================
  const pendingParams = useMemo(
    () => ({
      page,
      page_size: TRANSACTION_PAGE_SIZE,

      status: "pending",

      ...(search ? { user_name: search } : {}),

      ...(startDate ? { start_date: startDate } : {}),

      ...(endDate ? { end_date: endDate } : {}),
    }),
    [page, search, startDate, endDate],
  );

  // =========================
  // HISTORY PARAMS
  // =========================
  const historyParams = useMemo(
    () => ({
      page: historyPage,
      page_size: HISTORY_PAGE_SIZE,

      ...(status && status !== "pending" ? { status } : {}),

      ...(search ? { user_name: search } : {}),

      ...(startDate ? { start_date: startDate } : {}),

      ...(endDate ? { end_date: endDate } : {}),
    }),
    [historyPage, status, search, startDate, endDate],
  );

  const customers = useMemo(
    () => users.filter((user) => user.role?.key === "customer"),
    [users],
  );

  // =========================
  // FETCH
  // =========================
  useEffect(() => {
    getTransactions(pendingParams);
  }, [getTransactions, pendingParams]);

  useEffect(() => {
    getHistoryTransactions(historyParams);
  }, [getHistoryTransactions, historyParams]);

  useEffect(() => {
    getCategories({
      page: 1,
      page_size: 100,
    });

    getUsers({
      role: "customer",
      page: 1,
      page_size: 100,
    });
  }, [getCategories, getUsers]);

  const refreshTransactions = async () => {
    await Promise.all([
      getTransactions(pendingParams),
      getHistoryTransactions(historyParams),
    ]);
  };

  // =========================
  // FILTER
  // =========================
  const handleStatusChange = (event) => {
    setStatus(event.target.value);

    setPage(1);
    setHistoryPage(1);
  };

  // =========================
  // CREATE
  // =========================
  const handleCreate = async (payload) => {
    try {
      await createTransaction(payload, pendingParams);

      await refreshTransactions();

      setModalOpen(false);

      showFeedback(
        "Transaksi Berhasil Dibuat",
        "Transaksi setoran sampah berhasil disimpan.",
      );
    } catch {
      // handled in hook
    }
  };

  // =========================
  // VERIFY MODAL
  // =========================
  const openVerifyModal = (id) => {
    setSelectedTransactionId(id);

    setVerifyError("");

    setVerifyModalOpen(true);
  };

  const handleVerify = async (password) => {
    try {
      setVerifyError("");

      setVerifyingId(selectedTransactionId);

      await verifyTransaction(selectedTransactionId, password);

      await refreshTransactions();

      setVerifyModalOpen(false);

      showFeedback(
        "Transaksi Diverifikasi",
        "Status transaksi berhasil diperbarui.",
      );
    } catch (err) {
      setVerifyError(
        err?.response?.data?.errors?.password?.[0] || "Password tidak valid.",
      );
    } finally {
      setVerifyingId(null);
    }
  };

  // =========================
  // REJECT
  // =========================
  const handleReject = async (id) => {
    const password = window.prompt("Masukkan password akun untuk menolak transaksi:");
    if (!password) return;
    try {
      setRejectingId(id);

      await rejectTransaction(id, password);

      await refreshTransactions();

      showFeedback(
        "Transaksi Ditolak",
        "Status transaksi berhasil diperbarui.",
      );
    } catch {
      // handled in hook
    } finally {
      setRejectingId(null);
    }
  };

  return (
    <DashboardLayout
      sidebar={officerSidebar}
      title="Kelola Transaksi"
      subtitle="Buat transaksi, verifikasi transaksi pending, dan pantau seluruh aktivitas transaksi."
    >
      <div className="space-y-6">
        {/* HEADER */}
        <div className="rounded-2xl border border-[#ded6ad] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#639922]">
                Total transaksi pending
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#0d4f2c]">
                {(pagination?.count ?? transactions.length).toLocaleString(
                  "id-ID",
                )}{" "}
                Transaksi
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-gray-500">
                Verifikasi transaksi setoran sampah dan pantau aktivitas
                transaksi nasabah.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#14532d] px-6 py-3 font-semibold text-white transition hover:bg-[#0f3d22]"
            >
              <MdAdd size={18} />
              Buat Transaksi
            </button>
          </div>

          {/* FILTER */}
          <div className="mt-6 flex flex-col gap-4 xl:flex-row xl:items-end">
            <SearchBar
              placeholder="Cari nama nasabah..."
              value={search}
              onSearch={(value) => {
                setSearch(value);

                setPage(1);
                setHistoryPage(1);
              }}
            />

            <select
              value={status}
              onChange={handleStatusChange}
              className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-[#173c28] outline-none focus:border-[#14532d]"
            >
              {TRANSACTION_STATUS_OPTIONS.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={startDate}
              onChange={(event) => {
                setStartDate(event.target.value);

                setPage(1);
                setHistoryPage(1);
              }}
              className="h-12 rounded-2xl border border-gray-200 px-4 text-sm font-medium text-[#173c28] outline-none focus:border-[#14532d]"
            />

            <input
              type="date"
              value={endDate}
              onChange={(event) => {
                setEndDate(event.target.value);

                setPage(1);
                setHistoryPage(1);
              }}
              className="h-12 rounded-2xl border border-gray-200 px-4 text-sm font-medium text-[#173c28] outline-none focus:border-[#14532d]"
            />
          </div>
        </div>

        {/* PENDING */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-[#0d4f2c]">
              Transaksi Pending
            </h2>
          </div>

          {!isFetching && !error && (
            <>
              <TransactionTable
                data={transactions}
                onVerify={openVerifyModal}
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

        {/* HISTORY */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-[#0d4f2c]">
              Riwayat Semua Transaksi
            </h2>
          </div>

          {!historyLoading && !historyError && (
            <>
              <TransactionTable data={historyTransactions} />

              <Pagination
                page={historyPage}
                totalPages={historyPagination?.total_pages || 1}
                onPageChange={setHistoryPage}
              />
            </>
          )}
        </section>
      </div>

      <TransactionCreateModal
        open={modalOpen}
        customers={customers}
        categories={categories}
        fieldErrors={fieldErrors}
        loading={isMutating || categoriesLoading || usersLoading}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreate}
      />

      <VerifyPasswordModal
        open={verifyModalOpen}
        loading={verifyingId !== null}
        error={verifyError}
        onClose={() => {
          setVerifyModalOpen(false);

          setSelectedTransactionId(null);

          setVerifyError("");
        }}
        onSubmit={handleVerify}
      />

      <SuccessModal
        open={feedback.open}
        title={feedback.title}
        message={feedback.message}
        onClose={closeFeedback}
      />
    </DashboardLayout>
  );
};

export default OfficerTransactionsPage;
