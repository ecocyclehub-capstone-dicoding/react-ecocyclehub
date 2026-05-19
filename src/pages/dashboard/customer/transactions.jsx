import { useEffect } from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import { customerSidebar } from "@/features/dashboard/components/configs/customer.config";
import TransactionTable from "@/features/transaction/components/TransactionTable";
import { useTransaction } from "@/entities/transaction/hooks/useTransaction";

const CustomerTransactionsPage = () => {
  const { transactions, isFetching, error, getTransactionHistory } =
    useTransaction();

  useEffect(() => {
    getTransactionHistory();
  }, [getTransactionHistory]);

  return (
    <DashboardLayout
      sidebar={customerSidebar}
      title="Riwayat Transaksi"
      subtitle="Lihat status, nilai, poin, dan detail setoran sampah."
    >
      {isFetching && (
        <div className="rounded-2xl bg-white p-6 text-sm font-medium text-gray-500">
          Loading...
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {!isFetching && !error && (
        <TransactionTable data={transactions} audience="customer" />
      )}
    </DashboardLayout>
  );
};

export default CustomerTransactionsPage;
