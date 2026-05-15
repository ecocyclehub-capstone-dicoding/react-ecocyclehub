import React from "react";

/* ── Status badge config ── */
const STATUS_STYLES = {
  completed: {
    bg: "bg-[var(--color-secondary-container)]",
    text: "text-[var(--color-on-secondary-container)]",
  },
  pending: {
    bg: "bg-[var(--color-surface-variant)]",
    text: "text-[var(--color-on-surface-variant)]",
  },
  verified: {
    bg: "bg-[var(--color-primary-container)]",
    text: "text-[var(--color-on-primary)]",
  },
};

const StatusBadge = ({ status }) => {
  const { bg, text } = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  return (
    <span
      className={`inline-flex items-center py-1 px-3 rounded-full text-xs font-medium ${bg} ${text}`}
    >
      {status}
    </span>
  );
};

/* ── Table header ── */
const TH = ({ children, className = "" }) => (
  <th
    className={`pb-4 font-medium px-4 text-[var(--color-outline)] text-sm ${className}`}
  >
    {children}
  </th>
);

/* ── Table row ── */
const TransactionRow = ({ tx }) => {
  const isCompleted = tx.status === "completed";

  return (
    <tr className="group hover:bg-[var(--color-surface-container-lowest)] transition-colors border-b border-[var(--color-outline-variant)]/10 h-[72px]">
      {/* Date */}
      <td className="py-5 px-4 text-[var(--color-on-surface-variant)] whitespace-nowrap text-xs">
        {tx.date}
      </td>

      {/* Transaction ID */}
      <td className="py-5 px-4 font-mono text-xs text-[var(--color-primary)] whitespace-nowrap">
        {tx.id}
      </td>

      {/* Weight */}
      <td className="py-5 px-4 text-right font-medium text-[var(--color-on-surface-variant)]">
        {tx.weight} kg
      </td>

      {/* Points */}
      <td className="py-5 px-4 text-right text-[var(--color-on-surface-variant)]">
        {tx.points.toLocaleString("id-ID")}
      </td>

      {/* Value */}
      <td className="py-5 px-4 text-right text-[var(--color-on-surface-variant)]">
        {tx.value.toLocaleString("id-ID")}
      </td>

      {/* Status */}
      <td className="py-5 px-4 text-center">
        <StatusBadge status={tx.status} />
      </td>

      {/* Actions */}
      <td className="py-5 px-4 text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-2">
          {isCompleted && (
            <button className="px-4 py-1.5 text-xs font-bold bg-[var(--color-secondary)] text-[var(--color-on-secondary)] rounded-lg hover:opacity-90 transition-all active:scale-95 shadow-sm">
              Verify
            </button>
          )}
          <button className="text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors p-1">
            <span className="material-symbols-outlined text-xl">more_vert</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

/* ── Pagination ── */
const Pagination = ({ currentPage, totalPages, onPageChange, totalShown, totalRecords }) => {
  const pages = Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1);

  return (
    <div className="mt-8 flex justify-between items-center text-sm text-[var(--color-outline)]">
      <span>
        Showing {totalShown} of {totalRecords} records
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--color-surface-container-highest)] transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-sm">chevron_left</span>
        </button>

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={[
              "w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors",
              p === currentPage
                ? "bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)]"
                : "hover:bg-[var(--color-surface-container-highest)]",
            ].join(" ")}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--color-surface-container-highest)] transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-sm">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

/* ── Main export ── */
const TransactionTable = ({
  transactions = [],
  currentPage = 1,
  totalPages = 1,
  totalRecords = 0,
  onPageChange = () => {},
  onFilter = () => {},
}) => {
  return (
    <div className="bg-[var(--color-surface-container-low)] rounded-xl p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-[var(--font-headline)] text-xl font-bold text-[var(--color-on-surface)]">
          Transaction Records
        </h2>
        <button
          onClick={onFilter}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-surface-container-highest)] text-[var(--color-primary)] font-medium rounded-lg hover:bg-[var(--color-primary-container)]/10 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">filter_list</span>
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-outline-variant)]/15">
              <TH>Date</TH>
              <TH>Transaction ID</TH>
              <TH className="text-right">Weight (kg)</TH>
              <TH className="text-right">Points</TH>
              <TH className="text-right">Value (Rp)</TH>
              <TH className="text-center">Status</TH>
              <TH />
            </tr>
          </thead>
          <tbody className="text-sm">
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-16 text-center text-[var(--color-on-surface-variant)]"
                >
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((tx) => <TransactionRow key={tx.id} tx={tx} />)
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        totalShown={transactions.length}
        totalRecords={totalRecords}
      />
    </div>
  );
};

export default TransactionTable;
