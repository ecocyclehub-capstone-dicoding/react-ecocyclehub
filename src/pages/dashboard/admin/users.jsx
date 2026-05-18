import { useState } from "react";

import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";

import UserTable from "@/features/user/components/UserTable";
import UserModal from "@/features/user/components/UserModal";

import DeleteConfirmModal from "@/shared/components/DeleteConfirmModal";
import SuccessModal from "@/shared/components/SuccessModal";
import Pagination from "@/shared/components/Pagination";
import { useFeedbackModal } from "@/shared/hooks/useFeedbackModal";

import { useUser } from "@/entities/user/hooks/useUser";

const PAGE_SIZE = 6;

const AdminUsersPage = () => {
  const {
    users,
    isMutating,
    isFetching,
    error,
    createUser,
    updateUser,
    deleteUser,
  } = useUser();

  const [page, setPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const { feedback, showFeedback, closeFeedback } = useFeedbackModal();

  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const currentPage = Math.min(page, totalPages || 1);

  const paginatedUsers = users.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleSubmit = async (payload) => {
    try {
      const isEdit = !!selectedUser;

      if (isEdit) {
        await updateUser(selectedUser.id, payload);

        showFeedback("User Updated", "User updated successfully");
      } else {
        await createUser(payload);

        showFeedback("User Created", "User created successfully");
      }

      setOpenModal(false);
      setSelectedUser(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save user");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);

      setOpenDeleteModal(false);
      setSelectedUser(null);

      showFeedback("User Deleted", "User deleted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <DashboardLayout
      sidebar={adminSidebar}
      title="Manajemen Pengguna"
      subtitle="Kelola akun admin, petugas, dan pengguna aplikasi EcoCycle Hub."
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-[#ded6ad] bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#639922]">
              Total pengguna aktif
            </p>

            <h1 className="mt-1 text-3xl font-bold text-[#0d4f2c]">
              {users.length} Pengguna
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-gray-500">
              Atur data pengguna dan hak akses yang digunakan dalam sistem
              EcoCycle Hub.
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="rounded-2xl bg-[#14532d] px-6 py-3 font-semibold text-white transition hover:bg-[#0f3d22]"
          >
            + Tambah Pengguna
          </button>
        </div>

        {isFetching && <div>Loading...</div>}

        {error && <div className="text-red-500">{error}</div>}

        {!isFetching && !error && (
          <>
            <UserTable
              users={paginatedUsers}
              onEdit={(user) => {
                setSelectedUser(user);
                setOpenModal(true);
              }}
              onDelete={(user) => {
                setSelectedUser(user);
                setOpenDeleteModal(true);
              }}
            />

            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}

        <UserModal
          open={openModal}
          selectedUser={selectedUser}
          loading={isMutating}
          onClose={() => {
            setOpenModal(false);
            setSelectedUser(null);
          }}
          onSubmit={handleSubmit}
        />

        <DeleteConfirmModal
          open={openDeleteModal}
          item={selectedUser}
          title="Delete User"
          itemLabel="user"
          itemDescription={selectedUser?.email}
          confirmText="Delete User"
          loading={isMutating}
          onClose={() => {
            setOpenDeleteModal(false);
            setSelectedUser(null);
          }}
          onConfirm={handleDelete}
        />

        <SuccessModal
          open={feedback.open}
          title={feedback.title}
          message={feedback.message}
          onClose={closeFeedback}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminUsersPage;
