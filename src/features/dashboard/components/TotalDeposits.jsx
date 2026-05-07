import React from "react";

/**
 * TotalDeposits — Stats card for total waste deposited (in kg).
 * @param {{ totalKg: number, monthlyIncreasePercent: number }} props
 */
const TotalDeposits = ({ totalKg = 0, monthlyIncreasePercent = 0 }) => {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/15 md:col-span-6">
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center">
          <span className="material-symbols-outlined text-on-tertiary-fixed">
            delete_sweep
          </span>
        </div>
        <h3 className="font-bold text-xl">Total Deposits</h3>
      </div>

      {/* Stat */}
      <div className="text-5xl font-black text-on-surface mb-2">
        {totalKg.toLocaleString()} kg
      </div>
      <p className="text-sm text-outline mb-8">Resources recovered since joining</p>

      {/* Monthly Delta */}
      <div className="flex items-center gap-2">
        <span className="text-green-700 font-bold">+{monthlyIncreasePercent}%</span>
        <span className="text-xs text-outline">Increase from last month</span>
      </div>
    </div>
  );
};

export default TotalDeposits;
