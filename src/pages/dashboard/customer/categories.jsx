import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";

import { customerSidebar } from "@/features/dashboard/components/configs/customer.config";

import CategoryTable from "@/features/category/components/CategoryTable";

import Pagination from "@/shared/components/Pagination";
import SearchBar from "@/shared/components/SearchBar";

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

const CustomerCategoriesPage = () => {
  const {
    categories,
    pagination,

    isFetching,

    error,

    getCategories,
  } = useCategory();

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("");

  const [sortOrder, setSortOrder] = useState("asc");

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

  return (
    <DashboardLayout
      sidebar={customerSidebar}
      title="Katalog Sampah"
      subtitle="Cek harga dan poin per kilogram sebelum melakukan setoran."
    >
      <div className="space-y-6">
        {/* HEADER */}
        <div className="rounded-2xl border border-[#ded6ad] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#639922]">
                Total kategori tersedia
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#0d4f2c]">
                {(pagination?.count || 0).toLocaleString("id-ID")} Kategori
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-gray-500">
                Cari kategori sampah beserta harga dan poin yang bisa didapatkan
                dari setiap setoran.
              </p>
            </div>
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
            <CategoryTable data={categories} readOnly />

            <Pagination
              page={page}
              totalPages={pagination?.total_pages || 1}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CustomerCategoriesPage;
