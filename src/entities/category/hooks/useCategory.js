import { useCallback, useState } from "react";

import { categoryApi } from "../api/category.api";

import { getApiErrorMessage } from "@/shared/lib/apiError";

export const useCategory = () => {
  const [categories, setCategories] = useState([]);

  const [pagination, setPagination] = useState(null);

  const [isFetching, setIsFetching] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const [error, setError] = useState(null);

  const getCategories = useCallback(async (params = {}) => {
    try {
      setIsFetching(true);

      const res = await categoryApi.getCategories(params);

      setCategories(res.data || []);
      setPagination(res.pagination || null);

      setError(null);
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

      return res;
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to create category"));

      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  const updateCategory = async (id, payload) => {
    try {
      setIsMutating(true);

      const res = await categoryApi.updateCategory(id, payload);

      return res;
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to update category"));

      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      setIsMutating(true);

      const res = await categoryApi.deleteCategory(id);

      return res;
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to delete category"));

      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  return {
    categories,
    pagination,

    isFetching,
    isMutating,

    error,

    getCategories,

    createCategory,
    updateCategory,
    deleteCategory,
  };
};
