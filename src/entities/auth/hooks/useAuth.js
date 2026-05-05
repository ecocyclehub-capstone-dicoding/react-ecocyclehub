import { useState } from "react";
import { authApi } from "../api/auth.api";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState(null);

  const login = async (data) => {
    try {
      setLoading(true);
      setError(null);
      setFieldErrors({});
      setMessage(null);

      const res = await authApi.login(data);

      const { access_token, refresh_token } = res.data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      setMessage(res.message);

      return res;
    } catch (err) {
      const res = err.response?.data;

      if (res?.errors) {
        if (res.errors.non_field_errors) {
          setError(res.errors.non_field_errors[0]);
          setFieldErrors({});
        } else {
          setFieldErrors(res.errors);
          setError(null);
        }
      } else {
        setError(res?.message || "Login gagal");
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    try {
      setLoading(true);
      setError(null);
      setFieldErrors({});
      setMessage(null);

      const res = await authApi.register(data);

      setMessage(res.data.message);

      return res.data;
    } catch (err) {
      const res = err.response?.data;

      if (res?.errors) {
        setFieldErrors(res.errors);
        setError(null);
      } else {
        setError(res?.message || "Registrasi gagal");
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    loading,
    error,
    fieldErrors,
    message,
  };
};
