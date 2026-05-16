import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  password: "",
  role_key: "customer",
};

const UserModal = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  selectedUser = null,
}) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (selectedUser) {
      setForm({
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        password: "",
        role_key: selectedUser.role?.key || "customer",
      });
    } else {
      setForm(initialForm);
    }
  }, [selectedUser]);

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
      alert("Full Name is required");
      return;
    }

    if (!form.email.trim()) {
      alert("Full Email is required");
      return;
    }

    const payload = {
      name: form.name,
      email: form.email,
      role_key: form.role_key,
    };

    if (form.password) {
      payload.password = form.password;
    }

    await onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8">
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#0d4f2c]">
            {selectedUser ? "Update User" : "Create User"}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Manage user account information.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Full Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full rounded-2xl border border-gray-200 px-4 py-4 outline-none focus:border-[#14532d]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@email.com"
              className="w-full rounded-2xl border border-gray-200 px-4 py-4 outline-none focus:border-[#14532d]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full rounded-2xl border border-gray-200 px-4 py-4 outline-none focus:border-[#14532d]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Role</label>

            <select
              name="role_key"
              value={form.role_key}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-200 px-4 py-4 outline-none focus:border-[#14532d]"
            >
              <option value="admin">Admin</option>
              <option value="officer">Officer</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          {/* ACTION */}
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
                : selectedUser
                  ? "Update User"
                  : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
