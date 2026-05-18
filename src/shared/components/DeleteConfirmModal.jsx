const DeleteConfirmModal = ({
  open,
  onClose,
  onConfirm,
  loading = false,
  item = null,
  title = "Delete Item",
  description = "This action cannot be undone.",
  itemLabel = "item",
  itemName,
  itemDescription,
  confirmText = "Delete",
  loadingText = "Deleting...",
}) => {
  if (!open || !item) return null;

  const displayName = itemName ?? item.name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-red-600">{title}</h2>

          <p className="mt-2 text-sm text-gray-500">{description}</p>
        </div>

        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
          <p className="text-sm text-gray-700">
            Are you sure you want to delete {itemLabel}:
          </p>

          <h3 className="mt-2 text-lg font-semibold text-red-700">
            {displayName}
          </h3>

          {itemDescription && (
            <p className="mt-1 text-sm text-gray-500">{itemDescription}</p>
          )}
        </div>

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
            onClick={() => onConfirm(item.id)}
            className="rounded-2xl bg-red-600 px-6 py-3 text-white disabled:opacity-60"
          >
            {loading ? loadingText : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
