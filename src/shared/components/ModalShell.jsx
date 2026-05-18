import { MdClose } from "react-icons/md";

const ModalShell = ({
  open,
  title,
  description,
  children,
  onClose,
  showCloseButton = false,
  overlayClassName = "fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4",
  panelClassName = "w-full max-w-lg rounded-3xl bg-white p-8",
  headerClassName = "mb-8",
  titleClassName = "text-2xl font-bold text-[#0d4f2c]",
}) => {
  const titleId = useId();
  const descriptionId = useId();

  if (!open) return null;

  return (
    <div className={overlayClassName}>
      <div
        className={panelClassName}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        onKeyDown={(e) => e.key === "Escape" && onClose?.()}
        tabIndex={-1}
      >
        {(title || description || showCloseButton) && (
          <div
            className={
              showCloseButton
                ? "mb-6 flex items-start justify-between gap-4"
                : headerClassName
            }
          >
            <div>
              {title && (
                <h2 id={titleId} className={titleClassName}>
                  {title}
                </h2>
              )}

              {description && (
                <p id={descriptionId} className="mt-2 text-sm text-gray-500">
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-gray-100 p-2 text-gray-500"
                aria-label="Tutup modal"
              >
                <MdClose size={20} />
              </button>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default ModalShell;
