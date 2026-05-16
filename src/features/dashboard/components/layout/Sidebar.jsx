import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
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
    <aside className="w-[250px] bg-[#d9d4aa] min-h-screen flex flex-col justify-between">
      <div>
        {/* BRAND */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#0d4f2c]">{sidebar.brand}</h1>
        </div>

        {/* PROFILE */}
        <div className="px-6 mb-10">
          <h2 className="font-bold text-lg text-[#0d4f2c]">
            {sidebar?.profile?.name || "User"}
          </h2>

          <p className="text-sm text-gray-600 capitalize">
            {sidebar?.profile?.role || "Member"}
          </p>
        </div>

        {/* MENUS */}
        <nav className="space-y-2">
          {sidebar.menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.label}
                to={menu.path || "#"}
                className={({ isActive }) =>
                  `
                  w-full flex items-center gap-4 px-7 py-4 transition
                  ${
                    isActive
                      ? "bg-[#f6f0cf] border-l-4 border-[#0d4f2c] text-[#0d4f2c] font-semibold"
                      : "text-[#6a653c] hover:bg-[#ece6c3]"
                  }
                `
                }
              >
                <Icon size={22} />

                <span>{menu.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* BUTTON */}
      <div className="p-6">
        <button
          type="button"
          onClick={onFooterButtonClick || handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-4 rounded-2xl font-semibold hover:bg-red-700 transition"
        >
          <FiLogOut size={18} />
          {sidebar.buttonText || "Logout"}
        </button>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  onFooterButtonClick: PropTypes.func,

  sidebar: PropTypes.shape({
    brand: PropTypes.string.isRequired,

    profile: PropTypes.shape({
      name: PropTypes.string,
      role: PropTypes.string,
    }),

    menus: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        icon: PropTypes.elementType.isRequired,
        path: PropTypes.string,
      }),
    ).isRequired,

    buttonText: PropTypes.string.isRequired,
  }).isRequired,
};

export default Sidebar;
