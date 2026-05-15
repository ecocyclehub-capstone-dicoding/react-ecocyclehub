import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  price_per_kg: "",
  point_per_kg: "",
};

const CategoryModal = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  selectedCategory = null,
}) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (selectedCategory) {
      setForm({
        name: selectedCategory.name || "",
        price_per_kg: selectedCategory.price_per_kg || "",
        point_per_kg: selectedCategory.point_per_kg || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [selectedCategory]);

  if (!open) return null;

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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-8">
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#0d4f2c]">
            {selectedCategory ? "Update Category" : "Create Category"}
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Manage waste category data.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* NAME */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Category Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Plastic"
              className="w-full border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-[#14532d]"
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Price per Kg
            </label>

            <input
              type="number"
              name="price_per_kg"
              value={form.price_per_kg}
              onChange={handleChange}
              placeholder="1000"
              className="w-full border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-[#14532d]"
            />
          </div>

          {/* POINT */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Point per Kg
            </label>

            <input
              type="number"
              name="point_per_kg"
              value={form.point_per_kg}
              onChange={handleChange}
              placeholder="100"
              className="w-full border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-[#14532d]"
            />
          </div>

          {/* BUTTON */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-2xl bg-gray-100 text-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-2xl bg-[#14532d] text-white disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : selectedCategory
                  ? "Update Category"
                  : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
