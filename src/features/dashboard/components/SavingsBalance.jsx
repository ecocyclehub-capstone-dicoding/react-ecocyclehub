import React from "react";

/**
 * SavingsBalance — Wallet card showing redeemable savings.
 * @param {{ balance: number, onWithdraw: () => void }} props
 */
const SavingsBalance = ({ balance = 0, onWithdraw }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-outline-variant/15 md:col-span-6">
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
          <span className="material-symbols-outlined text-on-secondary-container">
            account_balance_wallet
          </span>
        </div>
        <h3 className="font-bold text-xl">Savings Balance</h3>
      </div>

      {/* Balance */}
      <div className="text-5xl font-black text-on-surface mb-2">
        ${balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
      <p className="text-sm text-outline mb-8">Redeemable for cash or store credit</p>

      <button
        onClick={onWithdraw}
        className="w-full py-3 bg-surface-container-high text-primary font-bold rounded-xl hover:bg-surface-variant transition-colors cursor-pointer"
      >
        Withdraw Funds
      </button>
    </div>
  );
};

export default SavingsBalance;
