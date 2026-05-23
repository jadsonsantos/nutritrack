const STATS = [
  { label: 'Média semanal', value: '2.150', unit: 'kcal' },
  { label: 'Consistência', value: '92', unit: '%' },
]

export default function StatCard() {
  return (
    <div className="space-y-4">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="bg-card border border-border rounded-xl p-5"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            {stat.label}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-foreground">
              {stat.value}
            </span>
            <span className="text-sm text-muted-foreground">{stat.unit}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
