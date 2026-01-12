export default function StatsCards({ roi, levelIncome, investments }) {
  const Card = ({ label, value }) => (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-semibold text-slate-800 mt-1">
        {value}
      </p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card label="Total Investments" value={investments} />
      <Card label="Total ROI" value={`₹${roi}`} />
      <Card label="Level Income" value={`₹${levelIncome}`} />
    </div>
  );
}
