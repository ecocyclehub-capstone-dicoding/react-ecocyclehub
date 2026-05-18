import { useCallback, useEffect, useState } from "react";

import { gamificationApi } from "../api/gamification.api";

export const useGamification = () => {
  const [levels, setLevels] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const getLevels = useCallback(async () => {
    try {
      setError(null);
      setIsFetching(true);

      const res = await gamificationApi.getLevels();

      setLevels(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch levels");
    } finally {
      setIsFetching(false);
    }
  }, []);

  const createLevel = async (payload) => {
    try {
      setError(null);
      setFieldErrors({});
      setIsMutating(true);

      const res = await gamificationApi.createLevel(payload);

      setLevels((current) => [...current, res.data]);

      return res;
    } catch (err) {
      const response = err.response?.data;

      setFieldErrors(response?.errors || {});
      setError(response?.message || "Failed to create level");

      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  const updateLevel = async (id, payload) => {
    try {
      setError(null);
      setFieldErrors({});
      setIsMutating(true);

      const res = await gamificationApi.updateLevel(id, payload);

      setLevels((current) =>
        current.map((level) => (level.id === id ? res.data : level)),
      );

      return res;
    } catch (err) {
      const response = err.response?.data;

      setFieldErrors(response?.errors || {});
      setError(response?.message || "Failed to update level");

      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  const deleteLevel = async (id) => {
    try {
      setError(null);
      setFieldErrors({});
      setIsMutating(true);

      await gamificationApi.deleteLevel(id);

      setLevels((current) => current.filter((level) => level.id !== id));
    } catch (err) {
      const response = err.response?.data;

      setError(response?.message || "Failed to delete level");

      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      getLevels();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [getLevels]);

  return {
    levels,
    isFetching,
    isMutating,
    error,
    fieldErrors,
    getLevels,
    createLevel,
    updateLevel,
    deleteLevel,
  };
};
