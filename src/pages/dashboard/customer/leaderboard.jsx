import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import { customerSidebar } from "@/features/dashboard/components/configs/customer.config";
import StatusBadge from "@/features/dashboard/components/common/StatusBadge";
import { formatNumber } from "@/shared/lib/formatters";

const leaderboard = [
  { id: 1, name: "Bambang S.", points: 4500, level: "Earth Guardian" },
  { id: 2, name: "Rani W.", points: 3200, level: "Recycling Hero" },
  { id: 3, name: "Andi S.", points: 1850, level: "Earth Guardian" },
  { id: 4, name: "Dewi M.", points: 1200, level: "Eco Ranger" },
  { id: 5, name: "Fadli R.", points: 980, level: "Eco Ranger" },
];

const medals = ["1", "2", "3"];

const CustomerLeaderboardPage = () => {
  return (
    <DashboardLayout
      sidebar={customerSidebar}
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
            {leaderboard.map((item, index) => (
              <tr key={item.id} className="border-t border-gray-100">
                <td className="p-4 font-bold text-[#0d4f2c]">
                  {medals[index] || index + 1}
                </td>
                <td className="p-4 font-semibold text-[#173c28]">
                  {item.name}
                </td>
                <td className="p-4">
                  <StatusBadge status={item.level} />
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

export default CustomerLeaderboardPage;
