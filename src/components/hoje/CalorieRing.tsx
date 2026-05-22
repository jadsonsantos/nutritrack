export function CalorieRing({
  consumed,
  goal,
}: {
  consumed: number
  goal: number
}) {
  const pct = goal > 0 ? Math.min((consumed / goal) * 100, 100) : 0
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (pct / 100) * circumference
  const remaining = goal - consumed

  return (
    <div className="relative shrink-0">
      <svg width="128" height="128" viewBox="0 0 128 128">
        <circle
          cx="64"
          cy="64"
          r="54"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-muted"
        />
        <circle
          cx="64"
          cy="64"
          r="54"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 64 64)"
          className="text-primary transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-foreground">
          {remaining.toLocaleString('pt-BR')}
        </span>
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          kcal restantes
        </span>
      </div>
    </div>
  )
}
