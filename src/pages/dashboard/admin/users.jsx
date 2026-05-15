import { useState } from "react";

import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";

import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";

import UserTable from "@/features/user/components/UserTable";

import UserModal from "@/features/user/components/UserModal";

import UserDeleteModal from "@/features/user/components/UserDeleteModal";

import SuccessModal from "@/shared/components/SuccessModal";

import { useUser } from "@/entities/user/hooks/useUser";

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

  const [openModal, setOpenModal] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const [successTitle, setSuccessTitle] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  /*
   |--------------------------------------------------------------------------
   | CREATE
   |--------------------------------------------------------------------------
   */

  const handleCreate = () => {
    setSelectedUser(null);

    setOpenModal(true);
  };

  /*
   |--------------------------------------------------------------------------
   | EDIT
   |--------------------------------------------------------------------------
   */

  const handleEdit = (user) => {
    setSelectedUser(user);

    setOpenModal(true);
  };

  /*
   |--------------------------------------------------------------------------
   | DELETE CLICK
   |--------------------------------------------------------------------------
   */

  const handleDeleteClick = (user) => {
    setSelectedUser(user);

    setOpenDeleteModal(true);
  };

  /*
   |--------------------------------------------------------------------------
   | SUBMIT
   |--------------------------------------------------------------------------
   */

  const handleSubmit = async (payload) => {
    try {
      const isEdit = !!selectedUser;

      if (isEdit) {
        await updateUser(selectedUser.id, payload);

        setSuccessTitle("User Updated");

        setSuccessMessage("User account has been updated successfully.");
      } else {
        await createUser(payload);

        setSuccessTitle("User Created");

        setSuccessMessage("New user account has been created successfully.");
      }

      setOpenModal(false);

      setSelectedUser(null);

      setOpenSuccessModal(true);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to save user";

      alert(message);
    }
  };

  /*
   |--------------------------------------------------------------------------
   | DELETE
   |--------------------------------------------------------------------------
   */

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);

      setOpenDeleteModal(false);

      setSelectedUser(null);

      setSuccessTitle("User Deleted");

      setSuccessMessage("User account has been deleted successfully.");

      setOpenSuccessModal(true);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete user";

      alert(message);
    }
  };

  return (
    <DashboardLayout sidebar={adminSidebar}>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0d4f2c]">
              User Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all registered user accounts.
            </p>
          </div>

          <button
            onClick={handleCreate}
            className="bg-[#14532d] text-white px-6 py-3 rounded-2xl font-medium"
          >
            + Add User
          </button>
        </div>

        {/* LOADING */}
        {isFetching && (
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
        {!isFetching && !error && (
          <UserTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        )}

        {/* CREATE / UPDATE MODAL */}
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
