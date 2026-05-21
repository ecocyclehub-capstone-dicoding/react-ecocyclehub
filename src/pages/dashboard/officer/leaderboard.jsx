import { useEffect } from "react";

import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";

import { officerSidebar } from "@/features/dashboard/components/configs/officer.config";

import StatusBadge from "@/features/dashboard/components/common/StatusBadge";

import { useLeaderboard } from "@/entities/leaderboard/hooks/useLeaderboard";

import { formatNumber } from "@/shared/lib/formatters";

const medals = ["🥇", "🥈", "🥉"];

const AdminLeaderboardPage = () => {
  const { leaderboard, isFetching, error } = useLeaderboard(10);

  return (
    <DashboardLayout
      sidebar={officerSidebar}
      title="Papan Peringkat"
      subtitle="Bandingkan kontribusi poin dengan nasabah lain."
    >
      <div className="overflow-hidden rounded-2xl border border-[#ded6ad] bg-white shadow-sm">
        <table className="w-full min-w-[620px] text-sm">
          <thead className="bg-[#f5f0e0] text-left text-gray-500">
            <tr>
              <th className="p-4 font-semibold">#</th>

              <th className="p-4 font-semibold">Nama</th>

              <th className="p-4 font-semibold">Level</th>

              <th className="p-4 text-right font-semibold">Poin</th>
            </tr>
          </thead>

          <tbody>
            {isFetching && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  Loading leaderboard...
                </td>
              </tr>
            )}

            {error && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-red-500">
                  {error}
                </td>
              </tr>
            )}

            {!isFetching && !error && leaderboard.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  Belum ada data leaderboard.
                </td>
              </tr>
            )}

            {!isFetching &&
              !error &&
              leaderboard.map((item, index) => (
                <tr key={item.user.id} className="border-t border-gray-100">
                  <td className="p-4 font-bold text-[#0d4f2c]">
                    {medals[index] || item.rank}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e1f5ee] font-bold text-[#0f6e56]">
                        {item.user.name?.charAt(0)}
                      </div>

                      <span className="font-semibold text-[#173c28]">
                        {item.user.name}
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    <StatusBadge status={item.level?.name} />
                  </td>

                  <td className="p-4 text-right font-bold text-[#639922]">
                    {formatNumber(item.points)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default AdminLeaderboardPage;
