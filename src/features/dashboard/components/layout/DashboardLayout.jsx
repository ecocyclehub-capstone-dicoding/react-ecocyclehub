import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = ({ sidebar, title, subtitle, children }) => {
  return (
    <div className="min-h-screen flex bg-[#f5f0e0]">
      <Sidebar sidebar={sidebar} />

      <main className="flex-1 p-10 overflow-y-auto">
        <Topbar title={title} subtitle={subtitle} />

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
