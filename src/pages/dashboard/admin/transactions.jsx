import { useEffect, useState } from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";
import TransactionTable from "@/features/transaction/components/TransactionTable";
import Pagination from "@/shared/components/Pagination";
import { useTransaction } from "@/entities/transaction/hooks/useTransaction";

const PAGE_SIZE = 10;
const STATUS_OPTIONS = [
  { label: "Semua Status", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Verified", value: "verified" },
  { label: "Completed", value: "completed" },
];

const AdminTransactionsPage = () => {
  const {
    transactions,
    pagination,
    loading,
    error,
    getTransactions,
    verifyTransaction,
  } = useTransaction();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");

  useEffect(() => {
    getTransactions({
      page,
      page_size: PAGE_SIZE,
      ...(status ? { status } : {}),
    });
  }, [getTransactions, page, status]);

  const handleVerify = async (id) => {
    await verifyTransaction(id);
    await getTransactions({
      page,
      page_size: PAGE_SIZE,
      ...(status ? { status } : {}),
    });
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
            {STATUS_OPTIONS.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {!loading && !error && (
          <>
            {transactions.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                No transactions found.
              </div>
            ) : (
              <>
                <TransactionTable data={transactions} onVerify={handleVerify} />

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
