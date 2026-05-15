import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const NAV_LINKS = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Transactions", to: "/transactions" },
  { label: "Catalog", to: "/catalog" },
];

const MainLayout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-on-surface)] antialiased font-[var(--font-body)]">
      {/* ── Top Nav Bar ── */}
      <header className="sticky top-0 z-30 border-b border-[var(--color-outline-variant)]/20 bg-[var(--color-surface)]/80 backdrop-blur-3xl">
        <div className="mx-auto max-w-7xl px-8 py-4 flex items-center w-full">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <h1 className="hidden md:block font-[var(--font-headline)] font-black text-2xl text-[var(--color-primary-container)] tracking-tight">
              EcoCycle Hub
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center ml-8 gap-6 font-medium">
            {NAV_LINKS.map(({ label, to }) => {
              const active = pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={[
                    "px-3 py-1 rounded-lg flex items-center gap-2 transition-all duration-200 active:scale-95",
                    active
                      ? "text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]"
                      : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-variant)]/20",
                  ].join(" ")}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right slot */}
          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 text-[var(--color-primary)] hover:bg-[var(--color-surface-variant)]/50 transition-colors rounded-full active:scale-95">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-[var(--color-surface-container-high)] overflow-hidden border-2 border-[var(--color-surface-container-low)] cursor-pointer active:scale-95 transition-all duration-200">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpZKRBoGisgVzGpOiNTJ4Uvllb8SSVc7aEK8zvlfMV-rFpXB1sRFNlXhliQ0Y9smU0UFN4gPazFvHiws5lR4HnWozxD4wdi2clF2r4IcljXSo0Bm704YNC16lP8xXPbodbg-afpapFfMcF7TlA9NxoxLoGWVDtlDMkVZMztnnqGrIrymfMqk45OsgKVJ2_owhs8yP805i5b6gmNuh7fF9RFeBlbjrQuheA0k7p4LsC0dOUpEE6IT4tm5QlK5NGToCezrx7PSQvU6x9"
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
