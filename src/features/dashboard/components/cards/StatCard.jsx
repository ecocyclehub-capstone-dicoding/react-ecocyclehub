const StatCard = ({ title, value, icon, dark = false }) => {
  return (
    <div
      className={`rounded-3xl p-6 ${
        dark ? "bg-[#195f28] text-white" : "bg-[#f7f7f7]"
      }`}
    >
      <div className="text-3xl mb-6">{icon}</div>

      <p className="text-sm mb-2">{title}</p>

      <h2 className="text-5xl font-bold">{value}</h2>
    </div>
  );
};

export default StatCard;
