import { useEffect, useState } from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";
import TransactionTable from "@/features/transaction/components/TransactionTable";
import Pagination from "@/shared/components/Pagination";
import { useTransaction } from "@/entities/transaction/hooks/useTransaction";

const PAGE_SIZE = 6;

const AdminTransactionsPage = () => {
  const { transactions, loading, error, verifyTransaction } = useTransaction();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(transactions.length / PAGE_SIZE);

  const paginatedTransactions = transactions.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  useEffect(() => {
    setPage(1);
  }, [transactions.length]);

  return (
    <DashboardLayout sidebar={adminSidebar}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-[#0d4f2c]">
          Transactions Management
        </h1>

        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {!loading && !error && (
          <>
            <TransactionTable
              data={paginatedTransactions}
              onVerify={verifyTransaction}
            />

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminTransactionsPage;
