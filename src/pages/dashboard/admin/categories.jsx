import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";

import CategoryTable from "@/features/category/components/CategoryTable";
import CategoryModal from "@/features/category/components/CategoryModal";

import DeleteConfirmModal from "@/shared/components/DeleteConfirmModal";
import SuccessModal from "@/shared/components/SuccessModal";
import Pagination from "@/shared/components/Pagination";
import SearchBar from "@/shared/components/SearchBar";

import { useFeedbackModal } from "@/shared/hooks/useFeedbackModal";
import { useCategory } from "@/entities/category/hooks/useCategory";

const PAGE_SIZE = 6;

const SORT_OPTIONS = [
  {
    label: "Nama",
    value: "name",
  },
  {
    label: "Harga",
    value: "price",
  },
  {
    label: "Poin",
    value: "point",
  },
];

const AdminCategoriesPage = () => {
  const {
    categories,
    pagination,

    isMutating,
    isFetching,

    error,

    getCategories,

    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategory();

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const { feedback, showFeedback, closeFeedback } = useFeedbackModal();

  const params = useMemo(
    () => ({
      page,
      page_size: PAGE_SIZE,

      ...(search ? { name: search } : {}),

      ...(sortBy ? { sort_by: sortBy } : {}),
      ...(sortOrder ? { sort_order: sortOrder } : {}),
    }),
    [page, search, sortBy, sortOrder],
  );

  useEffect(() => {
    getCategories(params);
  }, [getCategories, params]);

  const refreshCategories = async () => {
    await getCategories(params);
  };

  const handleSubmit = async (payload) => {
    try {
      const isEdit = !!selectedCategory;

      if (isEdit) {
        await updateCategory(selectedCategory.id, payload);

        showFeedback("Kategori Diperbarui", "Kategori berhasil diperbarui.");
      } else {
        await createCategory(payload);

        showFeedback("Kategori Dibuat", "Kategori berhasil dibuat.");
      }

      await refreshCategories();

      setOpenModal(false);
      setSelectedCategory(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save category");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);

      await refreshCategories();

      setOpenDeleteModal(false);
      setSelectedCategory(null);

      showFeedback("Kategori Dihapus", "Kategori berhasil dihapus.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete category");
    }
  };

  return (
    <DashboardLayout
      sidebar={adminSidebar}
      title="Kategori Sampah"
      subtitle="Kelola katalog, harga per kilogram, dan poin kategori sampah."
    >
      <div className="space-y-6">
        {/* HEADER */}
        <div className="rounded-2xl border border-[#ded6ad] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#639922]">
                Total kategori aktif
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#0d4f2c]">
                {(pagination?.count ?? categories.length).toLocaleString(
                  "id-ID",
                )}{" "}
                Kategori
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-gray-500">
                Atur harga dan poin kategori sampah yang digunakan dalam sistem.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedCategory(null);
                setOpenModal(true);
              }}
              className="rounded-2xl bg-[#14532d] px-6 py-3 font-semibold text-white transition hover:bg-[#0f3d22]"
            >
              + Tambah Kategori
            </button>
          </div>

          {/* FILTER */}
          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center">
            <SearchBar
              placeholder="Cari kategori..."
              value={search}
              onSearch={(value) => {
                setSearch(value);
                setPage(1);
              }}
            />

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
            <CategoryTable
              data={categories}
              onEdit={(category) => {
                setSelectedCategory(category);
                setOpenModal(true);
              }}
              onDelete={(category) => {
                setSelectedCategory(category);
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

        <DeleteConfirmModal
          open={openDeleteModal}
          item={selectedCategory}
          title="Delete Category"
          itemLabel="category"
          confirmText="Delete Category"
          loading={isMutating}
          onClose={() => {
            setOpenDeleteModal(false);
            setSelectedCategory(null);
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

export default AdminCategoriesPage;
