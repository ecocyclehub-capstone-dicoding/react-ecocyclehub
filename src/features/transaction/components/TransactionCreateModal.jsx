import { useMemo, useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

import FormField from "@/shared/components/FormField";
import ModalShell from "@/shared/components/ModalShell";

import { formatCurrency, formatNumber } from "@/shared/lib/formatters";

const createEmptyForm = () => ({
  user_id: "",
  items: [{ category_id: "", weight: "" }],
});

const getFirstError = (errors, field) => {
  const value = errors?.[field];

  return Array.isArray(value) ? value[0] : value;
};

const TransactionCreateModal = ({
  open,
  audience = "officer",
  customers = [],
  categories = [],
  fieldErrors = {},
  loading = false,
  onClose,
  onSubmit,
}) => {
  const isCustomer = audience === "customer";

  const [form, setForm] = useState(createEmptyForm);

  const estimate = useMemo(
    () =>
      form.items.reduce(
        (summary, item) => {
          const category = categories.find(
            (categoryItem) => categoryItem.id === item.category_id,
          );

          const weight = Number(item.weight || 0);

          if (!category || weight <= 0) {
            return summary;
          }

          return {
            price: summary.price + Number(category.price_per_kg || 0) * weight,

            points:
              summary.points + Number(category.point_per_kg || 0) * weight,
          };
        },
        {
          price: 0,
          points: 0,
        },
      ),
    [categories, form.items],
  );

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const updateItem = (index, field, value) => {
    setForm((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }));
  };

  const addItem = () => {
    setForm((current) => ({
      ...current,
      items: [
        ...current.items,
        {
          category_id: "",
          weight: "",
        },
      ],
    }));
  };

  const removeItem = (index) => {
    setForm((current) => ({
      ...current,
      items: current.items.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const getItemError = (index, field) => {
    const nestedError = fieldErrors?.items?.[index]?.[field];

    if (Array.isArray(nestedError)) {
      return nestedError[0];
    }

    return nestedError;
  };

  const handleClose = () => {
    setForm(createEmptyForm());

    onClose?.();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      items: form.items.map((item) => ({
        category_id: item.category_id,
        weight: Number(item.weight),
      })),
    };

    if (!isCustomer && form.user_id) {
      payload.user_id = form.user_id;
    }

    try {
      await onSubmit(payload);
      setForm(createEmptyForm());
    } catch {
      // Keep current form values so users can correct and resubmit.
    }
  };

  return (
    <ModalShell
      open={open}
      title={isCustomer ? "Buat Setoran Sampah" : "Buat Transaksi Baru"}
      description={
        isCustomer
          ? "Tambahkan jenis sampah dan berat setoran."
          : "Tambahkan satu atau beberapa kategori sampah beserta beratnya."
      }
      onClose={handleClose}
      showCloseButton
      panelClassName="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {!isCustomer && (
          <FormField
            label="Nasabah"
            name="user_id"
            value={form.user_id}
            onChange={updateField}
            error={getFirstError(fieldErrors, "user_id")}
          >
            <option value="">Pilih nasabah...</option>

            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </FormField>
        )}

        {getFirstError(fieldErrors, "items") && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-700">
            {getFirstError(fieldErrors, "items")}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-[#173c28]">
              Item Sampah
            </h3>

            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center gap-2 rounded-xl border border-[#ded6ad] bg-[#f5f0e0] px-3 py-2 text-sm font-semibold text-[#0d4f2c]"
            >
              <MdAdd size={17} />
              Tambah Item
            </button>
          </div>

          {form.items.map((item, index) => (
            <div
              key={index}
              className="grid gap-3 sm:grid-cols-[1fr_130px_auto]"
            >
              <FormField
                label="Kategori Sampah"
                name={`category_id_${index}`}
                value={item.category_id}
                onChange={(event) =>
                  updateItem(index, "category_id", event.target.value)
                }
                error={
                  getItemError(index, "category_id") ||
                  getFirstError(fieldErrors, "category_id")
                }
              >
                <option value="">Pilih kategori...</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </FormField>

              <FormField
                label="Berat (kg)"
                name={`weight_${index}`}
                type="number"
                value={item.weight}
                onChange={(event) =>
                  updateItem(index, "weight", event.target.value)
                }
                placeholder="10"
                error={
                  getItemError(index, "weight") ||
                  getFirstError(fieldErrors, "weight")
                }
              />

              <div className="flex items-end">
                {form.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    aria-label={`Hapus item sampah ${index + 1}`}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-700 transition hover:bg-red-200"
                  >
                    <MdClose size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {estimate.price > 0 && (
          <div className="rounded-2xl border border-[#97c459] bg-[#eaf3de] p-4 text-[#3b6d11]">
            <p className="mb-3 text-sm font-semibold">Estimasi</p>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/65 p-3">
                <p className="text-xs font-semibold opacity-70">Nilai</p>

                <p className="mt-1 font-bold">
                  {formatCurrency(estimate.price)}
                </p>
              </div>

              <div className="rounded-xl bg-white/65 p-3">
                <p className="text-xs font-semibold opacity-70">Poin</p>

                <p className="mt-1 font-bold">
                  +{formatNumber(Math.round(estimate.points))}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-2xl bg-gray-100 px-6 py-3 font-semibold text-gray-700"
          >
            Batal
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-[#14532d] px-6 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Menyimpan..." : "Simpan Transaksi"}
          </button>
        </div>
      </form>
    </ModalShell>
  );
};

export default TransactionCreateModal;
