import Skeleton from "../ui/Skeleton";

export default function ROIChartSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <Skeleton className="h-5 w-32 mb-4" />
      <div className="flex items-end gap-3 h-48">
        {[1, 2, 3, 4, 5].map(i => (
          <Skeleton key={i} className="flex-1 h-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}
