import PropTypes from "prop-types";

const RecentTransactionTable = ({ items = [] }) => {
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
            <th className="text-left p-5">Date</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t border-gray-100">
              <td className="p-5">{item.id?.slice(0, 8)}</td>

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
                {new Date(item.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

RecentTransactionTable.propTypes = {
  items: PropTypes.array,
};

export default RecentTransactionTable;
