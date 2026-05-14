import { FiBell, FiSearch } from "react-icons/fi";

const Topbar = ({ title, subtitle }) => {
  return (
    <div className="flex justify-between items-start mb-10">
      <div>
        <h1 className="text-6xl font-bold text-[#0d4f2c]">{title}</h1>

        <p className="text-xl text-gray-600 mt-2">{subtitle}</p>
      </div>

      <div className="flex gap-4">
        <button className="w-14 h-14 rounded-full bg-[#ddd8a9] flex items-center justify-center">
          <FiSearch />
        </button>

        <button className="w-14 h-14 rounded-full bg-[#ddd8a9] flex items-center justify-center">
          <FiBell />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
