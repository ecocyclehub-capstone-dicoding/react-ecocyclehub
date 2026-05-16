import { useEffect, useState } from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";

import CategoryTable from "@/features/category/components/CategoryTable";
import CategoryModal from "@/features/category/components/CategoryModal";
import CategoryDeleteModal from "@/features/category/components/CategoryDeleteModal";
import SuccessModal from "@/shared/components/SuccessModal";
import Pagination from "@/shared/components/Pagination";

import { useCategory } from "@/entities/category/hooks/useCategory";

const PAGE_SIZE = 6;

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

  const [page, setPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [successTitle, setSuccessTitle] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);

  const totalPages = Math.ceil(categories.length / PAGE_SIZE);

  const paginatedCategories = categories.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  useEffect(() => {
    setPage(1);
  }, [categories.length]);

  const handleSubmit = async (payload) => {
    try {
      const isEdit = !!selectedCategory;

      if (isEdit) {
        await updateCategory(selectedCategory.id, payload);
        setSuccessTitle("Category Updated");
        setSuccessMessage("Category updated successfully");
      } else {
        await createCategory(payload);
        setSuccessTitle("Category Created");
        setSuccessMessage("Category created successfully");
      }

      setOpenModal(false);
      setSelectedCategory(null);
      setOpenSuccessModal(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save category");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);

      setOpenDeleteModal(false);
      setSelectedCategory(null);

      setSuccessTitle("Category Deleted");
      setSuccessMessage("Category deleted successfully");
      setOpenSuccessModal(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete category");
    }
  };

  return (
    <DashboardLayout sidebar={adminSidebar}>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0d4f2c]">
              Categories Management
            </h1>
            <p className="text-gray-500 mt-2">
              Manage waste categories and pricing.
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-[#14532d] text-white px-6 py-3 rounded-2xl"
          >
            + Add Category
          </button>
        </div>

        {/* LOADING */}
        {isFetching && <div>Loading...</div>}

        {/* ERROR */}
        {error && <div className="text-red-500">{error}</div>}

        {/* TABLE */}
        {!isFetching && !error && (
          <>
            <CategoryTable
              data={paginatedCategories}
              onEdit={(c) => {
                setSelectedCategory(c);
                setOpenModal(true);
              }}
              onDelete={(c) => {
                setSelectedCategory(c);
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

        <CategoryModal
          open={openModal}
          selectedCategory={selectedCategory}
          loading={isMutating}
          onClose={() => {
            setOpenModal(false);
            setSelectedCategory(null);
          }}
          onSubmit={handleSubmit}
        />

        <CategoryDeleteModal
          open={openDeleteModal}
          category={selectedCategory}
          loading={isMutating}
          onClose={() => {
            setOpenDeleteModal(false);
            setSelectedCategory(null);
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

export default AdminCategoriesPage;
