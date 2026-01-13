import Skeleton from "../ui/Skeleton";

export default function InvestmentTableSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
      <Skeleton className="h-5 w-40" />

      {[1, 2, 3, 4].map(i => (
        <div key={i} className="grid grid-cols-5 gap-4">
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
        </div>
      ))}
    </div>
  );
}
