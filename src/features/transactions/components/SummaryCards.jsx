import React from "react";

const CARDS = [
  {
    icon: "scale",
    bgIcon: "bg-[var(--color-secondary-container)]",
    colorIcon: "text-[var(--color-secondary)]",
    label: "Total Resource Weight",
    value: "0",
    unit: "kg",
  },
  {
    icon: "stars",
    bgIcon: "bg-[var(--color-primary-container)]/20",
    colorIcon: "text-[var(--color-primary)]",
    label: "Points Earned",
    value: "0",
    unit: "pts",
  },
  {
    icon: "payments",
    bgIcon: "bg-[var(--color-tertiary-container)]/20",
    colorIcon: "text-[var(--color-tertiary)]",
    label: "Economic Value",
    value: "Rp 0",
    unit: null,
  },
];

const SummaryCards = ({ stats = {} }) => {
  const resolved = [
    {
      ...CARDS[0],
      value: stats.totalWeight ?? CARDS[0].value,
    },
    {
      ...CARDS[1],
      value: stats.totalPoints ?? CARDS[1].value,
    },
    {
      ...CARDS[2],
      value: stats.economicValue ?? CARDS[2].value,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {resolved.map(({ icon, bgIcon, colorIcon, label, value, unit }) => (
        <div
          key={label}
          className="bg-[var(--color-surface-container-lowest)] rounded-xl p-6 shadow-[0_12px_40px_rgba(30,28,3,0.03)] flex flex-col justify-between"
        >
          {/* Icon + badge */}
          <div className="flex justify-between items-start mb-6">
            <div
              className={`w-12 h-12 rounded-full ${bgIcon} flex items-center justify-center`}
            >
              <span className={`material-symbols-outlined ${colorIcon} font-light`}>
                {icon}
              </span>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-[var(--color-surface-container-high)] text-[var(--color-on-surface-variant)] rounded-full">
              All Time
            </span>
          </div>

          {/* Value */}
          <div>
            <p className="text-[var(--color-outline)] text-sm font-medium mb-1">
              {label}
            </p>
            <h3 className="font-[var(--font-headline)] text-3xl font-bold text-[var(--color-on-surface)]">
              {value}
              {unit && (
                <span className="text-lg text-[var(--color-on-surface-variant)] font-medium ml-1">
                  {unit}
                </span>
              )}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
