import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import StatCard from "@/features/dashboard/components/cards/StatCard";
import SectionWrapper from "@/features/dashboard/components/common/SectionWrapper";
import TransactionTable from "@/features/dashboard/components/sections/TransactionTable";
import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";
import {
  HiUsers,
  HiDocumentText,
  HiArrowPath,
  HiCurrencyDollar,
} from "react-icons/hi2";

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
    date: "11 May 2026",
    category: "Paper",
    weight: "8 Kg",
    points: "120",
    status: "Pending",
  },
];

const AdminDashboardPage = () => {
  return (
    <DashboardLayout
      sidebar={adminSidebar}
      title="Admin Dashboard"
      subtitle="Operational Overview"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Customers"
          value="1,245"
          icon={<HiUsers size={24} />}
        />

        <StatCard
          title="Transactions"
          value="328"
          icon={<HiDocumentText size={24} />}
        />

        <StatCard
          title="Waste Volume"
          value="5,420 kg"
          icon={<HiArrowPath size={24} />}
        />

        <StatCard
          title="Revenue"
          value="Rp 12.45M"
          icon={<HiCurrencyDollar size={24} />}
          dark
        />
      </div>

      <SectionWrapper title="Recent Transactions" action="View All">
        <TransactionTable items={transactions} />
      </SectionWrapper>
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
