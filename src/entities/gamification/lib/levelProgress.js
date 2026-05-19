export const fallbackLevels = [
  { id: "seedling", name: "Seedling", min_points: 0 },
  { id: "sprout", name: "Sprout", min_points: 100 },
  { id: "green-keeper", name: "Green Keeper", min_points: 300 },
  { id: "eco-ranger", name: "Eco Ranger", min_points: 700 },
  { id: "earth-guardian", name: "Earth Guardian", min_points: 1500 },
  { id: "recycling-hero", name: "Recycling Hero", min_points: 3000 },
  { id: "planet-protector", name: "Planet Protector", min_points: 5000 },
  { id: "sustainability-master", name: "Sustainability Master", min_points: 8000 },
  { id: "eco-legend", name: "Eco Legend", min_points: 12000 },
  { id: "zero-waste-champion", name: "Zero Waste Champion", min_points: 20000 },
];

export const sortLevels = (levels = []) =>
  [...(levels.length ? levels : fallbackLevels)].sort(
    (a, b) => Number(a.min_points) - Number(b.min_points),
  );

export const getCurrentLevel = (points = 0, levels = []) => {
  const sorted = sortLevels(levels);

  return (
    [...sorted]
      .reverse()
      .find((level) => Number(points) >= Number(level.min_points)) || sorted[0]
  );
};

export const getNextLevel = (points = 0, levels = []) =>
  sortLevels(levels).find((level) => Number(level.min_points) > Number(points)) ||
  null;

export const getLevelProgress = (points = 0, levels = []) => {
  const current = getCurrentLevel(points, levels);
  const next = getNextLevel(points, levels);

  if (!next) return 100;

  const range = Number(next.min_points) - Number(current.min_points);
  const progress = Number(points) - Number(current.min_points);

  if (range <= 0) return 0;

  return Math.min(100, Math.max(0, Math.round((progress / range) * 100)));
};
