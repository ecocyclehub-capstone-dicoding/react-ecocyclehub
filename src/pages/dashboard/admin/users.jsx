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

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [successTitle, setSuccessTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setPage(1);
  }, [users.length]);

  const totalPages = Math.ceil(users.length / PAGE_SIZE);

  const paginatedUsers = users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // =====================
  // CREATE
  // =====================
  const handleCreate = () => {
    setSelectedUser(null);
    setOpenModal(true);
  };

  // =====================
  // EDIT
  // =====================
  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  // =====================
  // DELETE CLICK
  // =====================
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  // =====================
  // SUBMIT (CREATE / UPDATE)
  // =====================
  const handleSubmit = async (payload) => {
    try {
      if (selectedUser) {
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

  // =====================
  // DELETE
  // =====================
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
    <DashboardLayout sidebar={adminSidebar}>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#0d4f2c]">User Management</h1>

          <button
            onClick={handleCreate}
            className="bg-[#14532d] text-white px-6 py-3 rounded-2xl"
          >
            + Add User
          </button>
        </div>

        {/* LOADING */}
        {isFetching && <div>Loading...</div>}

        {/* ERROR */}
        {error && <div className="text-red-500">{error}</div>}

        {/* TABLE */}
        {!isFetching && !error && (
          <>
            <UserTable
              users={paginatedUsers}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}

        {/* MODAL CREATE / EDIT */}
        <UserModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedUser(null);
          }}
          onSubmit={handleSubmit}
          loading={isMutating}
          selectedUser={selectedUser}
        />

        {/* DELETE MODAL */}
        <UserDeleteModal
          open={openDeleteModal}
          onClose={() => {
            setOpenDeleteModal(false);
            setSelectedUser(null);
          }}
          onConfirm={handleDelete}
          loading={isMutating}
          user={selectedUser}
        />

        {/* SUCCESS MODAL */}
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
