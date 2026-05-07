import React from "react";

/**
 * LevelProgress — Gamification card showing the user's level, XP, and next reward.
 * @param {{
 *   level: string,
 *   tierName: string,
 *   currentPoints: number,
 *   nextLevelPoints: number,
 *   nextReward: string,
 *   progressPercent: number
 * }} props
 */
const LevelProgress = ({
  level = "X",
  tierName = "Tier Name",
  currentPoints = 0,
  nextLevelPoints = 0,
  nextReward = "Reward Description",
  progressPercent = 0,
}) => {
  const pointsLeft = nextLevelPoints - currentPoints;

  return (
    <div className="md:col-span-8 bg-surface-container-low rounded-2xl p-8 flex flex-col justify-between min-h-80 relative overflow-hidden">
      <div className="relative z-10">
        {/* Header Row */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <span className="px-4 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full text-xs font-bold tracking-widest uppercase">
              Level {level}: {tierName}
            </span>
            <h2 className="text-3xl font-bold mt-4 text-primary">
              {currentPoints.toLocaleString()} / {nextLevelPoints.toLocaleString()} Points
            </h2>
          </div>

          <div className="w-16 h-16 bg-white/40 backdrop-blur-md rounded-2xl flex items-center justify-center">
            <span
              className="material-symbols-outlined text-4xl text-primary"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              eco
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-4">
          <div className="flex justify-between text-sm font-semibold text-on-surface-variant">
            <span>Next Reward: {nextReward}</span>
            <span>{pointsLeft.toLocaleString()} points left</span>
          </div>

          <div className="h-4 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-primary to-secondary-fixed rounded-full transition-all duration-700"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Decorative blur blob */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default LevelProgress;
