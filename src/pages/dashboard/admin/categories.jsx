import { useState } from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";
import CategoryTable from "@/features/category/components/CategoryTable";
import CategoryModal from "@/features/category/components/CategoryModal";
import CategoryDeleteModal from "@/features/category/components/CategoryDeleteModal";
import SuccessModal from "@/shared/components/SuccessModal";
import { useCategory } from "@/entities/category/hooks/useCategory";

const AdminCategoriesPage = () => {
  const {
    categories,
    isMutating,
    isFetching,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategory();

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successTitle, setSuccessTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCreate = () => {
    setSelectedCategory(null);

    setOpenModal(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);

    setOpenModal(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);

    setOpenDeleteModal(true);
  };

  const handleSubmit = async (payload) => {
    try {
      const isEdit = !!selectedCategory;

      if (isEdit) {
        await updateCategory(selectedCategory.id, payload);

        setSuccessTitle("Category Updated");
        setSuccessMessage("The category has been updated successfully.");
      } else {
        await createCategory(payload);

        setSuccessTitle("Category Created");
        setSuccessMessage("New category has been added successfully.");
      }

      setOpenModal(false);
      setSelectedCategory(null);
      setOpenSuccessModal(true);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to save category";

      alert(message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);

      setOpenDeleteModal(false);

      setSelectedCategory(null);

      setSuccessTitle("Category Deleted");

      setSuccessMessage("The category has been deleted successfully.");

      setOpenSuccessModal(true);
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to delete category";

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
              Categories Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage waste categories and pricing.
            </p>
          </div>

          <button
            onClick={handleCreate}
            className="bg-[#14532d] text-white px-6 py-3 rounded-2xl font-medium"
          >
            + Add Category
          </button>
        </div>

        {/* LOADING */}
        {isFetching && (
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Loading categories...</p>
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
          <CategoryTable
            data={categories}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        )}

        {/* CREATE / UPDATE MODAL */}
        <CategoryModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);

            setSelectedCategory(null);
          }}
          onSubmit={handleSubmit}
          loading={isMutating}
          selectedCategory={selectedCategory}
        />

        {/* DELETE MODAL */}
        <CategoryDeleteModal
          open={openDeleteModal}
          onClose={() => {
            setOpenDeleteModal(false);

            setSelectedCategory(null);
          }}
          onConfirm={handleDelete}
          loading={isMutating}
          category={selectedCategory}
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

export default AdminCategoriesPage;
