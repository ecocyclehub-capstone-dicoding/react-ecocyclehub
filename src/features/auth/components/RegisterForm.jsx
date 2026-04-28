import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const RegisterForm = ({ onSubmit, loading = false }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const isDisabled = !form.fullName || !form.email || !form.password || loading;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.password) {
      alert("Semua field wajib diisi");
      return;
    }

    onSubmit?.(form);
  };

  return (
    <div className="w-full max-w-md bg-[#f5f5f3] p-10 rounded-3xl shadow-lg">
      <h2 className="text-3xl font-semibold text-[#1f1f1f] mb-2">
        Create Account
      </h2>
      <p className="text-sm text-gray-500 mb-8">
        Begin your journey towards zero waste today.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm mb-2 text-gray-700">Full Name</label>
          <div className="flex items-center bg-[#d6cfa3] rounded-xl px-4 py-3 gap-3">
            <FaUser />
            <input
              type="text"
              name="fullName"
              placeholder="e.g. Jane Doe"
              value={form.fullName}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-2 text-gray-700">
            Email Address
          </label>
          <div className="flex items-center bg-[#d6cfa3] rounded-xl px-4 py-3 gap-3">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              placeholder="jane@example.com"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm mb-2 text-gray-700">Password</label>
          <div className="flex items-center bg-[#d6cfa3] rounded-xl px-4 py-3 gap-3">
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Must be at least 8 characters.
          </p>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full py-4 rounded-xl text-white font-medium transition ${
            isDisabled
              ? "bg-gray-400"
              : "bg-gradient-to-r from-green-800 to-green-600 hover:opacity-90"
          }`}
        >
          {loading ? "Loading..." : "Sign Up →"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
