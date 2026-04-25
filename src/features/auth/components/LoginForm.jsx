import React from "react";
import { useState } from "react";

const LoginForm = ({ onSubmit, loading = false }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const isDisabled = !form.email || !form.password || loading;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Email dan password wajib diisi");
      return;
    }

    onSubmit?.(form);
  };

  return (
    <div className="w-full max-w-md bg-[#f5f5f3] p-10 rounded-3xl shadow-lg">
      {/* Title */}
      <h2 className="text-3xl font-semibold text-[#1f1f1f] mb-2">
        Welcome Back
      </h2>
      <p className="text-sm text-gray-500 mb-8">
        Enter your credentials to access the hub.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
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
              className="bg-transparent outline-none w-full text-sm text-gray-800 placeholder-gray-600"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <span className="text-xs text-green-700 cursor-pointer">
              Forgot?
            </span>
          </div>

          <div className="flex items-center bg-[#d6cfa3] rounded-xl px-4 py-3">
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-sm text-gray-800"
            />
          </div>
        </div>

        {/* Remember */}
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4 accent-green-700" />
          <span className="text-sm text-gray-600">Remember this device</span>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full py-4 rounded-xl text-white font-medium transition ${isDisabled ? "bg-gray-400" : "bg-gradient-to-r from-green-800 to-green-600 hover:opacity-90"}`}
        >
          {loading ? "Loading..." : "Sign In to Hub →"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
