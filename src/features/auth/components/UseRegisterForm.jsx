import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/entities/auth/api/auth.api";

// ── Validasi lokal ────────────────────────────────────────────────────────
const validate = ({ name, email, password, confirmPassword }) => {
  const errors = {};
  if (!name) errors.name = "Nama wajib diisi";
  if (!email) errors.email = "Email wajib diisi";
  else if (!/\S+@\S+\.\S+/.test(email))
    errors.email = "Format email tidak valid";
  if (!password) errors.password = "Password wajib diisi";
  else if (password.length < 8) errors.password = "Password minimal 8 karakter";
  if (!confirmPassword)
    errors.confirmPassword = "Konfirmasi password wajib diisi";
  else if (password !== confirmPassword)
    errors.confirmPassword = "Password tidak cocok";
  return errors;
};

// ── Mapping error backend → field errors ─────────────────────────────────
// Handle 400 (validation) dan 422 (missing fields)
const parseApiErrors = (err) => {
  const data = err.response?.data;
  if (!data)
    return { apiError: "Terjadi kesalahan. Coba lagi.", fieldErrors: {} };

  // Ada field-level errors (code 400 / 422)
  if (data.errors && typeof data.errors === "object") {
    const fieldErrors = {};
    Object.entries(data.errors).forEach(([field, messages]) => {
      fieldErrors[field] = Array.isArray(messages) ? messages[0] : messages;
    });
    return { apiError: "", fieldErrors };
  }

  // Error general
  return { apiError: data.message || "Registrasi gagal.", fieldErrors: {} };
};

const useRegisterForm = () => {
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (apiError) setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setErrors({});

    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await authApi.register({
        name: fields.name,
        email: fields.email,
        password: fields.password,
      });
      // Berhasil → redirect ke login dengan success message
      navigate("/login", {
        state: { successMessage: "Akun berhasil dibuat! Silakan masuk." },
      });
    } catch (err) {
      const { apiError: msg, fieldErrors } = parseApiErrors(err);
      if (Object.keys(fieldErrors).length) setErrors(fieldErrors);
      else setApiError(msg);
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
    showConfirm,
    handleChange,
    togglePassword: () => setShowPassword((p) => !p),
    toggleConfirm: () => setShowConfirm((p) => !p),
    handleSubmit,
  };
};

export default useRegisterForm;
