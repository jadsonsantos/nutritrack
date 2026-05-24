'use client'

import Header from '@/components/paciente/progresso/Header'
import MacrosBar from '@/components/paciente/progresso/MacrosBars'
import StatCard from '@/components/paciente/progresso/StatCard'
import { WeightChart } from '@/components/paciente/progresso/WeightChart'
import { Period } from '@/types'
import { useState } from 'react'

export default function ProgressPage() {
  const [activePeriod, setActivePeriod] = useState<Period>('30 dias')

  return (
    <div className="p-8 space-y-6 max-w-5xl">
      {/* Header */}
      <Header activePeriod={activePeriod} onPeriodChange={setActivePeriod} />

      {/* Gráfico de peso */}
      <WeightChart activePeriod={activePeriod} />

      {/* Macros + stats */}
      <div className="grid grid-cols-3 gap-6">
        {/* Macros */}
        <MacrosBar />

        {/* Stats */}
        <StatCard />
      </div>
    </div>
  )
}
