import Skeleton from "../ui/Skeleton";

export default function ReferralTreeSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-28 ml-6" />
      <Skeleton className="h-4 w-24 ml-12" />
    </div>
  );
}
