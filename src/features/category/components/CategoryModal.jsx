import { useState } from "react";

import FormField from "@/shared/components/FormField";
import ModalShell from "@/shared/components/ModalShell";

const initialForm = {
  name: "",
  price_per_kg: "",
  point_per_kg: "",
};

const getInitialForm = (selectedCategory) => {
  if (!selectedCategory) return initialForm;

  return {
    name: selectedCategory.name || "",
    price_per_kg: selectedCategory.price_per_kg || "",
    point_per_kg: selectedCategory.point_per_kg || "",
  };
};

const CategoryModalForm = ({
  onClose,
  onSubmit,
  loading,
  selectedCategory,
}) => {
  const [form, setForm] = useState(() => getInitialForm(selectedCategory));

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Category name is required");
      return;
    }

    const pricePerKg = Number(form.price_per_kg);
    const pointPerKg = Number(form.point_per_kg);

    if (isNaN(pricePerKg) || pricePerKg < 0) {
      alert("Price per kg must be a valid non-negative number");
      return;
    }

    if (isNaN(pointPerKg) || pointPerKg < 0) {
      alert("Point per kg must be a valid non-negative number");
      return;
    }

    await onSubmit({
      name: form.name,
      price_per_kg: pricePerKg,
      point_per_kg: pointPerKg,
    });

    setForm(initialForm);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField
        label="Category Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Plastic"
      />

      <FormField
        label="Price per Kg"
        name="price_per_kg"
        type="number"
        value={form.price_per_kg}
        onChange={handleChange}
        placeholder="1000"
      />

      <FormField
        label="Point per Kg"
        name="point_per_kg"
        type="number"
        value={form.point_per_kg}
        onChange={handleChange}
        placeholder="100"
      />

      <div className="flex items-center justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-2xl bg-gray-100 px-6 py-3 text-gray-700"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-[#14532d] px-6 py-3 text-white disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : selectedCategory
              ? "Update Category"
              : "Create Category"}
        </button>
      </div>
    </form>
  );
};

const CategoryModal = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  selectedCategory = null,
}) => (
  <ModalShell
    open={open}
    title={selectedCategory ? "Update Category" : "Create Category"}
    description="Manage waste category data."
  >
    <CategoryModalForm
      key={selectedCategory?.id || "create-category"}
      selectedCategory={selectedCategory}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  </ModalShell>
);

export default CategoryModal;
