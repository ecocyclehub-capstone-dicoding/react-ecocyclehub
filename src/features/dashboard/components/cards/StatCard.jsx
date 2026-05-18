const StatCard = ({ title, value, icon, dark = false, tone = "green" }) => {
  const tones = {
    green: "border-[#97c459] bg-[#eaf3de] text-[#3b6d11]",
    teal: "border-[#5dcaa5] bg-[#e1f5ee] text-[#0f6e56]",
    amber: "border-[#ef9f27] bg-[#faeeda] text-[#854f0b]",
    blue: "border-[#85b7eb] bg-[#e6f1fb] text-[#185fa5]",
    coral: "border-[#f0997b] bg-[#faece7] text-[#993c1d]",
    purple: "border-[#afa9ec] bg-[#eeedfe] text-[#534ab7]",
  };

  return (
    <div
      className={`rounded-2xl border p-5 ${
        dark
          ? "border-[#0f6e56] bg-gradient-to-br from-[#0f2419] to-[#0f6e56] text-white"
          : tones[tone] || tones.green
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold opacity-85">{title}</p>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>

      <h2 className="text-3xl font-bold tracking-normal">{value}</h2>
    </div>
  );
};

export default StatCard;
