import { CheckCircle, Clock } from "lucide-react";

export default function InvestmentTable({ investments }) {
  if (!investments || investments.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center text-slate-500">
        No investments found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800">
          Investments
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                ROI %
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                ROI Earned
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {investments.map(inv => (
              <tr key={inv._id} className="hover:bg-slate-50 transition">
                {/* ID */}
                <td className="px-6 py-4 text-sm font-medium text-slate-700">
                  #{inv._id.slice(-6)}
                </td>

                {/* Plan Name */}
                <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                  {inv.plan}
                </td>

                {/* Amount */}
                <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                  ₹{inv.amount.toLocaleString()}
                </td>

                {/* ROI % */}
                <td className="px-6 py-4 text-sm font-semibold text-indigo-600">
                  {inv.roiPercent}%
                </td>

                {/* Individual ROI */}
                <td className="px-6 py-4 text-sm font-semibold text-emerald-600">
                  ₹{((inv.amount * inv.roiPercent) / 100).toLocaleString()}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  {inv.status === "ACTIVE" ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full
                       text-xs font-medium bg-emerald-100 text-emerald-700">
                      <CheckCircle size={14} />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full
                       text-xs font-medium bg-slate-100 text-slate-600">
                      <Clock size={14} />
                      Pending
                    </span>
                  )}
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-sm text-slate-500">
                  {new Date(inv.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
