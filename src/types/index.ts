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

export type Period = (typeof PERIODS)[number]
