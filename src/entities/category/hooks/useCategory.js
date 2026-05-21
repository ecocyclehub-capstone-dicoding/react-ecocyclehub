import { useCallback, useEffect, useState } from "react";

import { categoryApi } from "../api/category.api";
import { getApiErrorMessage } from "@/shared/lib/apiError";

export const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState(null);

  const getCategories = useCallback(async () => {
    try {
      setError(null);
      setIsFetching(true);

      const res = await categoryApi.getCategories();

      setCategories(res.data || []);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to fetch categories"));
    } finally {
      setIsFetching(false);
    }
  }, []);

  const createCategory = async (payload) => {
    try {
      setIsMutating(true);
      const res = await categoryApi.createCategory(payload);

      await getCategories();

      return res;
    } finally {
      setIsMutating(false);
    }
  };

  const updateCategory = async (id, payload) => {
    try {
      setIsMutating(true);
      const res = await categoryApi.updateCategory(id, payload);

      await getCategories();

      return res;
    } finally {
      setIsMutating(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      setIsMutating(true);
      await categoryApi.deleteCategory(id);

      setCategories((prev) => prev.filter((item) => item.id !== id));
    } finally {
      setIsMutating(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      getCategories();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [getCategories]);

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
