import React from "react";

/**
 * TotalPoints — Prominent stat card showing cumulative points earned.
 * @param {{ totalPoints: number, topPercent: number }} props
 */
const TotalPoints = ({ totalPoints = 0, topPercent = 0 }) => {
  return (
    <div className="md:col-span-4 bg-primary text-on-primary rounded-2xl p-8 flex flex-col justify-center items-center text-center">
      <span
        className="material-symbols-outlined text-5xl mb-4"
        style={{ fontVariationSettings: '"FILL" 1' }}
      >
        stars
      </span>

      <span className="text-sm font-medium opacity-80 uppercase tracking-widest mb-1">
        Total Points Earned
      </span>

      <div className="text-6xl font-black font-headline tracking-tighter">
        {totalPoints.toLocaleString()}
      </div>

      <div className="mt-6 px-4 py-2 bg-white/10 rounded-xl text-sm backdrop-blur-sm">
        Top {topPercent}% of contributors in your area
      </div>
    </div>
  );
};

export default TotalPoints;
