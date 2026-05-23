import { useEffect, useState } from "react";

import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";

import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";

import TransactionTable from "@/features/transaction/components/TransactionTable";

import Pagination from "@/shared/components/Pagination";

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

  const [verifyingId, setVerifyingId] = useState(null);

  const [rejectingId, setRejectingId] = useState(null);

  useEffect(() => {
    getTransactions({
      page,
      page_size: TRANSACTION_PAGE_SIZE,
      ...(status ? { status } : {}),
    });
  }, [getTransactions, page, status]);

  const refreshTransactions = async () => {
    await getTransactions({
      page,
      page_size: TRANSACTION_PAGE_SIZE,
      ...(status ? { status } : {}),
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

  const handleStatusChange = (event) => {
    setStatus(event.target.value);

    setPage(1);
  };

  return (
    <DashboardLayout
      sidebar={adminSidebar}
      title="Manajemen Transaksi"
      subtitle="Data transaksi."
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-[#ded6ad] bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#639922]">
              Total transaksi
            </p>

            <h1 className="mt-1 text-3xl font-bold text-[#0d4f2c]">
              {(pagination?.count ?? transactions.length).toLocaleString(
                "id-ID",
              )}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Menampilkan {transactions.length} data per halaman dari server.
            </p>
          </div>

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
            {transactions.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#ded6ad] bg-white py-10 text-center text-sm font-medium text-gray-500 shadow-sm">
                No transactions found.
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
