import { useEffect, useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { MdClose, MdSearch } from "react-icons/md";

const SearchBar = ({
  placeholder = "Cari data...",
  value = "",
  onSearch,
  delay = 500,
  className = "",
}) => {
  const [keyword, setKeyword] = useState(value);

  const debouncedKeyword = useDebounce(keyword, delay);

  useEffect(() => {
    onSearch?.(debouncedKeyword);
  }, [debouncedKeyword, onSearch]);

  const clearSearch = () => {
    setKeyword("");
    onSearch?.("");
  };

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      {/* Search Icon */}
      <MdSearch
        size={20}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      {/* Input */}
      <input
        type="text"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder={placeholder}
        className="
          h-12 w-full rounded-2xl
          border border-[#ded6ad]
          bg-white
          pl-12 pr-12
          text-sm font-medium text-[#173c28]
          shadow-sm
          outline-none
          transition
          placeholder:text-gray-400
          focus:border-[#14532d]
          focus:ring-4 focus:ring-[#dce8cf]
        "
      />

      {/* Clear Button */}
      {keyword && (
        <button
          type="button"
          onClick={clearSearch}
          className="
            absolute right-4 top-1/2
            -translate-y-1/2
            rounded-full
            p-1
            text-gray-400
            transition
            hover:bg-red-50
            hover:text-red-500
          "
        >
          <MdClose size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
