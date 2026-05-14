const StatusBadge = ({ status }) => {
  const styles = {
    verified: "bg-[#a8e08e] text-[#14501e]",
    pending: "bg-[#ddd39f] text-[#5e5315]",
    processed: "bg-[#bde8a9] text-[#1f6a32]",
  };

  return (
    <span
      className={`px-4 py-1 rounded-full text-sm font-semibold ${
        styles[status.toLowerCase()]
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
