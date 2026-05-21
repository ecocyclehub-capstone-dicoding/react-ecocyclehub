const StatusBadge = ({ status }) => {
  const styles = {
    verified: "border-[#97c459] bg-[#eaf3de] text-[#3b6d11]",
    pending: "border-[#ef9f27] bg-[#faeeda] text-[#854f0b]",
    rejected: "border-[#f3b3b3] bg-[#fdeaea] text-[#b42318]",
  };

  const labels = {
    verified: "Terverifikasi",
    pending: "Menunggu",
    rejected: "Ditolak",
  };

  const normalizedStatus =
    typeof status === "string" ? status.toLowerCase() : "";
  const badgeClass =
    styles[normalizedStatus] ?? "border-gray-200 bg-gray-100 text-gray-700";

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${badgeClass}`}
    >
      {labels[normalizedStatus] ?? status ?? "-"}
    </span>
  );
};

export default StatusBadge;
