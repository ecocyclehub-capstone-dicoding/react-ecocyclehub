import { useEffect, useState } from "react";
import { customerApi } from "../api/customer.api";
import { mapCustomer } from "../models/customer.model";

export const useCustomer = () => {
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const getCustomers = async () => {
    try {
      setLoading(true);

      const res = await customerApi.getCustomers();

      const mapped = res.data.map(mapCustomer);

      setCustomers(mapped);
    } catch (err) {
      setError(err.response?.data?.message || "Failed get customers");
    } finally {
      setLoading(false);
    }
  };

  const updateCustomer = async (id, data) => {
    try {
      await customerApi.updateCustomer(id, data);

      await getCustomers();
    } catch (err) {
      throw err;
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await customerApi.deleteCustomer(id);

      setCustomers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return {
    customers,
    loading,
    error,
    getCustomers,
    updateCustomer,
    deleteCustomer,
  };
};
