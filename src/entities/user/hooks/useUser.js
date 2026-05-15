import { useEffect, useState } from "react";
import { userApi } from "../api/user.api";

export const useUser = () => {
  const [users, setUsers] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const [isMutating, setIsMutating] = useState(false);

  const [error, setError] = useState(null);

  const getUsers = async () => {
    try {
      setIsFetching(true);

      const res = await userApi.getUsers();

      setUsers(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setIsFetching(false);
    }
  };

  const createUser = async (payload) => {
    try {
      setIsMutating(true);

      const res = await userApi.createUser(payload);

      setUsers((prev) => [res.data, ...prev]);

      return res;
    } finally {
      setIsMutating(false);
    }
  };

  const updateUser = async (id, payload) => {
    try {
      setIsMutating(true);

      const res = await userApi.updateUser(id, payload);

      setUsers((prev) =>
        prev.map((item) => (item.id === id ? res.data : item)),
      );

      return res;
    } finally {
      setIsMutating(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setIsMutating(true);

      await userApi.deleteUser(id);

      setUsers((prev) => prev.filter((item) => item.id !== id));
    } finally {
      setIsMutating(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return {
    users,

    isFetching,
    isMutating,

    error,

    getUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};
