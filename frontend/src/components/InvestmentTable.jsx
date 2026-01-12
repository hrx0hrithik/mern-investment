export default function InvestmentTable({ investments }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b">
        <h3 className="font-semibold text-slate-800">
          Investments
        </h3>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-5 py-3 text-left">Plan</th>
            <th className="px-5 py-3 text-left">Amount</th>
            <th className="px-5 py-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {investments.map(inv => (
            <tr key={inv._id} className="border-t">
              <td className="px-5 py-3">{inv.plan}</td>
              <td className="px-5 py-3">₹{inv.amount}</td>
              <td className="px-5 py-3">
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  {inv.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
