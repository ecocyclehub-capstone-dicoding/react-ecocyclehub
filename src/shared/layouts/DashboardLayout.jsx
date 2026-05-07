import React from "react";
import TopNavBar from "@/features/dashboard/components/TopNavBar";
import DashboardFooter from "@/features/dashboard/components/DashboardFooter";

/**
 * DashboardLayout — Wraps all authenticated dashboard pages.
 * Provides the sticky TopNavBar and shared Footer.
 *
 * @param {{ children: React.ReactNode }} props
 */
const DashboardLayout = ({ children }) => {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <TopNavBar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10">
        {children}
      </main>

      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;
