import { useState } from "react";
import PropTypes from "prop-types";

const RegisterForm = ({ onSubmit, loading, error }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // cegah spam saat loading
    if (loading) return;

    // VALIDATION
    if (!form.name || !form.email || !form.password) {
      alert("Semua field wajib diisi");
      return;
    }

    if (form.password.length < 8) {
      alert("Password minimal 8 karakter");
      return;
    }

    onSubmit({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    });
  };

  return (
    <div className="w-full max-w-md bg-[#f5f5f3] p-10 rounded-3xl shadow-lg">
      <h2 className="text-3xl font-semibold text-[#1f1f1f] mb-2">
        Create Account
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        Begin your journey towards zero waste today.
      </p>

      {/* ERROR FROM API */}
      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* NAME */}
        <div>
          <label className="block text-sm mb-2 text-gray-700">Full Name</label>

          <div className="bg-[#d6cfa3] rounded-xl px-4 py-3">
            <input
              type="text"
              name="name"
              placeholder="e.g. Jane Doe"
              value={form.name}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm mb-2 text-gray-700">
            Email Address
          </label>

          <div className="bg-[#d6cfa3] rounded-xl px-4 py-3">
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="jane@example.com"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm mb-2 text-gray-700">Password</label>

          <div className="bg-[#d6cfa3] rounded-xl px-4 py-3">
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-xl text-white font-medium transition ${
            loading
              ? "bg-gray-400"
              : "bg-gradient-to-r from-green-800 to-green-600 hover:opacity-90"
          }`}
        >
          {loading ? "Creating account..." : "Sign Up →"}
        </button>
      </form>
    </div>
  );
};

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

RegisterForm.defaultProps = {
  loading: false,
  error: null,
};

export default RegisterForm;
