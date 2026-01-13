import { Activity, TrendingUp, DollarSign } from "lucide-react";

export default function StatsCards({ investments, roi, levelIncome }) {
  const cards = [
    {
      label: "Active Investments",
      value: investments,
      icon: Activity,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
      accent: "from-blue-500 to-blue-600"
    },
    {
      label: "Total ROI",
      value: `₹${roi.toLocaleString()}`,
      icon: TrendingUp,
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      accent: "from-emerald-500 to-emerald-600"
    },
    {
      label: "Level Income",
      value: `₹${levelIncome.toLocaleString()}`,
      icon: DollarSign,
      bg: "bg-purple-50",
      iconColor: "text-purple-600",
      accent: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map((card, i) => {
        const Icon = card.icon;

        return (
          <div
            key={i}
            className="relative bg-white rounded-2xl p-5 shadow-sm
                       hover:shadow-md transition-all duration-300"
          >
            {/* Top accent */}
            <div
              className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl
                          bg-linear-to-r ${card.accent}`}
            />

            {/* Icon */}
            <div
              className={`w-12 h-12 ${card.bg} rounded-xl flex
                          items-center justify-center mb-4`}
            >
              <Icon className={card.iconColor} size={22} />
            </div>

            {/* Text */}
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-1 text-3xl font-bold text-slate-800">
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
