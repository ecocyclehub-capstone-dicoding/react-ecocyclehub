import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/entities/auth/api/auth.api";
import useAuth from "@/entities/auth/hooks/useAuth";

// ── Validasi lokal ────────────────────────────────────────────────────────
const validate = ({ email, password }) => {
  const errors = {};
  if (!email) errors.email = "Email wajib diisi";
  else if (!/\S+@\S+\.\S+/.test(email))
    errors.email = "Format email tidak valid";
  if (!password) errors.password = "Password wajib diisi";
  return errors;
};

// ── Mapping error dari backend ────────────────────────────────────────────
const parseApiError = (err) => {
  const data = err.response?.data;
  if (!data) return "Terjadi kesalahan. Coba lagi.";

  // Response 401: { message: "Invalid email or password" }
  if (data.message) return data.message;

  return "Login gagal. Periksa email dan password.";
};

const useLoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [fields, setFields] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (apiError) setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      // authApi.login simpan token, return { access_token, refresh_token, role }
      const data = await authApi.login(fields);

      // role.key: 'customer' | 'admin' | dst
      setUser({ role: data.role });

      const destination =
        data.role.key === "admin" ? "/admin/dashboard" : "/dashboard";
      navigate(destination, { replace: true });
    } catch (err) {
      setApiError(parseApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fields,
    errors,
    apiError,
    isLoading,
    showPassword,
    handleChange,
    togglePassword: () => setShowPassword((p) => !p),
    handleSubmit,
  };
};

export default useLoginForm;
