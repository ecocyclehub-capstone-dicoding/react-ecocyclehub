import { useCallback, useEffect, useState } from "react";

import { userApi } from "../api/user.api";

import { getApiErrorMessage } from "@/shared/lib/apiError";

export const useUser = () => {
  const [users, setUsers] = useState([]);

  const [pagination, setPagination] = useState(null);

  const [isFetching, setIsFetching] = useState(false);

  const [isMutating, setIsMutating] = useState(false);

  const [error, setError] = useState(null);

  const getUsers = useCallback(async (params = {}) => {
    try {
      setIsFetching(true);

      const res = await userApi.getUsers(params);

      setUsers(res.data || []);

      setPagination(res.pagination || null);

      setError(null);

      return res;
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to fetch users"));

      throw err;
    } finally {
      setIsFetching(false);
    }
  }, []);

  const createUser = async (payload) => {
    try {
      setError(null);

      setIsMutating(true);

      const res = await userApi.createUser(payload);

      return res;
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to create user"));

      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  const updateUser = async (id, payload) => {
    try {
      setError(null);

      setIsMutating(true);

      const res = await userApi.updateUser(id, payload);

      return res;
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to update user"));

      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setError(null);

      setIsMutating(true);

      const res = await userApi.deleteUser(id);

      return res;
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to delete user"));

      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      getUsers();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [getUsers]);

  const loading = isFetching || isMutating;

  return {
    users,
    pagination,

    loading,
    isFetching,
    isMutating,

    error,

    getUsers,

    createUser,
    updateUser,
    deleteUser,
  };
};
