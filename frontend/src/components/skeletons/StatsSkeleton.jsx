import Skeleton from "../ui/Skeleton";

export default function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className="bg-white rounded-2xl p-5 shadow-sm space-y-4"
        >
          <Skeleton className="w-12 h-12 rounded-xl" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
        </div>
      ))}
    </div>
  );
}
