import { useState } from "react";
import { authApi } from "../api/auth.api";
import { getRoleFromLoginResponse } from "../lib/roleRedirect";
import { tokenService } from "@/shared/lib/tokenService";
import { userSession } from "@/shared/lib/userSession";

export const useAuth = () => {
  const [user, setUser] = useState(() => userSession.getUser());
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
      const role = getRoleFromLoginResponse(res);
      if (!role) {
        throw new Error("Invalid role received from server");
      }
      const loggedInUser = {
        ...(res.data?.user || {}),
        role: {
          ...(typeof res.data?.user?.role === "object"
            ? res.data.user.role
            : {}),
          key: role,
        },
      };

      tokenService.setTokens(access_token, refresh_token);
      userSession.setUser(loggedInUser, role);
      setUser(loggedInUser);

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
    user,
    isAuthenticated: Boolean(tokenService.getAccessToken()),
    isLoading: loading,
    loading,
    error,
    fieldErrors,
    message,
  };
};
