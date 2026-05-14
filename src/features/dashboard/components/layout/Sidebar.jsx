import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebar }) => {
  return (
    <aside className="w-[250px] bg-[#d9d4aa] min-h-screen flex flex-col justify-between">
      <div>
        {/* BRAND */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#0d4f2c]">{sidebar.brand}</h1>
        </div>

        {/* PROFILE */}
        <div className="px-6 flex items-center gap-4 mb-10">
          <img
            src={sidebar.profile.avatar}
            alt={sidebar.profile.name}
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>
            <h2 className="font-bold">{sidebar.profile.name}</h2>

            <p className="text-sm text-gray-600">{sidebar.profile.role}</p>
          </div>
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
        <button className="w-full bg-[#1f6a32] text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition">
          {sidebar.buttonText}
        </button>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  sidebar: PropTypes.shape({
    brand: PropTypes.string.isRequired,

    profile: PropTypes.shape({
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,

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
