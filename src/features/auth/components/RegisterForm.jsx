import React, { useState } from "react";

const RegisterForm = ({ onSubmit, loading = false }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    if (!form.name || !form.email || !form.password) {
      alert("Semua field wajib diisi");
      return;
    }

    if (form.password.length < 8) {
      alert("Password minimal 8 karakter");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Password dan konfirmasi tidak sama");
      return;
    }

    onSubmit?.(form);
  };

  return (
    <div className="w-full max-w-md bg-[#f5f5f3] p-10 rounded-3xl shadow-lg">
      {/* Title */}
      <h2 className="text-3xl font-semibold text-[#1f1f1f] mb-2">
        Create Account
      </h2>
      <p className="text-sm text-gray-500 mb-8">
        Begin your journey towards zero waste today.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Full Name
          </label>
          <div className="flex items-center bg-[#d6cfa3] rounded-xl px-4 py-3">
            <input
              type="text"
              name="name"
              placeholder="Jane Doe"
              value={form.name}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-sm text-gray-800"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Email Address
          </label>
          <div className="flex items-center bg-[#d6cfa3] rounded-xl px-4 py-3">
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-sm text-gray-800"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="flex items-center bg-[#d6cfa3] rounded-xl px-4 py-3 mt-2">
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-sm text-gray-800"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Minimal 8 karakter</p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="flex items-center bg-[#d6cfa3] rounded-xl px-4 py-3 mt-2">
            <input
              type="password"
              name="confirmPassword"
              placeholder="********"
              value={form.confirmPassword}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-sm text-gray-800"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-xl text-white font-medium transition bg-gradient-to-r from-green-800 to-green-600 hover:opacity-90"
        >
          {loading ? "Loading..." : "Sign Up →"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
