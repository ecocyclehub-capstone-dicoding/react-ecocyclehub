const SectionWrapper = ({ title, action, children }) => {
  return (
    <div className="bg-[#efe8bc] rounded-[2rem] p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold">{title}</h2>

        {action && (
          <button className="text-[#0d4f2c] font-semibold">{action}</button>
        )}
      </div>

      {children}
    </div>
  );
};

export default SectionWrapper;
