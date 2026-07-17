import {
  formatCurrency,
  formatDate,
  formatNumber,
} from "@/shared/lib/formatters";

import StatusBadge from "@/features/dashboard/components/common/StatusBadge";
import { useAuthContext } from "@/app/provider/AuthContext";
import { can } from "@/shared/lib/permissions";

import {
  getTransactionActorLabel,
  getTransactionDetailPrice,
  getTransactionPoints,
} from "@/features/transaction/lib/transactionView";

const TransactionItems = ({ item }) => {
  const details = item.details || [];

  if (!details.length) {
    return <span className="text-gray-400">-</span>;
  }

  return (
    <div className="space-y-2">
      {details.map((detail, index) => (
        <div
          key={`${item.id}-${detail.category}-${index}`}
          className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="font-medium text-[#173c28]">
              {detail.category || detail.category_id || "-"}
            </span>

            <span className="whitespace-nowrap text-xs font-medium text-gray-500">
              {formatNumber(detail.weight)} kg
            </span>
          </div>

          <div className="mt-1 text-xs text-gray-500">
            {formatCurrency(getTransactionDetailPrice(detail))}
          </div>
        </div>
      ))}
    </div>
  );
};

const TransactionTable = ({
  data = [],

  onVerify,
  onReject,

  verifyingId,
  rejectingId,

  audience = "staff",
}) => {
  const { user } = useAuthContext();
  const canVerify = can(user, "verify_transaction");
  const canReject = can(user, "reject_transaction");
  const showAction =
    (canVerify && typeof onVerify === "function") ||
    (canReject && typeof onReject === "function");

  const showStaffColumns = audience !== "customer";

  if (!data.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#ded6ad] bg-white p-10 text-center text-sm font-medium text-gray-500 shadow-sm">
        Tidak ada transaksi.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#ded6ad] bg-white shadow-sm">
      <table
        className={`w-full text-sm ${
          showStaffColumns ? "min-w-[1040px]" : "min-w-[760px]"
        }`}
      >
        <thead className="bg-[#f5f0e0] text-gray-500">
          <tr>
            <th className="w-24 p-4 text-left font-semibold">ID</th>

            {showStaffColumns && (
              <>
                <th className="w-40 p-4 text-left font-semibold">Customer</th>

                <th className="w-44 p-4 text-left font-semibold">Staff</th>
              </>
            )}

            <th className="w-28 p-4 text-left font-semibold">Date</th>

            <th className="p-4 text-left font-semibold">Items</th>

            <th className="w-36 p-4 text-right font-semibold">Total</th>

            <th className="w-32 p-4 text-center font-semibold">Status</th>

            {showAction && (
              <th className="w-48 p-4 text-center font-semibold">Action</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => {
            const handledBy = getTransactionActorLabel(item, [
              "handled_by",
              "handler",
              "handled_by_name",
              "handled_by_id",
            ]);

            const verifiedBy = getTransactionActorLabel(item, [
              "verified_by",
              "verifier",
              "verified_by_name",
              "verified_by_id",
            ]);

            const rowActionLocked =
              verifyingId === item.id || rejectingId === item.id;

            return (
              <tr key={item.id} className="border-t border-gray-100">
                <td className="p-4 align-middle font-mono text-xs text-gray-500">
                  {String(item.id).slice(0, 8)}
                </td>

                {showStaffColumns && (
                  <>
                    <td className="p-4 align-middle font-medium text-[#173c28]">
                      {getTransactionActorLabel(item, [
                        "user",
                        "customer",
                        "customer_name",
                        "user_name",
                        "user_id",
                      ])}
                    </td>

                    <td className="p-4 align-middle">
                      <div className="space-y-1 text-xs">
                        <div>
                          <span className="text-gray-400">Handled</span>

                          <span className="ml-2 font-medium text-gray-700">
                            {handledBy}
                          </span>
                        </div>

                        <div>
                          <span className="text-gray-400">Verified</span>

                          <span className="ml-2 font-medium text-gray-700">
                            {verifiedBy}
                          </span>
                        </div>
                      </div>
                    </td>
                  </>
                )}

                <td className="p-4 align-middle text-gray-600">
                  {formatDate(item.created_at)}
                </td>

                <td className="p-4 align-middle">
                  <TransactionItems item={item} />
                </td>

                <td className="p-4 align-middle text-right">
                  <p className="font-semibold text-[#173c28]">
                    {formatCurrency(item.total_price)}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {formatNumber(item.total_weight)} kg
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#639922]">
                    +{formatNumber(getTransactionPoints(item))} pts
                  </p>
                </td>

                <td className="p-4 align-middle text-center">
                  <StatusBadge status={item.status} />
                </td>

                {showAction && (
                  <td className="p-4 align-middle">
                    {item.status === "pending" ? (
                      <div className="flex items-center justify-center gap-2">
                        {canVerify && typeof onVerify === "function" && (
                          <button
                            type="button"
                            onClick={() => onVerify(item.id)}
                            disabled={rowActionLocked}
                            className="rounded-xl bg-[#1d9e75] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0f6e56] disabled:opacity-60"
                          >
                            {verifyingId === item.id
                              ? "Verifying..."
                              : "Verify"}
                          </button>
                        )}

                        {canReject && typeof onReject === "function" && (
                          <button
                            type="button"
                            onClick={() => onReject(item.id)}
                            disabled={rowActionLocked}
                            className="rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200 disabled:opacity-60"
                          >
                            {rejectingId === item.id
                              ? "Rejecting..."
                              : "Reject"}
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-gray-400">
                        No Action
                      </span>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
