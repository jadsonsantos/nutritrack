'use client'

import { CalorieCard } from '@/components/hoje/CalorieCard'
import { DailyGreeting } from '@/components/hoje/DailyGreeting'
import { MealTimeline } from '@/components/hoje/MealTimeline'
import { INITIAL_MEALS } from '@/constants'
import { useState } from 'react'

export default function TodayPage() {
  const [meals, setMeals] = useState(INITIAL_MEALS)

  function handleRegister(mealId: string) {
    setMeals((prev) =>
      prev.map((meal) =>
        meal.id === mealId ? { ...meal, status: 'done' as const } : meal
      )
    )
  }

  return (
    <div className="p-8 space-y-6">
      {/* Saudação */}
      <DailyGreeting name="João" />

      {/* Card de calorias */}
      <CalorieCard />

      {/* Refeições do dia */}
      <MealTimeline meals={meals} handleRegister={handleRegister} />
    </div>
  )
}
