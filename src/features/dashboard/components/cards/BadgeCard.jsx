const BadgeCard = ({ icon, title, bg }) => {
  return (
    <div className="text-center">
      <div
        className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl ${bg}`}
      >
        {icon}
      </div>

      <p className="mt-3 text-sm font-semibold">{title}</p>
    </div>
  );
};

export default BadgeCard;
