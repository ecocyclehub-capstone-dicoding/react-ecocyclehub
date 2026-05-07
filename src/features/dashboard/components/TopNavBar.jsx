import React from "react";
import { Link, NavLink } from "react-router-dom";

const TopNavBar = () => {
  return (
    <header className="w-full sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-outline-variant/20">
      <div className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
        {/* Brand + Nav Links */}
        <div className="flex items-center gap-8">
          <Link
            to="/dashboard"
            className="text-2xl font-black text-primary tracking-tighter font-headline"
          >
            EcoCycle Hub
          </Link>

          <nav className="hidden md:flex gap-6 items-center">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold font-headline tracking-tight text-lg"
                  : "text-on-surface font-headline font-bold tracking-tight text-lg hover:bg-surface-container-low transition-colors px-3 py-1 rounded-lg"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold font-headline tracking-tight text-lg"
                  : "text-on-surface font-headline font-bold tracking-tight text-lg hover:bg-surface-container-low transition-colors px-3 py-1 rounded-lg"
              }
            >
              Transactions
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold font-headline tracking-tight text-lg"
                  : "text-on-surface font-headline font-bold tracking-tight text-lg hover:bg-surface-container-low transition-colors px-3 py-1 rounded-lg"
              }
            >
              Catalog
            </NavLink>
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Notifications"
            className="p-2 text-primary-container hover:bg-surface-container-low rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>

          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border-2 border-primary-container">
            <img
              alt="User profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhQTNISdxynzFoOUIzvjc2KuS-toVBlIwr-U9MojM_BvhyNXvhEM8lCc2MrJBjl2s2u1HyGKN4Kfx-VXlwbJClx1pk4pYSIp36eQYp_4F4SBLUdM8v1FuE_cndbpobKyweiQZ03s0bwwWzgP7vk5XicARnnmrJSaSwBxixQfoqIomCQNIiQwMgIRZw6Y5Su8qtxOMBmGMKDvV34zGsJt3NtIFfcvytpgXbkwc6YcMsps5CTvprH-GPe7x5fxx_hIXXZvkGXbQz4EFo"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
