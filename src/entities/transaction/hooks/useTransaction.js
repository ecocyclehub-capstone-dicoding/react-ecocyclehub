import { useCallback, useState } from "react";

import { transactionApi } from "../api/transaction.api";

import { getApiErrorMessage } from "@/shared/lib/apiError";

export const useTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [isFetching, setIsFetching] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const [error, setError] = useState(null);

  const [fieldErrors, setFieldErrors] = useState({});

  const getTransactions = useCallback(async (params = {}) => {
    try {
      setIsFetching(true);
      setError(null);

      const res = await transactionApi.getAll(params);

      setTransactions(res.data || []);
      setPagination(res.pagination || null);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to fetch transactions"));
    } finally {
      setIsFetching(false);
    }
  }, []);

  const getTransactionHistory = useCallback(async () => {
    try {
      setIsFetching(true);
      setError(null);

      const res = await transactionApi.getHistory();

      setTransactions(res.data || []);
      setPagination(res.pagination || null);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to fetch transaction history"));
    } finally {
      setIsFetching(false);
    }
  }, []);

  const createTransaction = async (payload, refreshParams) => {
    try {
      setIsMutating(true);
      setError(null);
      setFieldErrors({});

      const res = await transactionApi.create(payload);

      await getTransactions(refreshParams);

      return res;
    } catch (err) {
      const res = err.response?.data;

      if (res?.errors) {
        setFieldErrors(res.errors);
      } else {
        setError(getApiErrorMessage(err, "Failed to create transaction"));
      }

      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  const verifyTransaction = async (id) => {
    try {
      setIsMutating(true);
      setError(null);

      const res = await transactionApi.verify(id);

      setTransactions((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: "verified",
              }
            : item,
        ),
      );

      return res;
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to verify transaction"));

      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  const rejectTransaction = async (id) => {
    try {
      setIsMutating(true);
      setError(null);

      const res = await transactionApi.reject(id);

      setTransactions((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: "rejected",
              }
            : item,
        ),
      );

      return res;
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to reject transaction"));

      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  const loading = isFetching || isMutating;

  return {
    transactions,
    pagination,

    loading,
    isFetching,
    isMutating,

    error,
    fieldErrors,

    getTransactions,
    getTransactionHistory,

    createTransaction,

    verifyTransaction,
    rejectTransaction,
  };
};
