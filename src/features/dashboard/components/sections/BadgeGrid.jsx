import BadgeCard from "../cards/BadgeCard";

const BadgeGrid = ({ badges }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {badges.map((badge) => (
        <BadgeCard
          key={badge.id}
          icon={badge.icon}
          title={badge.name}
          bg={badge.bg}
        />
      ))}
    </div>
  );
};

export default BadgeGrid;
