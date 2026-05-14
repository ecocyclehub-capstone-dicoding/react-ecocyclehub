const ProgressCard = ({ level, current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="bg-[#e4e2ae] rounded-3xl p-8">
      <span className="bg-[#99db88] px-4 py-2 rounded-full text-sm font-bold">
        {level}
      </span>

      <h2 className="text-5xl font-bold mt-6">
        {current} / {total} Points
      </h2>

      <div className="w-full bg-white h-5 rounded-full mt-8 overflow-hidden">
        <div
          className="bg-[#3f9c45] h-full rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressCard;
