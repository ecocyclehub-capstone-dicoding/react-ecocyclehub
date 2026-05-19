const RewardCard = ({ title, value, subtitle, icon, dark = false }) => {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        dark
          ? "border-[#0f6e56] bg-[#0d662d] text-white"
          : "border-[#ded6ad] bg-white text-[#173c28]"
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold opacity-80">{title}</p>
        {icon && <div className="text-2xl opacity-80">{icon}</div>}
      </div>

      <h2 className="mb-3 text-3xl font-bold">{value}</h2>

      <p className="text-sm opacity-80">{subtitle}</p>
    </div>
  );
};

export default RewardCard;
