import { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ onSubmit, loading, error, fieldErrors }) => {
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

    if (loading) return;

    onSubmit({
      email: form.email.trim(),
      password: form.password,
    });
  };

  const hasFieldErrors = Object.keys(fieldErrors || {}).length > 0;

  return (
    <div className="w-full max-w-md bg-[#f5f5f3] p-10 rounded-3xl shadow-lg">
      <h2 className="text-3xl font-semibold mb-2">Welcome Back</h2>

      <p className="text-sm text-gray-500 mb-6">
        Enter your credentials to access the hub.
      </p>

      {/* GLOBAL ERROR */}
      {!hasFieldErrors && error && (
        <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
              placeholder="name@company.com"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          {fieldErrors?.email && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.email[0]}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm mb-2 text-gray-700">Password</label>

          <div className="bg-[#d6cfa3] rounded-xl px-4 py-3">
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          {fieldErrors?.password && (
            <p className="text-xs text-red-500 mt-1">
              {fieldErrors.password[0]}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl text-white bg-gradient-to-r from-green-800 to-green-600 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In →"}
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  fieldErrors: PropTypes.object,
};

LoginForm.defaultProps = {
  loading: false,
  error: null,
  fieldErrors: {},
};

export default LoginForm;
