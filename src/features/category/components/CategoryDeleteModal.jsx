const CategoryDeleteModal = ({
  open,
  onClose,
  onConfirm,
  loading = false,
  category = null,
}) => {
  if (!open || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8">
        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-red-600">Delete Category</h2>

          <p className="mt-2 text-sm text-gray-500">
            This action cannot be undone.
          </p>
        </div>

        {/* CONTENT */}
        <div className="rounded-2xl bg-red-50 p-5 border border-red-100">
          <p className="text-sm text-gray-700">
            Are you sure you want to delete category:
          </p>

          <h3 className="mt-2 text-lg font-semibold text-red-700">
            {category.name}
          </h3>
        </div>

        {/* ACTION */}
        <div className="mt-8 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-gray-100 px-6 py-3 text-gray-700"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => onConfirm(category.id)}
            className="rounded-2xl bg-red-600 px-6 py-3 text-white disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete Category"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDeleteModal;
