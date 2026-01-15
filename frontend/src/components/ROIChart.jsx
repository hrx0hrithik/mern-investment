import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function ROIChart({ data }) {
  // Guard: no or insufficient data
  if (!data || data.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-sm text-slate-500">
        ROI data will appear after multiple days
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: "#64748b" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#64748b" }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            borderColor: "#e2e8f0",
            fontSize: 12
          }}
          formatter={(value) => [`₹${value}`, "ROI"]}
        />
        <Line
          type="monotone"
          dataKey="roi"
          stroke="#4f46e5"
          strokeWidth={2}
          dot={{ r: data.length === 1 ? 6 : 3 }}
          activeDot={{ r: 6 }}
        />

      </LineChart>
    </ResponsiveContainer>
  );
}
