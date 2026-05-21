import { useEffect } from "react";
import { MdCheckCircle } from "react-icons/md";

const SuccessModal = ({ open, title, message, onClose }) => {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
            <MdCheckCircle size={48} className="text-[#14532d]" />
          </div>

          <h2
            id="success-title"
            className="text-3xl font-bold text-[#0d4f2c] mb-3"
          >
            {title}
          </h2>

          <p className="text-gray-500 leading-relaxed">{message}</p>

          <button
            onClick={onClose}
            className="mt-8 w-full bg-[#14532d] hover:bg-[#0f3f22] text-white py-3 rounded-2xl font-semibold transition"
            autoFocus
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
