import { useEffect, useState } from "react";
import { getDailyROI, getDashboard, getReferralTree } from "../api/dashboard.api";
import StatsCards from "../components/StatsCards";
import InvestmentTable from "../components/InvestmentTable";
import ReferralTree from "../components/ReferralTree";
import ROIChart from "../components/ROIChart";
import CreateInvestmentModal from "../components/CreateInvestmentModal";
import { TrendingUp, LogOut } from "lucide-react";
import StatsSkeleton from "../components/skeletons/StatsSkeleton";
import InvestmentTableSkeleton from "../components/skeletons/InvestmentTableSkeleton";
import ReferralTreeSkeleton from "../components/skeletons/ReferralTreeSkeleton";
import ROIChartSkeleton from "../components/skeletons/ROIChartSkeleton";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const [error, setError] = useState(null);
  const [roiData, setRoiData] = useState([]);

const fetchDashboard = async () => {
  try {
    setLoading(true);
    setError(null);

    const [dashboardRes, treeRes, roiRes] = await Promise.all([
      getDashboard(),
      getReferralTree(),
      getDailyROI()
    ]);

    setData(dashboardRes.data);
    setTree(treeRes.data);
    setRoiData(roiRes.data);
  } catch (err) {
    console.error(err);
    setError("Failed to load dashboard data. Please try again.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchDashboard();
  }, []);


  /* ---------- Loading / Guard ---------- */
  if (loading || !data) {
    return (
      <div className="min-h-screen bg-slate-100">
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          <StatsSkeleton />
          <InvestmentTableSkeleton />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReferralTreeSkeleton />
            <ROIChartSkeleton />
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center space-y-3">
          <p className="text-slate-700 font-medium">{error}</p>
          <button
            onClick={fetchDashboard}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ---------- Derived Data (safe now) ---------- */
const roiChartData = roiData;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
              <TrendingUp className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-800">
                Investment Dashboard
              </h1>
              <p className="text-xs text-slate-500">
                Track your portfolio performance
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="flex items-center gap-2 text-sm text-red-600
                     hover:bg-red-50 px-3 py-2 rounded-lg transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Stats */}
        <StatsCards
          investments={data.investments.length}
          roi={data.totalROI}
          levelIncome={data.levelIncome}
        />

        {/* Investments */}
        {/* Create Investment CTA */}
        <div className="flex justify-end">
          <button
            onClick={() => setOpenCreate(true)}
            className="flex items-center gap-2 bg-indigo-600
               hover:bg-indigo-700 text-white
               px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            + Create Investment
          </button>
        </div>

        <InvestmentTable investments={data.investments} />

        {/* Referral + ROI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ReferralTree tree={tree} />

          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
              <TrendingUp size={18} />
              ROI Growth
            </h3>
            <ROIChart data={roiChartData} />
          </div>
        </div>
      </main>
      <CreateInvestmentModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSuccess={fetchDashboard}
      />
    </div>
  );

}
