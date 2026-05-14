const RewardCard = ({ title, value, subtitle, dark = false }) => {
  return (
    <div
      className={`rounded-3xl p-8 ${
        dark ? "bg-[#0d662d] text-white" : "bg-[#f7f7f7]"
      }`}
    >
      <p className="text-sm mb-3">{title}</p>

      <h2 className="text-5xl font-bold mb-4">{value}</h2>

      <p className="text-sm opacity-80">{subtitle}</p>
    </div>
  );
};

export default RewardCard;
