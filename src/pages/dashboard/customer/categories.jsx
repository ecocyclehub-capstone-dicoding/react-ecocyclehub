import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import { customerSidebar } from "@/features/dashboard/components/configs/customer.config";
import CategoryTable from "@/features/category/components/CategoryTable";
import { useCategory } from "@/entities/category/hooks/useCategory";

const CustomerCategoriesPage = () => {
  const { categories, isFetching, error } = useCategory();

  return (
    <DashboardLayout
      sidebar={customerSidebar}
      title="Katalog Sampah"
      subtitle="Cek harga dan poin per kilogram sebelum melakukan setoran."
    >
      <div className="space-y-6">
        {isFetching && (
          <div className="rounded-2xl bg-white p-6 text-sm font-medium text-gray-500">
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

export default CustomerCategoriesPage;
