import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";

import UserTable from "@/features/user/components/UserTable";
import UserModal from "@/features/user/components/UserModal";

import DeleteConfirmModal from "@/shared/components/DeleteConfirmModal";
import SuccessModal from "@/shared/components/SuccessModal";
import Pagination from "@/shared/components/Pagination";
import SearchBar from "@/shared/components/SearchBar";

import { useFeedbackModal } from "@/shared/hooks/useFeedbackModal";

import { useUser } from "@/entities/user/hooks/useUser";

const PAGE_SIZE = 6;

const ROLE_OPTIONS = [
  {
    label: "Semua Role",
    value: "",
  },
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Officer",
    value: "officer",
  },
  {
    label: "Customer",
    value: "customer",
  },
];

const SORT_OPTIONS = [
  {
    label: "Nama",
    value: "name",
  },
  {
    label: "Email",
    value: "email",
  },
];

const AdminUsersPage = () => {
  const {
    users,
    pagination,

    isMutating,
    isFetching,

    error,

    getUsers,

    createUser,
    updateUser,
    deleteUser,
  } = useUser();

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("");

  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const { feedback, showFeedback, closeFeedback } = useFeedbackModal();

  const params = useMemo(
    () => ({
      page,
      page_size: PAGE_SIZE,

      ...(search ? { name: search } : {}),

      ...(role ? { role } : {}),

      ...(sortBy ? { sort_by: sortBy } : {}),
      ...(sortOrder ? { sort_order: sortOrder } : {}),
    }),
    [page, search, role, sortBy, sortOrder],
  );

  useEffect(() => {
    getUsers(params);
  }, [getUsers, params]);

  const refreshUsers = async () => {
    await getUsers(params);
  };

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

      await refreshUsers();

      setOpenModal(false);
      setSelectedUser(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save user");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);

      await refreshUsers();

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
        {/* HEADER */}
        <div className="rounded-2xl border border-[#ded6ad] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#639922]">
                Total pengguna aktif
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#0d4f2c]">
                {(pagination?.count ?? users.length).toLocaleString("id-ID")}{" "}
                Pengguna
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-gray-500">
                Atur data pengguna dan hak akses yang digunakan dalam sistem
                EcoCycle Hub.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedUser(null);
                setOpenModal(true);
              }}
              className="rounded-2xl bg-[#14532d] px-6 py-3 font-semibold text-white transition hover:bg-[#0f3d22]"
            >
              + Tambah Pengguna
            </button>
          </div>

          {/* FILTER */}
          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center">
            <SearchBar
              placeholder="Cari pengguna..."
              value={search}
              onSearch={(value) => {
                setSearch(value);
                setPage(1);
              }}
            />

            <select
              value={role}
              onChange={(event) => {
                setRole(event.target.value);
                setPage(1);
              }}
              className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-[#173c28] outline-none focus:border-[#14532d]"
            >
              {ROLE_OPTIONS.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value);
                setPage(1);
              }}
              className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-[#173c28] outline-none focus:border-[#14532d]"
            >
              <option value="">Urutkan</option>

              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={sortOrder}
              onChange={(event) => {
                setSortOrder(event.target.value);
                setPage(1);
              }}
              className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-[#173c28] outline-none focus:border-[#14532d]"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* LOADING */}
        {isFetching && (
          <div className="rounded-2xl bg-white p-6 text-sm font-medium text-gray-500 shadow-sm">
            Loading...
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* TABLE */}
        {!isFetching && !error && (
          <>
            <UserTable
              users={users}
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
              totalPages={pagination?.total_pages || 1}
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
