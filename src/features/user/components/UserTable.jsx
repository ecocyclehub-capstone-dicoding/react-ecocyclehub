import { MdDelete, MdEdit } from "react-icons/md";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#ded6ad] bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-[#f5f0e0] text-gray-500">
          <tr>
            <th className="p-4 text-left font-semibold">Name</th>
            <th className="p-4 text-left font-semibold">Email</th>
            <th className="p-4 text-left font-semibold">Role</th>
            <th className="p-4 text-left font-semibold">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-gray-100">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e1f5ee] font-bold text-#0f6e56">
                    {user.name?.charAt(0)}
                  </div>
                  <span className="font-semibold text-[#173c28]">
                    {user.name}
                  </span>
                </div>
              </td>
              <td className="p-4 text-gray-500">{user.email}</td>
              <td className="p-4 text-gray-500">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {user.role?.name}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onEdit(user)}
                    className="rounded-xl bg-amber-100 p-2 text-amber-700"
                  >
                    <MdEdit size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(user)}
                    className="rounded-xl p-2 bg-red-100 text-red-700"
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

export default UserTable;
