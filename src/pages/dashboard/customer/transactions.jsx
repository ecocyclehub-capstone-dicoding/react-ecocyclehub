import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";

import { customerSidebar } from "@/features/dashboard/components/configs/customer.config";

import TransactionTable from "@/features/transaction/components/TransactionTable";

import { useTransaction } from "@/entities/transaction/hooks/useTransaction";

const CustomerTransactionsPage = () => {
  const {
    transactions,

    isFetching,

    error,

    getTransactionHistory,
  } = useTransaction();

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  const params = useMemo(
    () => ({
      ...(startDate ? { start_date: startDate } : {}),
      ...(endDate ? { end_date: endDate } : {}),
    }),
    [startDate, endDate],
  );

  useEffect(() => {
    getTransactionHistory(params);
  }, [getTransactionHistory, params]);

  return (
    <DashboardLayout
      sidebar={customerSidebar}
      title="Riwayat Transaksi"
      subtitle="Lihat status, poin, saldo, dan detail transaksi setoran sampah milikmu."
    >
      <div className="space-y-6">
        {/* HEADER */}
        <div className="rounded-2xl border border-[#ded6ad] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#639922]">
                Total transaksi
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#0d4f2c]">
                {transactions.length.toLocaleString("id-ID")} Transaksi
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Seluruh riwayat transaksi setoran sampah yang pernah kamu
                lakukan.
              </p>
            </div>

            {/* FILTER DATE */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500">
                  Dari Tanggal
                </label>

                <input
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  className="h-12 rounded-2xl border border-gray-200 px-4 text-sm font-medium text-[#173c28] outline-none focus:border-[#14532d]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500">
                  Sampai Tanggal
                </label>

                <input
                  type="date"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                  className="h-12 rounded-2xl border border-gray-200 px-4 text-sm font-medium text-[#173c28] outline-none focus:border-[#14532d]"
                />
              </div>
            </div>
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
                Belum ada transaksi.
              </div>
            ) : (
              <TransactionTable data={transactions} audience="customer" />
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CustomerTransactionsPage;
