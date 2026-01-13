import { useState } from "react";
import { Users, ChevronDown, ChevronRight } from "lucide-react";

export default function ReferralTree({ tree }) {
  if (!tree) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center text-slate-500">
        No referrals yet
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Users size={18} className="text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-800">
          Referral Network
        </h3>
      </div>

      <TreeNode node={tree} isRoot />
    </div>
  );
}

/* ---------------- Tree Node ---------------- */

function TreeNode({ node, isRoot = false }) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.referrals && node.referrals.length > 0;

  return (
    <div className="relative">
      {/* Node row */}
      <div className="flex items-center gap-2 py-1">
        {/* Toggle */}
        {hasChildren ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-5 h-5 flex items-center justify-center
                       rounded bg-slate-100 hover:bg-slate-200 transition"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>
        ) : (
          <span className="w-5 h-5" />
        )}

        {/* Node label */}
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm
            ${
              isRoot
                ? "bg-indigo-600 text-white font-semibold shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
        >
          <Users size={14} />
          <span>{node.name}</span>
        </div>
      </div>

      {/* Children */}
      {expanded && hasChildren && (
        <div className="ml-6 pl-3 border-l border-slate-300 space-y-1">
          {node.referrals.map(child => (
            <TreeNode
              key={child._id}
              node={child}
            />
          ))}
        </div>
      )}
    </div>
  );
}
