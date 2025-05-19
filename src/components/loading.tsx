import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Hero section skeleton */}
        <div className="w-full h-[60vh] relative">
          <Skeleton className="w-full h-full rounded-lg" />
          <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4 p-8">
            <Skeleton className="h-12 w-3/4 max-w-md" />
            <Skeleton className="h-6 w-2/3 max-w-sm" />
            <Skeleton className="h-10 w-40 mt-4" />
          </div>
        </div>

        {/* Products grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-32" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
