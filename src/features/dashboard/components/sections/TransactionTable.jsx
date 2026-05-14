import StatusBadge from "../common/StatusBadge";

const TransactionTable = ({ items }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500 border-b border-gray-300">
            <th className="pb-4">Date</th>
            <th className="pb-4">Category</th>
            <th className="pb-4">Weight</th>
            <th className="pb-4">Points</th>
            <th className="pb-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-gray-200">
              <td className="py-5">{item.date}</td>

              <td>{item.category}</td>

              <td>{item.weight}</td>

              <td>{item.points}</td>

              <td>
                <StatusBadge status={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
