'use client'

import MealCard from '@/components/nutricionista/MealCard'
import { MealWithLogs } from '@/types'
import { getDate } from '@/utils'
import { useState } from 'react'

const TABS = ['Diário alimentar', 'Evolução', 'Plano ativo']

type Props = {
  meals: MealWithLogs[]
}

export function PatientTabs({ meals }: Props) {
  const [activeTab, setActiveTab] = useState('Diário alimentar')

  return (
    <>
      <div className="flex gap-1 border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            type="button"
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer ${
              activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Diário alimentar' && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {getDate()}
          </p>
          <MealCard meals={meals} />
        </div>
      )}

      {activeTab === 'Evolução' && (
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-muted-foreground text-sm">
            Gráficos de evolução — em breve.
          </p>
        </div>
      )}

      {activeTab === 'Plano ativo' && (
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-muted-foreground text-sm">
            Plano alimentar ativo — em breve.
          </p>
        </div>
      )}
    </>
  )
}
