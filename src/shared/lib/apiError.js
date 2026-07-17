export const getApiErrorMessage = (error, fallback = "Something went wrong") =>
  error?.response?.data?.detail ||
  error?.response?.data?.message ||
  error?.message ||
  fallback;

export const getApiFieldErrors = (error) => error?.response?.data?.errors || {};

export const getFirstError = (errors, field) => {
  const value = errors?.[field];
  return Array.isArray(value) ? value[0] : value || "";
};
