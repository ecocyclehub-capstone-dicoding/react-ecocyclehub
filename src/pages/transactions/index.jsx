import React, { useState } from "react";
import MainLayout from "@/shared/layouts/MainLayout";
import { SummaryCards, TransactionTable } from "@/features/transactions/components";

/* ── Sample data (replace with API call) ── */
const SAMPLE_TRANSACTIONS = [
  {
    id: "550e8400-e29b",
    date: "2023-10-27 10:00",
    weight: 12.5,
    points: 1250,
    value: 62500,
    status: "completed",
  },
  {
    id: "7c9e6679-7425",
    date: "2023-10-26 14:30",
    weight: 8.0,
    points: 800,
    value: 40000,
    status: "pending",
  },
  {
    id: "d3b329bc-bd0e",
    date: "2023-10-25 09:15",
    weight: 25.0,
    points: 2500,
    value: 125000,
    status: "verified",
  },
];

const TOTAL_RECORDS = 48;
const PAGE_SIZE = 3;

const TransactionsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  /* Derived summary stats */
  const stats = {
    totalWeight: SAMPLE_TRANSACTIONS.reduce((s, t) => s + t.weight, 0).toFixed(1),
    totalPoints: SAMPLE_TRANSACTIONS.reduce((s, t) => s + t.points, 0).toLocaleString("id-ID"),
    economicValue:
      "Rp " +
      SAMPLE_TRANSACTIONS.reduce((s, t) => s + t.value, 0).toLocaleString("id-ID"),
  };

  const totalPages = Math.ceil(TOTAL_RECORDS / PAGE_SIZE);

  return (
    <MainLayout>
      <div className="flex-1 p-8 pb-24 max-w-7xl mx-auto w-full">
        {/* ── Page Header ── */}
        <div className="mb-12 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="font-[var(--font-headline)] text-4xl font-extrabold text-[var(--color-on-background)] tracking-tight">
              Transaction History
            </h1>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-[var(--color-primary)] text-[var(--color-on-primary)] font-semibold rounded-lg hover:bg-[var(--color-primary-container)] transition-all duration-200 active:scale-95 shadow-md shadow-[var(--color-primary)]/10">
              <span className="material-symbols-outlined text-lg">add_circle</span>
              Record New Transaction
            </button>
          </div>
          <p className="text-[var(--color-on-surface-variant)] text-base">
            Review and manage your curated resource deposits.
          </p>
        </div>

        {/* ── Summary Cards ── */}
        <SummaryCards stats={stats} />

        {/* ── Transaction Table ── */}
        <TransactionTable
          transactions={SAMPLE_TRANSACTIONS}
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={TOTAL_RECORDS}
          onPageChange={setCurrentPage}
          onFilter={() => alert("Filter coming soon!")}
        />
      </div>
    </MainLayout>
  );
};

export default TransactionsPage;
