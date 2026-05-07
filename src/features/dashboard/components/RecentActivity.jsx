import React from "react";

/**
 * Status badge variant mapping.
 * @type {Record<string, string>}
 */
const STATUS_STYLES = {
  completed: "bg-secondary-fixed/50 text-on-secondary-fixed",
  pending:   "bg-tertiary-fixed text-on-tertiary-fixed",
  cancelled: "bg-error-container text-on-error-container",
};

/**
 * A single row in the activity table.
 * @param {{
 *   icon: string,
 *   resourceType: string,
 *   weightKg: number,
 *   points: number,
 *   value: number,
 *   date: string,
 *   status: "completed" | "pending" | "cancelled",
 *   statusLabel: string
 * }} props
 */
const ActivityRow = ({ icon, resourceType, weightKg, points, value, date, status, statusLabel }) => {
  const badgeClass = STATUS_STYLES[status] ?? STATUS_STYLES.pending;

  return (
    <tr className="hover:bg-surface-container-low transition-colors">
      {/* Resource */}
      <td className="px-8 py-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary">{icon}</span>
          <span className="font-semibold text-on-surface">{resourceType}</span>
        </div>
      </td>

      {/* Weight */}
      <td className="px-8 py-6 font-medium">{weightKg.toFixed(1)} kg</td>

      {/* Points */}
      <td className="px-8 py-6 text-primary font-bold">+{points} pts</td>

      {/* Value */}
      <td className="px-8 py-6 font-bold">
        ${value.toFixed(2)}
      </td>

      {/* Date */}
      <td className="px-8 py-6 text-outline text-sm">{date}</td>

      {/* Status */}
      <td className="px-8 py-6">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeClass}`}>
          {statusLabel}
        </span>
      </td>
    </tr>
  );
};

/* ─────────────────────────────────────────────────────────── */

/**
 * RecentActivity — Full-width activity log table.
 * @param {{ activities: ActivityRow[], onViewHistory: () => void }} props
 */
const RecentActivity = ({ activities = [], onViewHistory }) => {
  return (
    <div className="md:col-span-12 mt-4">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Recent Activity</h2>
        <button
          onClick={onViewHistory}
          className="text-sm font-bold text-primary flex items-center gap-1 cursor-pointer hover:underline"
        >
          View History
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl overflow-hidden border border-outline-variant/15">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-container-low text-outline text-xs uppercase tracking-widest font-bold">
              <th className="px-8 py-4">Resource</th>
              <th className="px-8 py-4">Weight / Qty</th>
              <th className="px-8 py-4">Points</th>
              <th className="px-8 py-4">Value</th>
              <th className="px-8 py-4">Date</th>
              <th className="px-8 py-4">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-surface-container">
            {activities.map((activity, idx) => (
              <ActivityRow key={idx} {...activity} />
            ))}

            {activities.length === 0 && (
              <tr>
                <td colSpan={6} className="px-8 py-12 text-center text-outline text-sm">
                  No recent activity found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivity;
