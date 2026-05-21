import { useState } from "react";

import FormField from "@/shared/components/FormField";
import ModalShell from "@/shared/components/ModalShell";

const initialForm = {
  name: "",
  email: "",
  password: "",
  role_key: "customer",
};

const getInitialForm = (selectedUser) => {
  if (!selectedUser) return initialForm;

  return {
    name: selectedUser.name || "",
    email: selectedUser.email || "",
    password: "",
    role_key: selectedUser.role?.key || "customer",
  };
};

const UserModalForm = ({ onClose, onSubmit, loading, selectedUser }) => {
  const [form, setForm] = useState(() => getInitialForm(selectedUser));

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
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField
        label="Full Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="John Doe"
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="john@email.com"
      />

      <FormField
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="********"
      />

      <FormField
        label="Role"
        name="role_key"
        value={form.role_key}
        onChange={handleChange}
      >
        <option value="admin">Admin</option>
        <option value="officer">Officer</option>
        <option value="customer">Customer</option>
      </FormField>

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
          {loading ? "Saving..." : selectedUser ? "Update User" : "Create User"}
        </button>
      </div>
    </form>
  );
};

const UserModal = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  selectedUser = null,
}) => (
  <ModalShell
    open={open}
    title={selectedUser ? "Update User" : "Create User"}
    description="Manage user account information."
  >
    <UserModalForm
      key={selectedUser?.id || "create-user"}
      selectedUser={selectedUser}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  </ModalShell>
);

export default UserModal;
