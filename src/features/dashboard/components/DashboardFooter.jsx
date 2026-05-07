import React from "react";
import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  {
    heading: "Resources",
    links: [
      { label: "How it Works", to: "#" },
      { label: "Waste Guide",   to: "#" },
      { label: "Partner Locations", to: "#" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "My Deposits", to: "#" },
      { label: "Wallet",      to: "#" },
      { label: "Settings",    to: "#" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center",    to: "#" },
      { label: "Contact Us",     to: "#" },
      { label: "Privacy Policy", to: "#" },
    ],
  },
];

/**
 * DashboardFooter — Site-wide footer with link columns.
 */
const DashboardFooter = () => {
  return (
    <footer className="bg-surface-dim mt-20 px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Brand Blurb */}
        <div>
          <span className="text-2xl font-black text-primary tracking-tighter font-headline">
            EcoCycle Hub
          </span>
          <p className="text-on-surface-variant mt-4 max-w-xs">
            Turning local waste into shared global value. Part of the Circular Economy Network.
          </p>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
          {FOOTER_LINKS.map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="font-bold text-primary mb-4 uppercase text-xs tracking-widest">
                {heading}
              </h4>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="hover:text-primary transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-outline-variant/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-outline">
        <p>© 2026 EcoCycle Hub. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="cursor-pointer hover:text-primary transition-colors">Terms of Service</span>
          <span className="cursor-pointer hover:text-primary transition-colors">Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
