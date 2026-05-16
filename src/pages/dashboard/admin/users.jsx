import { useEffect, useState } from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";
import UserTable from "@/features/user/components/UserTable";
import UserModal from "@/features/user/components/UserModal";
import UserDeleteModal from "@/features/user/components/UserDeleteModal";
import SuccessModal from "@/shared/components/SuccessModal";
import Pagination from "@/shared/components/Pagination";

import { useUser } from "@/entities/user/hooks/useUser";

const PAGE_SIZE = 6;

const AdminUsersPage = () => {
  const {
    users,
    isFetching,
    isMutating,
    error,
    createUser,
    updateUser,
    deleteUser,
  } = useUser();

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [users.length]);

  const totalPages = Math.ceil(users.length / PAGE_SIZE);

  const paginatedUsers = users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <DashboardLayout sidebar={adminSidebar}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-[#0d4f2c]">User Management</h1>

        {isFetching && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {!isFetching && !error && (
          <>
            <UserTable
              users={paginatedUsers}
              onEdit={() => {}}
              onDelete={() => {}}
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

export default AdminUsersPage;
