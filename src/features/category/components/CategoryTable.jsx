import { MdDelete, MdEdit, MdRecycling } from "react-icons/md";

const tones = [
  {
    card: "border-[#97c459] bg-[#eaf3de] text-[#3b6d11]",
    icon: "bg-[#97c459]/25",
  },
  {
    card: "border-[#5dcaa5] bg-[#e1f5ee] text-[#0f6e56]",
    icon: "bg-[#5dcaa5]/25",
  },
  {
    card: "border-[#85b7eb] bg-[#e6f1fb] text-[#185fa5]",
    icon: "bg-[#85b7eb]/25",
  },
  {
    card: "border-[#ef9f27] bg-[#faeeda] text-[#854f0b]",
    icon: "bg-[#ef9f27]/25",
  },
  {
    card: "border-[#afa9ec] bg-[#eeedfe] text-[#534ab7]",
    icon: "bg-[#afa9ec]/25",
  },
  {
    card: "border-[#f0997b] bg-[#faece7] text-[#993c1d]",
    icon: "bg-[#f0997b]/25",
  },
];

const formatCurrency = (value) =>
  `Rp ${Number(value || 0).toLocaleString("id-ID")}`;

const CategoryTable = ({ data, onEdit, onDelete }) => {
  if (!data?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#ded6ad] bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf3de] text-[#3b6d11]">
          <MdRecycling size={28} />
        </div>
        <h2 className="text-lg font-bold text-[#0d4f2c]">
          Belum ada kategori sampah
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Tambahkan kategori untuk mulai mengatur harga dan poin per kilogram.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {data.map((item, index) => {
        const tone = tones[index % tones.length];

        return (
          <article
            key={item.id}
            className={`rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${tone.card}`}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tone.icon}`}
                >
                  <MdRecycling size={23} />
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-lg font-bold">{item.name}</h2>
                  <p className="mt-1 text-xs font-semibold opacity-70">
                    Kategori Sampah
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(item)}
                  className="rounded-xl bg-white/70 p-2 transition hover:bg-white"
                  aria-label={`Edit ${item.name}`}
                >
                  <MdEdit size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(item)}
                  className="rounded-xl bg-red-100 p-2 text-red-700 transition hover:bg-red-200"
                  aria-label={`Hapus ${item.name}`}
                >
                  <MdDelete size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/65 p-4">
                <p className="text-xs font-semibold opacity-70">Harga/kg</p>
                <p className="mt-2 text-base font-bold">
                  {formatCurrency(item.price_per_kg)}
                </p>
              </div>

              <div className="rounded-2xl bg-white/65 p-4">
                <p className="text-xs font-semibold opacity-70">Poin/kg</p>
                <p className="mt-2 text-base font-bold">
                  {Number(item.point_per_kg || 0).toLocaleString("id-ID")} poin
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default CategoryTable;
