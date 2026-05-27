import { MealWithLogs } from '@/types'

const STATUS_ESTILO = {
  registrado: 'bg-primary/10 text-primary',
  aguardando: 'bg-muted text-muted-foreground',
}

const STATUS_LABEL = {
  registrado: 'Registrado',
  aguardando: 'Aguardando registro',
}

type Props = {
  meals: MealWithLogs[]
}

export default function MealCard({ meals }: Props) {
  return (
    <div className="space-y-4">
      {meals.map((meal) => {
        const hasLogs = meal.foodLogs.length > 0
        const status = hasLogs ? 'registrado' : 'aguardando'

        const totalKcal = meal.foodLogs.reduce((acc, log) => {
          return acc + (log.tacoFood.caloriesPer100g * log.quantityG) / 100
        }, 0)

        return (
          <div key={meal.id} className="flex gap-4 items-start">
            <div className="flex flex-col items-center gap-1 pt-1 shrink-0">
              <div
                className={`w-2.5 h-2.5 rounded-full ${hasLogs ? 'bg-primary' : 'bg-muted-foreground'}`}
              />
            </div>

            <div className="flex-1 bg-card border border-border rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {meal.mealTime}
                  </p>
                  <p className="font-semibold text-foreground mt-0.5">
                    {meal.name}
                  </p>

                  {hasLogs ? (
                    <div className="mt-2 space-y-1">
                      {meal.foodLogs.map((log) => (
                        <p
                          key={log.id}
                          className="text-sm text-muted-foreground"
                        >
                          {log.tacoFood.name} — {log.quantityG}g
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic mt-1">
                      Aguardando registro do paciente...
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-4">
                  {hasLogs && (
                    <span className="text-sm font-medium text-foreground">
                      {Math.round(totalKcal)} kcal
                    </span>
                  )}
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_ESTILO[status]}`}
                  >
                    {STATUS_LABEL[status]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
