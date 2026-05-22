import { STATUS_CONFIG } from '@/constants'
import type { Meal } from '@/types'

export function MealCard({
  meal,
  onRegister,
}: {
  meal: Meal
  onRegister: (id: string) => void
}) {
  const config = STATUS_CONFIG[meal.status]

  return (
    <div className="flex-1 bg-card border border-border rounded-xl p-4 flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground">{meal.time}</p>
        <p className="font-semibold text-foreground mt-0.5">{meal.name}</p>
        {meal.foods.length > 0 && (
          <p className="text-sm text-muted-foreground mt-1">
            {meal.foods.join(', ')}
          </p>
        )}
        <p className="text-sm text-muted-foreground mt-1">
          {meal.estimatedKcal} kcal
        </p>
      </div>

      <button
        onClick={() => meal.status === 'pending' && onRegister(meal.id)}
        className={`text-sm font-medium px-4 py-2 rounded-lg transition-opacity ${config.badgeClass} ${meal.status === 'pending' ? 'hover:opacity-90 cursor-pointer' : 'cursor-default'}`}
      >
        {config.label}
      </button>
    </div>
  )
}
