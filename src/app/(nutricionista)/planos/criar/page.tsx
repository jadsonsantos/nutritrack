'use client'

import { useState } from 'react'

const INITIAL_MEALS = [
  { id: '1', name: 'Café da manhã', time: '08:00', icon: '🌅' },
  { id: '2', name: 'Almoço', time: '12:30', icon: '☀️' },
  { id: '3', name: 'Lanche da tarde', time: '16:00', icon: '🕓' },
]

const GOALS = [
  { key: 'calories', label: 'Calorias', unit: 'kcal', defaultValue: 2200 },
  { key: 'protein', label: 'Proteína', unit: 'g', defaultValue: 160 },
  { key: 'carbs', label: 'Carboidrato', unit: 'g', defaultValue: 250 },
  { key: 'fat', label: 'Gordura', unit: 'g', defaultValue: 70 },
]

type FoodItem = {
  id: string
  name: string
  quantity: string
  kcal: number
}

type Meal = {
  id: string
  name: string
  time: string
  icon: string
  foods: FoodItem[]
  search: string
}

export default function CreateMealPlanPage() {
  const [planName, setPlanName] = useState('Hipertrofia - Mariana')
  const [meals, setMeals] = useState<Meal[]>(
    INITIAL_MEALS.map((meal) => ({ ...meal, foods: [], search: '' }))
  )

  function handleSearchChange(mealId: string, value: string) {
    setMeals((prev) =>
      prev.map((meal) =>
        meal.id === mealId ? { ...meal, search: value } : meal
      )
    )
  }

  function handleAddFood(mealId: string) {
    setMeals((prev) =>
      prev.map((meal) => {
        if (meal.id !== mealId || !meal.search.trim()) return meal
        const newFood: FoodItem = {
          id: crypto.randomUUID(),
          name: meal.search,
          quantity: '100g',
          kcal: 120,
        }
        return { ...meal, foods: [...meal.foods, newFood], search: '' }
      })
    )
  }

  function handleRemoveFood(mealId: string, foodId: string) {
    setMeals((prev) =>
      prev.map((meal) =>
        meal.id === mealId
          ? { ...meal, foods: meal.foods.filter((food) => food.id !== foodId) }
          : meal
      )
    )
  }

  function handleAddMeal() {
    const newMeal: Meal = {
      id: crypto.randomUUID(),
      name: 'Nova refeição',
      time: '00:00',
      icon: '🍽️',
      foods: [],
      search: '',
    }
    setMeals((prev) => [...prev, newMeal])
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <input
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          aria-label="Nome do plano"
          className="text-xl font-bold text-foreground bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none transition-colors py-1"
        />
        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 text-sm border border-border rounded-lg text-muted-foreground cursor-pointer hover:text-foreground hover:bg-muted transition-colors"
            type="button"
          >
            Rascunho
          </button>
          <button
            className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium cursor-pointer"
            type="button"
          >
            Salvar plano
          </button>
        </div>
      </div>

      {/* Goal cards */}
      <div className="grid grid-cols-4 gap-4">
        {GOALS.map((goal) => (
          <div
            key={goal.key}
            className="bg-card border border-border rounded-xl p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              {goal.label}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-foreground">
                {goal.defaultValue}
              </span>
              <span className="text-sm text-muted-foreground">{goal.unit}</span>
            </div>
            <div className="h-1 bg-primary/20 rounded-full mt-3">
              <div className="h-full w-1/2 bg-primary rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Meals */}
      <div className="space-y-4">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            {/* Meal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="text-lg">{meal.icon}</span>
                <span className="font-semibold text-foreground">
                  {meal.name}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">{meal.time}</span>
            </div>

            <div className="p-4 space-y-3">
              {/* Food search */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Adicionar alimento..."
                  value={meal.search}
                  onChange={(e) => handleSearchChange(meal.id, e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddFood(meal.id)}
                  className="flex-1 text-sm bg-muted/40 border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <button
                  onClick={() => handleAddFood(meal.id)}
                  className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity text-xl font-light cursor-pointer"
                  type="button"
                  aria-label="Adicionar alimento"
                >
                  +
                </button>
              </div>

              {/* Food items */}
              {meal.foods.map((food) => (
                <div
                  key={food.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {food.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {food.quantity} · {food.kcal} kcal
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveFood(meal.id, food.id)}
                    className="w-6 h-6 rounded-full border-2 border-destructive text-destructive flex items-center justify-center text-sm cursor-pointer hover:bg-destructive hover:text-primary-foreground transition-colors"
                    type="button"
                    aria-label="Remover alimento"
                  >
                    −
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add meal */}
      <button
        onClick={handleAddMeal}
        className="w-full py-3 border border-dashed border-border rounded-xl text-sm text-muted-foreground cursor-pointer hover:text-foreground hover:border-primary hover:bg-muted/30 transition-colors"
        type="button"
      >
        + Adicionar nova refeição
      </button>
    </div>
  )
}
