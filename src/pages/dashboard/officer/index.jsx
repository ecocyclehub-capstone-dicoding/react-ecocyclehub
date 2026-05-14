import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import StatCard from "@/features/dashboard/components/cards/StatCard";
import SectionWrapper from "@/features/dashboard/components/common/SectionWrapper";
import TransactionList from "@/features/dashboard/components/sections/TransactionList";
import Leaderboard from "@/features/dashboard/components/sections/Leaderboard";
import BadgeGrid from "@/features/dashboard/components/sections/BadgeGrid";
import { officerSidebar } from "@/features/dashboard/components/configs/officer.config";

const transactions = [
  {
    id: 1,
    title: "Plastic Collection",
    date: "12 May 2026",
    weight: "120 Kg",
    status: "Processed",
  },
  {
    id: 2,
    title: "Paper Collection",
    date: "11 May 2026",
    weight: "90 Kg",
    status: "Pending",
  },
];

const users = [
  {
    id: 1,
    name: "Elena",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    points: "1200 pts",
  },
  {
    id: 2,
    name: "Michael",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    points: "980 pts",
  },
];

const badges = [
  {
    id: 1,
    icon: "🏆",
    name: "Top Collector",
    bg: "bg-yellow-200",
  },
  {
    id: 2,
    icon: "🌱",
    name: "Eco Warrior",
    bg: "bg-green-200",
  },
  {
    id: 3,
    icon: "♻️",
    name: "Recycler",
    bg: "bg-blue-200",
  },
];

const OfficerDashboardPage = () => {
  return (
    <DashboardLayout
      sidebar={officerSidebar}
      title="Officer Dashboard"
      subtitle="Monitor waste operations"
    >
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="Collections" value="248" icon="🚛" />

        <StatCard title="Waste Volume" value="3.2T" icon="♻️" />

        <StatCard title="Customers" value="840" icon="👥" />

        <StatCard title="Performance" value="98%" icon="📈" dark />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <SectionWrapper title="Recent Collections">
          <TransactionList items={transactions} />
        </SectionWrapper>

        <SectionWrapper title="Top Contributors">
          <Leaderboard users={users} />
        </SectionWrapper>

        <SectionWrapper title="Achievement Badges">
          <BadgeGrid badges={badges} />
        </SectionWrapper>
      </div>
    </DashboardLayout>
  );
};

export default OfficerDashboardPage;
