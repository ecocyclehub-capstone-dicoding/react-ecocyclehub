import { useCallback, useEffect, useState } from "react";
import { userApi } from "../api/user.api";
import { mapUser } from "../models/user.model";

export const useUser = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await userApi.getUsers();
      const list = Array.isArray(res) ? res : (res?.data ?? res?.results ?? []);
      const mapped = list.map(mapUser);
      setUsers(mapped);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed get users");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = async (id, data) => {
    try {
      setError(null);
      await userApi.updateUser(id, data);
      await getUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user");
      throw err;
    }
  };

  const deleteUser = async (id) => {
    try {
      setError(null);
      await userApi.deleteUser(id);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
      throw err;
    }
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return {
    users,
    loading,
    error,
    getUsers,
    updateUser,
    deleteUser,
  };
};
