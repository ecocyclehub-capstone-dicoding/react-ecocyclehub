import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { MdRecycling } from "react-icons/md";
import { useAuthContext } from "@/app/provider/AuthProvider";

const Sidebar = ({ sidebar, onFooterButtonClick }) => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <aside className="sticky top-0 flex min-h-screen w-[260px] shrink-0 flex-col justify-between bg-[#0f2419] text-white shadow-2xl shadow-[#0f2419]/10">
      <div>
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1d9e75] text-white">
              <MdRecycling size={26} />
            </div>

            <div>
              <h1 className="text-xl font-bold leading-tight text-white">
                {sidebar.brand}
              </h1>
              <p className="text-xs font-semibold text-[#8fd9be]">
                Bank Sampah Digital
              </p>
            </div>
          </div>
        </div>

        <div className="border-b border-white/10 px-6 py-5">
          <div className="rounded-2xl border border-[#5dcaa5]/30 bg-[#1d9e75]/15 px-4 py-3">
            <p className="mb-1 text-xs text-[#9fe1cb]">Login sebagai</p>
            <h2 className="font-semibold text-[#5dcaa5]">
              {sidebar?.profile?.role || "Member"}
            </h2>
            <p className="mt-1 truncate text-sm text-white/70">
              {sidebar?.profile?.name || "User"}
            </p>
          </div>
        </div>

        <nav className="space-y-1 px-3 py-5">
          {sidebar.menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.label}
                to={menu.path || "#"}
                className={({ isActive }) =>
                  `
                  flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm transition
                  ${
                    isActive
                      ? "border border-[#5dcaa5]/30 bg-[#1d9e75]/25 font-semibold text-[#5dcaa5]"
                      : "border border-transparent text-white/60 hover:bg-white/5 hover:text-white"
                  }
                `
                }
              >
                <Icon size={20} />

                <span>{menu.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-6">
        <button
          type="button"
          onClick={onFooterButtonClick || handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-300/20 bg-red-500/15 py-3 font-semibold text-red-200 transition hover:bg-red-500/25"
        >
          <FiLogOut size={18} />
          {sidebar.buttonText || "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
