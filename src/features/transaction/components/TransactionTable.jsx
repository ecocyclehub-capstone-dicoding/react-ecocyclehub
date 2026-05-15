import PropTypes from "prop-types";

const TransactionTable = ({ data, onVerify }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
      <table className="w-full">
        <thead className="bg-[#f5f0e0]">
          <tr>
            <th className="text-left p-5">Transaction ID</th>
            <th className="text-left p-5">Weight</th>
            <th className="text-left p-5">Points</th>
            <th className="text-left p-5">Price</th>
            <th className="text-left p-5">Status</th>
            <th className="text-left p-5">Action</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr key={item.id} className="border-t border-gray-100">
              <td className="p-5">{String(item.id).slice(0, 8)}</td>

              <td className="p-5">{item.total_weight} kg</td>

              <td className="p-5">{item.total_point} pts</td>

              <td className="p-5">Rp {item.total_price}</td>

              <td className="p-5">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      item.status === "verified"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {item.status}
                </span>
              </td>

              <td className="p-5">
                {item.status !== "verified" && (
                  <button
                    onClick={() => onVerify(item.id)}
                    className="bg-[#14532d] text-white px-4 py-2 rounded-xl text-sm"
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

TransactionTable.propTypes = {
  data: PropTypes.array.isRequired,
  onVerify: PropTypes.func.isRequired,
};

export default TransactionTable;
