import React from "react";
import DashboardLayout from "@/shared/layouts/DashboardLayout";
import HeroSection from "@/features/dashboard/components/HeroSection";
import LevelProgress from "@/features/dashboard/components/LevelProgress";
import TotalPoints from "@/features/dashboard/components/TotalPoints";
import SavingsBalance from "@/features/dashboard/components/SavingsBalance";
import TotalDeposits from "@/features/dashboard/components/TotalDeposits";
import RecentActivity from "@/features/dashboard/components/RecentActivity";
import RedemptionTeaser from "@/features/dashboard/components/RedemptionTeaser";

/* ─── Mock data — replace with real API calls later ─────── */

const MOCK_ACTIVITIES = [
  {
    icon: "glass_cup",
    resourceType: "Glass",
    weightKg: 12.5,
    points: 125,
    value: 3.75,
    date: "May 05, 2026",
    status: "completed",
    statusLabel: "Completed",
  },
  {
    icon: "newspaper",
    resourceType: "Paper",
    weightKg: 8.0,
    points: 80,
    value: 2.40,
    date: "May 02, 2026",
    status: "completed",
    statusLabel: "Completed",
  },
  {
    icon: "shopping_bag",
    resourceType: "Plastic",
    weightKg: 5.3,
    points: 53,
    value: 1.59,
    date: "Apr 28, 2026",
    status: "pending",
    statusLabel: "Pending",
  },
];

/* ───────────────────────────────────────────────────────── */

const DashboardPage = () => {
  // TODO: Replace with real auth/user context
  const userName        = "User Name";
  const totalPoints     = 12480;
  const topPercent      = 5;
  const balance         = 1240.5;
  const totalKg         = 3200;
  const monthlyIncrease = 18;

  const levelData = {
    level: "7",
    tierName: "Eco Champion",
    currentPoints: 480,
    nextLevelPoints: 1000,
    nextReward: "Free Grocery Voucher",
    progressPercent: 48,
  };

  return (
    <DashboardLayout>
      {/* ── Hero ──────────────────────────────────────── */}
      <HeroSection
        userName={userName}
        onDepositWaste={() => console.log("Deposit Waste clicked")}
      />

      {/* ── Bento Grid ────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Row 1 — Gamification */}
        <LevelProgress {...levelData} />
        <TotalPoints totalPoints={totalPoints} topPercent={topPercent} />

        {/* Row 2 — Financial & Weight Stats */}
        <SavingsBalance
          balance={balance}
          onWithdraw={() => console.log("Withdraw clicked")}
        />
        <TotalDeposits
          totalKg={totalKg}
          monthlyIncreasePercent={monthlyIncrease}
        />

        {/* Row 3 — Activity Log */}
        <RecentActivity
          activities={MOCK_ACTIVITIES}
          onViewHistory={() => console.log("View history clicked")}
        />
      </div>

      {/* ── Redemption CTA ────────────────────────────── */}
      <RedemptionTeaser
        onExploreRewards={() => console.log("Explore Rewards clicked")}
        onPartnerStores={() => console.log("Partner Stores clicked")}
      />
    </DashboardLayout>
  );
};

export default DashboardPage;
