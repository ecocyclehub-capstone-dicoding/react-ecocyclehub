import StatusBadge from "@/features/dashboard/components/common/StatusBadge";

import {
  formatCurrency,
  formatDate,
  formatNumber,
} from "@/shared/lib/formatters";

const getPointValue = (transaction) =>
  transaction.total_points ?? transaction.total_point ?? 0;

const CustomerTransactionList = ({ items = [] }) => {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#ded6ad] bg-white p-8 text-center text-sm font-medium text-gray-500">
        Belum ada transaksi.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#ded6ad] bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-[#f5f0e0] text-gray-500">
          <tr>
            <th className="p-4 text-left font-semibold">Transaksi</th>

            <th className="p-4 text-left font-semibold">Detail Sampah</th>

            <th className="p-4 text-left font-semibold">Nilai</th>

            <th className="p-4 text-left font-semibold">Poin</th>

            <th className="p-4 text-left font-semibold">Status</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t border-gray-100">
              <td className="p-4 align-top">
                <div>
                  <p className="font-semibold text-[#173c28]">Setoran Sampah</p>

                  <p className="mt-1 text-sm text-gray-500">
                    {formatDate(item.created_at)}
                  </p>
                </div>
              </td>

              <td className="p-4">
                <div className="flex flex-wrap gap-2">
                  {item.details?.length ? (
                    item.details.map((detail, detailIndex) => (
                      <span
                        key={`${item.id}-${detail.category}-${detailIndex}`}
                        className="rounded-full bg-[#eaf3de] px-3 py-1 text-xs font-semibold text-[#3b6d11]"
                      >
                        {detail.category} · {formatNumber(detail.weight)} kg
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">
                      Tidak ada detail
                    </span>
                  )}
                </div>
              </td>

              <td className="p-4">
                <p className="font-bold text-[#0f6e56]">
                  {formatCurrency(item.total_price)}
                </p>
              </td>

              <td className="p-4">
                <p className="font-bold text-[#639922]">
                  +{formatNumber(getPointValue(item))}
                </p>
              </td>

              <td className="p-4">
                <StatusBadge status={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTransactionList;
