import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import { buildSidebar } from "@/features/dashboard/lib/buildSidebar";

import { useAuthContext } from "@/app/provider/AuthProvider";

const DashboardLayout = ({ sidebar, title, subtitle, children }) => {
  const { user } = useAuthContext();

  const sidebarData = buildSidebar(sidebar, user);

  return (
    <div className="flex min-h-screen bg-[#f5f0e0] text-[#173c28]">
      <Sidebar sidebar={sidebarData} />

      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-10">
        {(title || subtitle) && <Topbar title={title} subtitle={subtitle} />}

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
