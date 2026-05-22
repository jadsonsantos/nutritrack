import { STATUS_CONFIG } from '@/constants'
import { Meal } from '@/types'
import { MealCard } from './MealCard'

interface MealTimelineProps {
  meals: Meal[]
  handleRegister: (mealId: string) => void
}

export function MealTimeline({ meals, handleRegister }: MealTimelineProps) {
  return (
    <div>
      <h2 className="font-semibold text-foreground mb-4">Refeições de Hoje</h2>

      <div className="space-y-3">
        {meals.map((meal) => {
          const config = STATUS_CONFIG[meal.status]
          return (
            <div key={meal.id} className="flex gap-4 items-start">
              {/* Dot da linha do tempo */}
              <div className="flex flex-col items-center gap-1 pt-4 shrink-0">
                <div className={`w-3 h-3 rounded-full ${config.dotClass}`} />
              </div>

              {/* Card da refeição */}
              <MealCard meal={meal} onRegister={handleRegister} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
