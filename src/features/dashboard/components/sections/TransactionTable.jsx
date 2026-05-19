const TransactionTable = ({ items = [] }) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-[#f5f0e0] text-left text-gray-500">
          <tr>
            <th className="p-4 font-semibold">Date</th>
            <th className="p-4 font-semibold">Category</th>
            <th className="p-4 font-semibold">Weight</th>
            <th className="p-4 font-semibold">Points</th>
            <th className="p-4 font-semibold">Status</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t border-gray-100">
              <td className="p-4 text-gray-500">{item.date}</td>
              <td className="p-4 font-medium text-[#173c28]">
                {item.category}
              </td>
              <td className="p-4">{item.weight}</td>
              <td className="p-4 font-semibold text-[#639922]">
                +{item.points} pts
              </td>
              <td className="p-4">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
