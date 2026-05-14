import { useEffect, useState } from "react";

import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";

import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";

import CustomerTable from "@/features/customer/components/CustomerTable";

import { useCustomer } from "@/entities/customer/hooks/useCustomer";

const AdminCustomersPage = () => {
  const { customers, loading, error, getCustomers, deleteCustomer } =
    useCustomer();

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    getCustomers();
  }, []);

  const handleDelete = async (customer) => {
    const confirmed = window.confirm(`Delete customer "${customer.name}"?`);

    if (!confirmed) return;

    await deleteCustomer(customer.id);
  };

  return (
    <DashboardLayout sidebar={adminSidebar}>
      <div className="space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-[#0d4f2c]">
            Customer Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all registered customer accounts.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Loading customers...</p>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {/* TABLE */}
        {!loading && !error && (
          <CustomerTable
            customers={customers}
            onEdit={setSelectedCustomer}
            onDelete={handleDelete}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminCustomersPage;
