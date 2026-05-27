import { PERIODS } from '@/constants'

export type MealStatus = 'done' | 'pending' | 'upcoming'

export interface Meal {
  id: string
  name: string
  time: string
  foods: string[]
  estimatedKcal: number
  status: MealStatus
}

export type Macro = {
  label: string
  consumed: number
  goal: number
  unit: string
  color: string
}

export type FoodLogWithFood = {
  id: string
  quantityG: number
  mealId: string | null
  tacoFood: {
    name: string
    caloriesPer100g: number
    proteinPer100g: number
    carbsPer100g: number
    fatPer100g: number
  }
}

export type MealWithLogs = {
  id: string
  name: string
  mealTime: string | null
  order: number
  foodLogs: FoodLogWithFood[]
}

export type Period = (typeof PERIODS)[number]
