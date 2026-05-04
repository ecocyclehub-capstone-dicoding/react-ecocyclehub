import { useState } from "react";
import PropTypes from "prop-types";

const RegisterForm = ({ onSubmit, loading, error }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [localError, setLocalError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setLocalError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    if (!form.name || !form.email || !form.password) {
      setLocalError("Semua field wajib diisi");
      return;
    }

    if (form.password.length < 8) {
      setLocalError("Password minimal 8 karakter");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setLocalError("Password tidak sama");
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
      <h2 className="text-3xl font-semibold mb-2">Create Account</h2>

      <p className="text-sm text-gray-500 mb-6">
        Begin your journey towards zero waste today.
      </p>

      {/* ERROR */}
      {(error || localError) && (
        <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-lg">
          {error || localError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* NAME */}
        <div>
          <label className="text-sm mb-2 block">Full Name</label>
          <div className="bg-[#d6cfa3] rounded-xl px-4 py-3">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm mb-2 block">Email</label>
          <div className="bg-[#d6cfa3] rounded-xl px-4 py-3">
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm mb-2 block">Password</label>
          <div className="bg-[#d6cfa3] rounded-xl px-4 py-3">
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="text-sm mb-2 block">Confirm Password</label>
          <div className="bg-[#d6cfa3] rounded-xl px-4 py-3">
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full py-4 rounded-xl text-white bg-gradient-to-r from-green-800 to-green-600"
        >
          {loading ? "Signing up..." : "Sign Up →"}
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
