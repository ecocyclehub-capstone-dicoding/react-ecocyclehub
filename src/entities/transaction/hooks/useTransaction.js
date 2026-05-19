import { useCallback, useState } from "react";
import { transactionApi } from "../api/transaction.api";
import { getApiErrorMessage } from "@/shared/lib/apiError";

export const useTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [fieldErrors, setFieldErrors] = useState({});

  const getTransactions = useCallback(async (params = {}) => {
    try {
      setLoading(true);

      const res = await transactionApi.getAll(params);

      setTransactions(res.data || []);
      setPagination(res.pagination || null);
      setError(null);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to fetch transactions"));
    } finally {
      setLoading(false);
    }
  }, []);

  const getTransactionHistory = useCallback(async () => {
    try {
      setLoading(true);

      const res = await transactionApi.getHistory();

      setTransactions(res.data || []);
      setPagination(res.pagination || null);
      setError(null);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to fetch transaction history"));
    } finally {
      setLoading(false);
    }
  }, []);

  const createTransaction = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      setFieldErrors({});

      const res = await transactionApi.create(payload);

      await getTransactions();

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
      setLoading(false);
    }
  };

  const verifyTransaction = async (id) => {
    try {
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
    }
  };

  return {
    transactions,
    pagination,
    loading,
    error,
    fieldErrors,
    getTransactions,
    getTransactionHistory,
    createTransaction,
    verifyTransaction,
  };
};
