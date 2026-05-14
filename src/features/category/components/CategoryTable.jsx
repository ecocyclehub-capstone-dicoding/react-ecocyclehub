import PropTypes from "prop-types";

import { MdDelete, MdEdit } from "react-icons/md";

const CategoryTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
      <table className="w-full">
        <thead className="bg-[#f5f0e0]">
          <tr>
            <th className="text-left p-5">Category</th>

            <th className="text-left p-5">Price / Kg</th>

            <th className="text-left p-5">Point / Kg</th>

            <th className="text-left p-5">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t border-gray-100">
              <td className="p-5 font-medium">{item.name}</td>

              <td className="p-5">Rp {item.price_per_kg}</td>

              <td className="p-5">{item.point_per_kg} pts</td>

              <td className="p-5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onEdit(item)}
                    className="p-2 rounded-xl bg-yellow-100 text-yellow-700"
                  >
                    <MdEdit size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(item)}
                    className="p-2 rounded-xl bg-red-100 text-red-700"
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

CategoryTable.propTypes = {
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CategoryTable;
