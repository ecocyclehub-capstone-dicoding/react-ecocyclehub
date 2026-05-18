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
  const inputClassName =
    "w-full rounded-2xl border border-gray-200 px-4 py-4 outline-none focus:border-[#14532d]";

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>

      {children ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={inputClassName}
        >
          {children}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClassName}
        />
      )}

      {error && <p className="mt-2 text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;
