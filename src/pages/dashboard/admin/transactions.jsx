import { useEffect } from "react";

import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";

import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";

import TransactionTable from "@/features/transaction/components/TransactionTable";

import { useTransaction } from "@/entities/transaction/hooks/useTransaction";

const AdminTransactionsPage = () => {
  const { transactions, loading, error, getTransactions, verifyTransaction } =
    useTransaction();

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  if (loading) {
    return (
      <DashboardLayout sidebar={adminSidebar}>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading transactions...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout sidebar={adminSidebar}>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout sidebar={adminSidebar}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0d4f2c]">Transactions</h1>

          <p className="text-gray-500 mt-2">
            Manage and verify waste transactions.
          </p>
        </div>

        <TransactionTable data={transactions} onVerify={verifyTransaction} />
      </div>
    </DashboardLayout>
  );
};

export default AdminTransactionsPage;
