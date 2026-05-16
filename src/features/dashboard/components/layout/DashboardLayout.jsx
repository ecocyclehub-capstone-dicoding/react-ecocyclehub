import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import { buildSidebar } from "@/features/dashboard/lib/buildSidebar";

import { useAuthContext } from "@/app/provider/AuthProvider";

const DashboardLayout = ({ sidebar, title, subtitle, children }) => {
  const { user } = useAuthContext();

  const sidebarData = buildSidebar(sidebar, user);

  return (
    <div className="min-h-screen flex bg-[#f5f0e0]">
      <Sidebar sidebar={sidebarData} />

      <main className="flex-1 p-10 overflow-y-auto">
        <Topbar title={title} subtitle={subtitle} />

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
