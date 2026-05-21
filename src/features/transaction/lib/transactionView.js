export const getTransactionActorLabel = (transaction, keys) => {
  for (const key of keys) {
    const value = transaction?.[key];

    if (!value) continue;

    if (typeof value === "object") {
      return value.name || value.email || value.id || "-";
    }

    const stringValue = String(value);

    return stringValue.length > 16 ? stringValue.slice(0, 8) : stringValue;
  }

  return "-";
};

export const getTransactionPoints = (transaction) =>
  transaction.total_points ?? transaction.total_point ?? 0;

export const getTransactionDetailPrice = (detail) =>
  detail.price ?? detail.total_price;
