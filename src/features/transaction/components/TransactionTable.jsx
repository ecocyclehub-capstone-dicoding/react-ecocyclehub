const formatNumber = (value) => Number(value || 0).toLocaleString("id-ID");
const formatCurrency = (value) => `Rp ${formatNumber(value)}`;
const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "-";

const TransactionTable = ({ data, onVerify }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#ded6ad] bg-white shadow-sm">
      <table className="w-full min-w-[860px] text-sm">
        <thead className="bg-[#f5f0e0] text-gray-500">
          <tr>
            <th className="p-4 text-left font-semibold">Transaction ID</th>
            <th className="p-4 text-left font-semibold">Date</th>
            <th className="p-4 text-left font-semibold">Details</th>
            <th className="p-4 text-left font-semibold">Weight</th>
            <th className="p-4 text-left font-semibold">Points</th>
            <th className="p-4 text-left font-semibold">Price</th>
            <th className="p-4 text-left font-semibold">Status</th>
            <th className="p-4 text-left font-semibold">Action</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr key={item.id} className="border-t border-gray-100">
              <td className="p-4 font-mono text-xs text-gray-500">
                {String(item.id).slice(0, 8)}
              </td>

              <td className="p-4 text-gray-600">
                {formatDate(item.created_at)}
              </td>

              <td className="p-4">
                <div className="max-w-56 space-y-1">
                  {(item.details || []).slice(0, 2).map((detail, index) => (
                    <div key={`${item.id}-${detail.category}-${index}`}>
                      <span className="font-medium text-[#173c28]">
                        {detail.category}
                      </span>
                      <span className="text-gray-500">
                        {" "}
                        ({formatNumber(detail.weight)} kg)
                      </span>
                    </div>
                  ))}
                  {(item.details || []).length > 2 && (
                    <div className="text-xs font-medium text-gray-500">
                      +{item.details.length - 2} item lainnya
                    </div>
                  )}
                  {!item.details?.length && (
                    <span className="text-gray-400">-</span>
                  )}
                </div>
              </td>

              <td className="p-4">{formatNumber(item.total_weight)} kg</td>

              <td className="p-4 font-semibold text-[#639922]">
                +{formatNumber(item.total_points ?? item.total_point)} pts
              </td>

              <td className="p-4 font-medium">
                {formatCurrency(item.total_price)}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      item.status === "verified"
                        ? "bg-green-100 text-green-700"
                        : item.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {item.status}
                </span>
              </td>

              <td className="p-4">
                {item.status !== "verified" && (
                  <button
                    onClick={() => onVerify(item.id)}
                    className="rounded-xl bg-[#1d9e75] px-4 py-2 text-sm font-semibold text-white"
                  >
                    Verify
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
