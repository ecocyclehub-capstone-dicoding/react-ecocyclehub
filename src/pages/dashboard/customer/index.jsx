import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import ProgressCard from "@/features/dashboard/components/cards/ProgressCard";
import RewardCard from "@/features/dashboard/components/cards/RewardCard";
import SectionWrapper from "@/features/dashboard/components/common/SectionWrapper";
import TransactionTable from "@/features/dashboard/components/sections/TransactionTable";
import RedeemBanner from "@/features/dashboard/components/sections/RedeemBanner";
import { customerSidebar } from "@/features/dashboard/components/configs/customer.config";

const transactions = [
  {
    id: 1,
    date: "12 May 2026",
    category: "Plastic",
    weight: "12 Kg",
    points: "240",
    status: "Processed",
  },
  {
    id: 2,
    date: "10 May 2026",
    category: "Glass",
    weight: "4 Kg",
    points: "80",
    status: "Verified",
  },
];

const CustomerDashboardPage = () => {
  return (
    <DashboardLayout
      sidebar={customerSidebar}
      title="Customer Dashboard"
      subtitle="Track your eco contribution"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ProgressCard level="Gold Member" current={820} total={1000} />

        <RewardCard
          title="Total Points"
          value="820"
          subtitle="Available eco points"
          dark
        />

        <RewardCard
          title="Total Deposits"
          value="52"
          subtitle="Successful waste deposits"
        />
      </div>

      <SectionWrapper title="Recent Activity" action="View History">
        <TransactionTable items={transactions} />
      </SectionWrapper>

      <RedeemBanner />
    </DashboardLayout>
  );
};

export default CustomerDashboardPage;
