import { CONSUMED, DAILY_GOAL, MACROS } from '@/constants'
import { CalorieRing } from './CalorieRing'
import { MacroProgress } from './MacroProgress'

export function CalorieCard() {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-8">
        {/* Círculo de progresso */}
        <CalorieRing consumed={CONSUMED.calories} goal={DAILY_GOAL.calories} />

        {/* Macros */}
        <div className="flex-1 space-y-4">
          {MACROS.map((macro) => (
            <MacroProgress key={macro.label} macro={macro} />
          ))}
        </div>
      </div>
    </div>
  )
}
