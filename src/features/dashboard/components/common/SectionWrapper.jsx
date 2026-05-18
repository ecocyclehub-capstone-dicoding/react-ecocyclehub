const SectionWrapper = ({ title, action, onActionClick, children }) => {
  return (
    <div className="rounded-2xl border bg-[#ded6ad] bg-[#efe8bc] p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-[#0d4f2c]">{title}</h2>

        {action && (
          <button
            type="button"
            onClick={onActionClick}
            className="text-sm font-semibold text-[#0d4f2c]"
          >
            {action}
          </button>
        )}
      </div>

      {children}
    </div>
  );
};

export default SectionWrapper;
