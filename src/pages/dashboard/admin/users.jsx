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
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [successTitle, setSuccessTitle] = useState("");

  const totalPages = Math.ceil(users.length / PAGE_SIZE);

  const paginatedUsers = users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [users.length]);

  const handleSubmit = async (payload) => {
    try {
      const isEdit = !!selectedUser;

      if (isEdit) {
        await updateUser(selectedUser.id, payload);

        setSuccessTitle("User Updated");
        setSuccessMessage("User updated successfully");
      } else {
        await createUser(payload);

        setSuccessTitle("User Created");
        setSuccessMessage("User created successfully");
      }

      setOpenModal(false);
      setSelectedUser(null);
      setOpenSuccessModal(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save user");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);

      setOpenDeleteModal(false);
      setSelectedUser(null);

      setSuccessTitle("User Deleted");
      setSuccessMessage("User deleted successfully");

      setOpenSuccessModal(true);
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
              page={page}
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

        <UserDeleteModal
          open={openDeleteModal}
          user={selectedUser}
          loading={isMutating}
          onClose={() => {
            setOpenDeleteModal(false);
            setSelectedUser(null);
          }}
          onConfirm={handleDelete}
        />

        <SuccessModal
          open={openSuccessModal}
          title={successTitle}
          message={successMessage}
          onClose={() => setOpenSuccessModal(false)}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminUsersPage;
