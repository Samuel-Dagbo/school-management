import clsx from 'clsx';

export function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-4 bg-slate-200 rounded animate-pulse" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {Array.from({ length: columns }).map((_, j) => (
            <div key={j} className="h-10 bg-slate-100 rounded animate-pulse" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-slate-200 rounded-xl animate-pulse" />
        <div className="flex-1">
          <div className="h-4 bg-slate-200 rounded w-1/2 mb-2 animate-pulse" />
          <div className="h-3 bg-slate-100 rounded w-1/3 animate-pulse" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-slate-100 rounded animate-pulse" />
        <div className="h-3 bg-slate-100 rounded w-4/5 animate-pulse" />
        <div className="h-3 bg-slate-100 rounded w-3/5 animate-pulse" />
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse" />
        <div className="h-12 bg-slate-100 rounded-xl animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse" />
        <div className="h-12 bg-slate-100 rounded-xl animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse" />
        <div className="h-12 bg-slate-100 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-slate-200 rounded-xl animate-pulse" />
            <div className="w-8 h-8 bg-slate-100 rounded animate-pulse" />
          </div>
          <div className="h-8 bg-slate-200 rounded w-1/2 animate-pulse mb-2" />
          <div className="h-3 bg-slate-100 rounded w-3/4 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export default { TableSkeleton, CardSkeleton, FormSkeleton, DashboardSkeleton };