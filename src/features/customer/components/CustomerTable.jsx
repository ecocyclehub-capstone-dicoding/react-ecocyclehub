import PropTypes from "prop-types";
import { MdDelete, MdEdit } from "react-icons/md";

const CustomerTable = ({ customers, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
      <table className="w-full">
        <thead className="bg-[#f5f0e0]">
          <tr>
            <th className="text-left p-5">Name</th>
            <th className="text-left p-5">Email</th>
            <th className="text-left p-5">Role</th>
            <th className="text-left p-5">Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-t border-gray-100">
              <td className="p-5">{customer.name}</td>

              <td className="p-5">{customer.email}</td>

              <td className="p-5">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  {customer.role}
                </span>
              </td>

              <td className="p-5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onEdit(customer)}
                    className="bg-yellow-100 text-yellow-700 p-2 rounded-xl"
                  >
                    <MdEdit size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(customer)}
                    className="bg-red-100 text-red-700 p-2 rounded-xl"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

CustomerTable.propTypes = {
  customers: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CustomerTable;
