import { useEffect, useState } from "react"
import { getDashboard, getReferralTree } from "../api/dashboard.api"
import StatsCards from "../components/StatsCards"
import InvestmentTable from "../components/InvestmentTable"
import ReferralTree from "../components/ReferralTree"

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [tree, setTree] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getDashboard(),
      getReferralTree()
    ])
      .then(([dashboardRes, treeRes]) => {
        setData(dashboardRes.data)
        setTree(treeRes.data)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-slate-500">
        Loading dashboard...
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm px-6 py-4 mb-6">
        <h1 className="text-xl font-semibold text-slate-800">
          Investment Dashboard
        </h1>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-6">
        <StatsCards />
        <InvestmentTable />
        <ReferralTree />
      </main>
    </div>
  )
}
