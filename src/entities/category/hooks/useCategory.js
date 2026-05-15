import { useEffect, useState } from "react";

import { categoryApi } from "../api/category.api";

export const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState(null);

  const getCategories = async () => {
    try {
      setIsFetching(true);

      const res = await categoryApi.getCategories();

      setCategories(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch categories");
    } finally {
      setIsFetching(false);
    }
  };

  const createCategory = async (payload) => {
    try {
      setIsMutating(true);
      const res = await categoryApi.createCategory(payload);

      await getCategories();

      return res;
    } catch (err) {
      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  const updateCategory = async (id, payload) => {
    try {
      const res = await categoryApi.updateCategory(id, payload);

      await getCategories();

      return res;
    } catch (err) {
      throw err;
    }
  };

  const deleteCategory = async (id) => {
    try {
      await categoryApi.deleteCategory(id);

      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return {
    categories,
    isFetching,
    isMutating,
    error,

    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
