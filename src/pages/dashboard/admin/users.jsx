import { useEffect, useState } from "react";

import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";

import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";

import UserTable from "@/features/user/components/UserTable";

import { useUser } from "@/entities/user/hooks/useUser";

const AdminUsersPage = () => {
  const { users, loading, error, getUsers, deleteUser } = useUser();

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (user) => {
    const confirmed = window.confirm(`Delete user "${user.name}"?`);

    if (!confirmed) return;

    try {
      await deleteUser(user.id);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <DashboardLayout sidebar={adminSidebar}>
      <div className="space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-[#0d4f2c]">User Management</h1>

          <p className="text-gray-500 mt-2">
            Manage all registered user accounts.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Loading users...</p>
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
          <UserTable
            users={users}
            onEdit={setSelectedUser}
            onDelete={handleDelete}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminUsersPage;
