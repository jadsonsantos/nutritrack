import { PERIODS } from '@/constants'
import { Period } from '@/types'

interface HeaderProps {
  activePeriod: Period
  onPeriodChange: (period: Period) => void
}

export default function Header({ onPeriodChange, activePeriod }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-foreground">Progresso</h1>
      <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
        {PERIODS.map((period) => (
          <button
            key={period}
            onClick={() => onPeriodChange(period)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activePeriod === period
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  )
}
