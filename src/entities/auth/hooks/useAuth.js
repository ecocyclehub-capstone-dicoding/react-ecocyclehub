import { useState } from "react";

import { authApi } from "../api/auth.api";

import { tokenService } from "@/shared/lib/tokenService";

import { userSession } from "@/shared/lib/userSession";

import {
  getDashboardPathByRole,
  getRoleFromLoginResponse,
} from "@/entities/auth/lib/roleRedirect";

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

      const role = getRoleFromLoginResponse(res);

      if (!role) {
        throw new Error("Invalid role received from server");
      }

      const dashboardPath = getDashboardPathByRole(role);

      if (!dashboardPath) {
        throw new Error("Invalid dashboard path");
      }

      const { access_token, refresh_token } = res.data;

      const loggedInUser = {
        ...(res.data?.user || {}),

        role: {
          ...(typeof res.data?.user?.role === "object"
            ? res.data.user.role
            : {}),

          key: role,
        },
      };

      const success = userSession.setUser(loggedInUser, role);

      if (!success) {
        throw new Error("Failed to persist user session");
      }

      tokenService.setTokens(access_token, refresh_token);

      setUser(loggedInUser);

      setMessage(res.message);

      return {
        ...res,
        role,
        dashboardPath,
      };
    } catch (err) {
      const errorData = err.response?.data;

      if (errorData?.errors) {
        if (errorData.errors.non_field_errors) {
          setError(errorData.errors.non_field_errors[0]);

          setFieldErrors({});
        } else {
          setFieldErrors(errorData.errors);

          setError(null);
        }
      } else {
        setError(errorData?.message || err.message || "Login gagal");
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

  const logout = async () => {
    try {
      const refresh = tokenService.getRefreshToken();

      if (refresh) {
        await authApi.logout(refresh);
      }
    } catch (err) {
      console.warn("Logout API failed, forcing local logout");
    } finally {
      tokenService.clearTokens();

      userSession.clearUser();

      setUser(null);
    }
  };

  return {
    login,
    register,
    logout,
    user,
    isAuthenticated: !!user,
    isLoading: loading,
    loading,
    error,
    fieldErrors,
    message,
  };
};
