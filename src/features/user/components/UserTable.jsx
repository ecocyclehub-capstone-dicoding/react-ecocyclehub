import PropTypes from "prop-types";
import { MdDelete, MdEdit } from "react-icons/md";

const UserTable = ({ users, onEdit, onDelete }) => {
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
          {users.map((user) => (
            <tr key={user.id} className="border-t border-gray-100">
              <td className="p-5">{user.name}</td>

              <td className="p-5">{user.email}</td>

              <td className="p-5">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {user.role?.name}
                </span>
              </td>

              <td className="p-5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onEdit(user)}
                    className="rounded-xl bg-yellow-100 p-2 text-yellow-700"
                  >
                    <MdEdit size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(user)}
                    className="rounded-xl bg-red-100 p-2 text-red-700"
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

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserTable;
