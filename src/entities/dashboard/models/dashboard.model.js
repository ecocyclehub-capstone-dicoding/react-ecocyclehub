export const mapAdminStats = (data) => ({
  totalCustomers: data.total_customers || 0,
  totalTransactions: data.total_transactions || 0,
  totalWeight: data.total_weight || 0,
  totalRevenue: data.total_revenue || 0,
});

export const mapRecentTransaction = (item) => ({
  id: item.id,
  category: item.category,
  weight: item.total_weight,
  points: item.total_point,
  status: item.status,
  date: item.created_at,
});
