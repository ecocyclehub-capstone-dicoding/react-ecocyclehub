import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import { officerSidebar } from "@/features/dashboard/components/configs/officer.config";
import CategoryTable from "@/features/category/components/CategoryTable";
import { useCategory } from "@/entities/category/hooks/useCategory";

const OfficerCategoriesPage = () => {
  const { categories, isFetching, error } = useCategory();

  return (
    <DashboardLayout
      sidebar={officerSidebar}
      title="Kategori Sampah"
      subtitle="Referensi harga dan poin yang digunakan saat membuat transaksi."
    >
      <div className="space-y-6">
        {isFetching && (
          <div className="rounded-2xl bg-white p-6 text-sm font-medium text-gray-500 shadow-sm">
            Loading...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {!isFetching && !error && <CategoryTable data={categories} readOnly />}
      </div>
    </DashboardLayout>
  );
};

export default OfficerCategoriesPage;
