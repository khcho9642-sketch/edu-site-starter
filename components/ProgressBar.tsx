export default function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div>
      {label && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted">{label}</span>
          <span className="font-semibold tabular-nums">{value}%</span>
        </div>
      )}
      <div
        className="h-2 rounded-full bg-line overflow-hidden"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
