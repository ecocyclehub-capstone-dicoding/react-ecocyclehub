const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  children,
  error,
}) => {
  const inputId = `field-${name}`;
  const errorId = error ? `${inputId}-error` : undefined;

  const inputClassName =
    "w-full rounded-2xl border border-gray-200 px-4 py-4 outline-none focus:border-[#14532d]";

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium">
        {label}
      </label>

      {children ? (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={inputClassName}
        >
          {children}
        </select>
      ) : (
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={inputClassName}
        />
      )}

      {error && (
        <p id={errorId} className="mt-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
