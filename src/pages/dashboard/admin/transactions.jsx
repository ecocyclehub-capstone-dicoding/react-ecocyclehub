import { useEffect, useState } from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";
import TransactionTable from "@/features/transaction/components/TransactionTable";
import Pagination from "@/shared/components/Pagination";
import { useTransaction } from "@/entities/transaction/hooks/useTransaction";
import { buildSidebar } from "@/features/dashboard/lib/buildSidebar";
import { useAuthContext } from "@/app/provider/AuthProvider";

const PAGE_SIZE = 6;

const AdminTransactionsPage = () => {
  const { user } = useAuthContext();
  const { transactions, loading, error, verifyTransaction } = useTransaction();
  const [page, setPage] = useState(1);
  const sidebar = buildSidebar(adminSidebar, user);

  const totalPages = Math.ceil(transactions.length / PAGE_SIZE);

  const paginatedTransactions = transactions.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  useEffect(() => {
    setPage(1);
  }, [transactions.length]);

  return (
    <DashboardLayout sidebar={sidebar}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-[#0d4f2c]">
          Transactions Management
        </h1>

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
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminTransactionsPage;
