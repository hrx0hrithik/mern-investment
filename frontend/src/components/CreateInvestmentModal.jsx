import { useState } from "react";
import { X, PlusCircle, Calendar, Percent, IndianRupee } from "lucide-react";
import { createInvestment } from "../api/investment.api";

export default function CreateInvestmentModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({
    amount: "",
    plan: "",
    roiPercent: "",
    endDate: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!open) return null;

  const submit = async () => {
    if (!form.amount || !form.plan || !form.roiPercent || !form.endDate) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await createInvestment({
        amount: Number(form.amount),
        plan: form.plan,
        roiPercent: Number(form.roiPercent),
        endDate: form.endDate
      });

      onSuccess();
      onClose();
      setForm({ amount: "", plan: "", roiPercent: "", endDate: "" });
    } catch {
      setError("Failed to create investment. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <PlusCircle className="text-indigo-600" size={20} />
            <h3 className="text-lg font-semibold text-slate-800">
              Create Investment
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Amount */}
          <div className="relative">
            <IndianRupee
              size={16}
              className="absolute left-3 top-3 text-slate-400"
            />
            <input
              className="w-full border rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-indigo-200"
              placeholder="Amount"
              value={form.amount}
              onChange={e => setForm({ ...form, amount: e.target.value })}
            />
          </div>

          {/* Plan */}
          <input
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-200"
            placeholder="Plan"
            value={form.plan}
            onChange={e => setForm({ ...form, plan: e.target.value })}
          />

          {/* ROI */}
          <div className="relative">
            <Percent
              size={16}
              className="absolute left-3 top-3 text-slate-400"
            />
            <input
              className="w-full border rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-indigo-200"
              placeholder="ROI %"
              value={form.roiPercent}
              onChange={e => setForm({ ...form, roiPercent: e.target.value })}
            />
          </div>

          {/* End Date */}
          <div className="relative">
            <Calendar
              size={16}
              className="absolute left-3 top-3 text-slate-400"
            />
            <input
              type="date"
              className="w-full border rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-indigo-200"
              value={form.endDate}
              onChange={e => setForm({ ...form, endDate: e.target.value })}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-lg bg-indigo-600
                       hover:bg-indigo-700 text-white disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Investment"}
          </button>
        </div>
      </div>
    </div>
  );
}
