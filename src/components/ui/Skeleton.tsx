export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton rounded-xl ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="card-luxury p-0">
      <Skeleton className="!rounded-none aspect-[4/3] w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-24 rounded-pill" />
          <Skeleton className="h-8 w-24 rounded-pill" />
        </div>
      </div>
    </div>
  );
}
