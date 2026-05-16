import PropTypes from "prop-types";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-3 mt-6">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
      >
        Prev
      </button>

      <span className="px-4 py-2 text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
