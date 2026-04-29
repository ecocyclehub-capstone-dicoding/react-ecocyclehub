import { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ onSubmit, loading, error }) => {
  const [form, setForm] = useState({
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

    // cegah spam klik saat loading
    if (loading) return;

    if (!form.email || !form.password) {
      alert("Email dan password wajib diisi");
      return;
    }

    onSubmit({
      email: form.email.trim(),
      password: form.password,
    });
  };

  return (
    <div className="w-full max-w-md bg-[#f5f5f3] p-10 rounded-3xl shadow-lg">
      <h2 className="text-3xl font-semibold text-[#1f1f1f] mb-2">
        Welcome Back
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        Enter your credentials to access the hub.
      </p>

      {/* ERROR FROM API */}
      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* EMAIL */}
        <div>
          <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
            Email Address
          </label>

          <div className="bg-[#d6cfa3] rounded-xl px-4 py-3">
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="name@company.com"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm mb-2 text-gray-700"
          >
            Password
          </label>

          <div className="bg-[#d6cfa3] rounded-xl px-4 py-3">
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full py-4 rounded-xl text-white font-medium transition bg-gradient-to-r from-green-800 to-green-600 hover:opacity-90"
        >
          {loading ? "Signing in..." : "Sign In to Hub →"}
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

LoginForm.defaultProps = {
  loading: false,
  error: null,
};

export default LoginForm;
