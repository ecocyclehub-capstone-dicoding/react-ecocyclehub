import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";

import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";

import TransactionTable from "@/features/transaction/components/TransactionTable";

import Pagination from "@/shared/components/Pagination";
import SearchBar from "@/shared/components/SearchBar";

import { useTransaction } from "@/entities/transaction/hooks/useTransaction";

import {
  TRANSACTION_PAGE_SIZE,
  TRANSACTION_STATUS_OPTIONS,
} from "@/features/transaction/lib/transactionConstants";

const AdminTransactionsPage = () => {
  const {
    transactions,
    pagination,

    isFetching,
    error,

    getTransactions,

    verifyTransaction,
    rejectTransaction,
  } = useTransaction();

  const [page, setPage] = useState(1);

  const [status, setStatus] = useState("");

  const [searchUser, setSearchUser] = useState("");

  const [handledBy, setHandledBy] = useState("");
  const [verifiedBy, setVerifiedBy] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [verifyingId, setVerifyingId] = useState(null);

  const [rejectingId, setRejectingId] = useState(null);

  const params = useMemo(
    () => ({
      page,
      page_size: TRANSACTION_PAGE_SIZE,

      ...(status ? { status } : {}),

      ...(searchUser ? { user_name: searchUser } : {}),

      ...(handledBy ? { handled_by: handledBy } : {}),
      ...(verifiedBy ? { verified_by: verifiedBy } : {}),

      ...(startDate ? { start_date: startDate } : {}),
      ...(endDate ? { end_date: endDate } : {}),
    }),
    [page, status, searchUser, handledBy, verifiedBy, startDate, endDate],
  );

  useEffect(() => {
    getTransactions(params);
  }, [getTransactions, params]);

  const refreshTransactions = async () => {
    await getTransactions(params);
  };

  const handleVerify = async (id) => {
    try {
      setVerifyingId(id);

      await verifyTransaction(id);

      await refreshTransactions();
    } catch {
      // Error handled in hook
    } finally {
      setVerifyingId(null);
    }
  };

  const handleReject = async (id) => {
    const password = window.prompt("Masukkan password akun untuk menolak transaksi:");
    if (!password) return;
    try {
      setRejectingId(id);

      await rejectTransaction(id, password);

      await refreshTransactions();
    } catch {
      // Error handled in hook
    } finally {
      setRejectingId(null);
    }
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);

    setPage(1);
  };

  return (
    <DashboardLayout
      sidebar={adminSidebar}
      title="Manajemen Transaksi"
      subtitle="Kelola dan monitor seluruh transaksi EcoCycle Hub."
    >
      <div className="space-y-6">
        {/* HEADER */}
        <div className="rounded-2xl border border-[#ded6ad] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#639922]">
                Total transaksi
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#0d4f2c]">
                {(pagination?.count || 0).toLocaleString("id-ID")}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Filter transaksi berdasarkan status, user, petugas, dan tanggal.
              </p>
            </div>
          </div>

          {/* FILTER */}
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <SearchBar
              placeholder="Cari nama user..."
              value={searchUser}
              onSearch={(value) => {
                setSearchUser(value);
                setPage(1);
              }}
            />

            <input
              type="text"
              value={handledBy}
              onChange={(event) => {
                setHandledBy(event.target.value);
                setPage(1);
              }}
              placeholder="Handled by..."
              className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-[#173c28] outline-none transition focus:border-[#14532d]"
            />

            <input
              type="text"
              value={verifiedBy}
              onChange={(event) => {
                setVerifiedBy(event.target.value);
                setPage(1);
              }}
              placeholder="Verified by..."
              className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-[#173c28] outline-none transition focus:border-[#14532d]"
            />

            <select
              value={status}
              onChange={handleStatusChange}
              className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-[#173c28] outline-none transition focus:border-[#14532d]"
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
              }}
              className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-[#173c28] outline-none transition focus:border-[#14532d]"
            />

            <input
              type="date"
              value={endDate}
              onChange={(event) => {
                setEndDate(event.target.value);
                setPage(1);
              }}
              className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-[#173c28] outline-none transition focus:border-[#14532d]"
            />
          </div>
        </div>

        {/* LOADING */}
        {isFetching && (
          <div className="rounded-2xl bg-white p-6 text-sm font-medium text-gray-500 shadow-sm">
            Loading...
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* TABLE */}
        {!isFetching && !error && (
          <>
            {transactions.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#ded6ad] bg-white py-10 text-center text-sm font-medium text-gray-500 shadow-sm">
                Tidak ada transaksi ditemukan.
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
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminTransactionsPage;
