'use client'

import MealCard from '@/components/nutricionista/MealCard'
import PatientHeader from '@/components/nutricionista/PatientHeader'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const ABAS = ['Diário alimentar', 'Evolução', 'Plano ativo']

export default function PerfilPacientePage() {
  const [abaAtiva, setAbaAtiva] = useState('Diário alimentar')

  const getDate = () => {
    return new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      weekday: 'long',
    })
  }

  return (
    <div className="p-8 space-y-6">
      {/* Voltar */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar
      </Link>

      <PatientHeader />

      {/* Abas */}
      <div className="flex gap-1 border-b border-border">
        {ABAS.map((aba) => (
          <button
            key={aba}
            onClick={() => setAbaAtiva(aba)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              abaAtiva === aba
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {aba}
          </button>
        ))}
      </div>

      {/* Conteúdo da aba ativa */}
      {abaAtiva === 'Diário alimentar' && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {getDate()}
          </p>
          <MealCard />
        </div>
      )}

      {abaAtiva === 'Evolução' && (
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-muted-foreground text-sm">
            Gráficos de evolução — em breve.
          </p>
        </div>
      )}

      {abaAtiva === 'Plano ativo' && (
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-muted-foreground text-sm">
            Plano alimentar ativo — em breve.
          </p>
        </div>
      )}
    </div>
  )
}
