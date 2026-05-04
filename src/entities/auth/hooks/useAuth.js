import { useState } from "react";
import { authApi } from "../api/auth.api";
import { tokenService } from "@/shared/lib/tokenService";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const parseError = (err) => {
    if (err.response?.data?.message) {
      return err.response.data.message;
    }

    if (err.response?.data?.errors) {
      return Object.values(err.response.data.errors).flat().join(", ");
    }

    return "Something went wrong";
  };

  const login = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      const data = await authApi.login(payload);

      tokenService.setTokens(data.access_token, data.refresh_token);

      return data;
    } catch (err) {
      const msg = parseError(err);
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      const data = await authApi.register(payload);

      return data;
    } catch (err) {
      const msg = parseError(err);
      setError(msg);
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
  };
};
