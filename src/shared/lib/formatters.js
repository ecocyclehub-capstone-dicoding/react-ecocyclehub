export const formatNumber = (value) =>
  Number(value || 0).toLocaleString("id-ID");

export const formatCurrency = (value) => `Rp ${formatNumber(value)}`;

export const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
