import React from "react";

/**
 * HeroSection — Welcome greeting + primary CTA.
 * @param {{ userName: string, onDepositWaste: () => void }} props
 */
const HeroSection = ({ userName = "User Name", onDepositWaste }) => {
  return (
    <section className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tight mb-2">
          Welcome back, {userName}.
        </h1>
        <p className="text-lg text-on-surface-variant max-w-xl">
          Keep making a difference — every deposit counts.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onDepositWaste}
          className="px-8 py-4 bg-linear-to-r from-primary to-primary-container text-on-primary rounded-2xl font-bold text-lg shadow-lg active:scale-95 duration-200 cursor-pointer"
        >
          Deposit Waste
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
