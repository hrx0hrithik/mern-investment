export default function ReferralTree({ tree }) {
  if (!tree) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-semibold text-slate-800 mb-3">
        Referral Tree
      </h3>

      <TreeNode node={tree} />
    </div>
  );
}

function TreeNode({ node }) {
  return (
    <ul className="ml-4 border-l pl-4 space-y-2">
      <li>
        <span className="text-slate-700 font-medium">
          {node.name}
        </span>
        {node.referrals?.map(child => (
          <TreeNode key={child._id} node={child} />
        ))}
      </li>
    </ul>
  );
}
