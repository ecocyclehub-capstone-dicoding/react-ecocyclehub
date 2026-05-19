import { MdEco } from "react-icons/md";
import { formatCurrency, formatNumber } from "@/shared/lib/formatters";
import {
  getCurrentLevel,
  getLevelProgress,
  getNextLevel,
} from "@/entities/gamification/lib/levelProgress";

const CustomerLevelCard = ({ points = 0, balance = 0, levels = [] }) => {
  const level = getCurrentLevel(points, levels);
  const nextLevel = getNextLevel(points, levels);
  const progress = getLevelProgress(points, levels);
  const remainingPoints = Math.max(
    0,
    Number(nextLevel?.min_points || points) - Number(points || 0),
  );

  return (
    <section className="rounded-2xl border border-[#0f6e56] bg-gradient-to-br from-[#0f2419] to-[#0f6e56] p-6 text-white shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#9fe1cb]">
            Level Saat Ini
          </p>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#5dcaa5]/20 text-[#9fe1cb]">
              <MdEco size={26} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{level?.name || "-"}</h2>
              <p className="mt-1 text-sm text-[#9fe1cb]">
                {formatNumber(points)} poin
              </p>
            </div>
          </div>
        </div>

        <div className="sm:text-right">
          <p className="text-sm font-semibold text-[#9fe1cb]">Total Saldo</p>
          <p className="mt-2 text-2xl font-bold">{formatCurrency(balance)}</p>
        </div>
      </div>

      {nextLevel && (
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm text-[#9fe1cb]">
            <span>Menuju: {nextLevel.name}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-[#5dcaa5] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs font-semibold text-[#5dcaa5]">
            {formatNumber(remainingPoints)} poin lagi untuk naik level
          </p>
        </div>
      )}
    </section>
  );
};

export default CustomerLevelCard;
