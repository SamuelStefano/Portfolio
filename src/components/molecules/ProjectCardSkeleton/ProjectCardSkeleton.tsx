export const ProjectCardSkeleton = () => (
  <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
    {/* accent bar */}
    <div className="h-0.5 w-full bg-primary/20" />
    {/* thumbnail */}
    <div className="h-44 bg-muted/40" />
    <div className="p-5 space-y-3">
      {/* badge row */}
      <div className="flex justify-between">
        <div className="h-5 w-20 bg-muted/50 rounded-full" />
        <div className="h-5 w-12 bg-muted/50 rounded-full" />
      </div>
      {/* title */}
      <div className="h-4 w-3/4 bg-muted/50 rounded" />
      {/* description */}
      <div className="space-y-1.5">
        <div className="h-3 w-full bg-muted/40 rounded" />
        <div className="h-3 w-5/6 bg-muted/40 rounded" />
      </div>
      {/* tech badges */}
      <div className="flex gap-1.5">
        <div className="h-4 w-12 bg-muted/40 rounded" />
        <div className="h-4 w-16 bg-muted/40 rounded" />
        <div className="h-4 w-10 bg-muted/40 rounded" />
      </div>
      {/* button */}
      <div className="h-8 w-full bg-muted/30 rounded-md" />
    </div>
  </div>
);

export default ProjectCardSkeleton;
