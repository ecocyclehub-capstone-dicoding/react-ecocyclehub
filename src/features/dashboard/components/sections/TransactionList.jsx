import StatusBadge from "../common/StatusBadge";

const TransactionList = ({ items }) => {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-3xl p-6 flex justify-between items-center"
        >
          <div>
            <h3 className="text-2xl font-bold">{item.title}</h3>

            <p className="text-gray-500">{item.date}</p>
          </div>

          <div className="text-right">
            <h4 className="text-xl font-bold">{item.weight}</h4>

            <StatusBadge status={item.status} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
