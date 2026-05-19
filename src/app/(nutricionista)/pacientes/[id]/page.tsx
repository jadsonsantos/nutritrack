'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const PACIENTE_MOCK = {
  nome: 'Mariana Souza',
  iniciais: 'MS',
  desde: 'Jan 2024',
  pesoAtual: 68,
  pesoMeta: 64,
  progressoPct: 75,
}

const REFEICOES_MOCK = [
  {
    id: '1',
    horario: '08:15',
    nome: 'Café da Manhã',
    kcal: 320,
    itens: 'Iogurte natural, 100g de mirtilos, 2 colheres de granola',
    status: 'dentro' as const,
  },
  {
    id: '2',
    horario: '12:45',
    nome: 'Almoço',
    kcal: 540,
    itens: 'Salmão grelhado, aspargos e 3 colheres de quinoa',
    status: 'ajuste' as const,
  },
  {
    id: '3',
    horario: '16:00',
    nome: 'Lanche da Tarde',
    kcal: null,
    itens: null,
    status: 'aguardando' as const,
  },
]

const ABAS = ['Diário alimentar', 'Evolução', 'Plano ativo']

const STATUS_ESTILO = {
  dentro: 'bg-primary/10 text-primary',
  ajuste: 'bg-yellow-100 text-yellow-700',
  aguardando: 'bg-muted text-muted-foreground',
}

const STATUS_LABEL = {
  dentro: 'Dentro do plano',
  ajuste: 'Ajuste sugerido',
  aguardando: 'Aguardando registro',
}

export default function PerfilPacientePage() {
  const [abaAtiva, setAbaAtiva] = useState('Diário alimentar')

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

      {/* Header do paciente */}
      <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-6">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold shrink-0">
          {PACIENTE_MOCK.iniciais}
        </div>

        {/* Nome + info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">
            {PACIENTE_MOCK.nome}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Paciente desde {PACIENTE_MOCK.desde}
          </p>
        </div>

        {/* Peso + meta */}
        <div className="flex items-center gap-8">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
              Peso atual
            </p>
            <p className="text-2xl font-bold text-foreground">
              {PACIENTE_MOCK.pesoAtual} kg
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
              Meta
            </p>
            <p className="text-2xl font-bold text-primary">
              {PACIENTE_MOCK.pesoMeta} kg
            </p>
            {/* Barra de progresso */}
            <div className="w-32 h-1.5 bg-muted rounded-full mt-2">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${PACIENTE_MOCK.progressoPct}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {PACIENTE_MOCK.progressoPct}% da meta
            </p>
          </div>
        </div>

        {/* Botão criar plano */}
        <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-3 rounded-xl hover:opacity-90 transition-opacity">
          Criar plano
        </button>
      </div>

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
            Hoje, 18 de maio
          </p>

          {REFEICOES_MOCK.map((r) => (
            <div key={r.id} className="flex gap-4 items-start">
              {/* Linha do tempo */}
              <div className="flex flex-col items-center gap-1 pt-1 shrink-0">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${r.status === 'aguardando' ? 'bg-muted-foreground' : 'bg-primary'}`}
                />
              </div>

              {/* Card da refeição */}
              <div className="flex-1 bg-card border border-border rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{r.horario}</p>
                    <p className="font-semibold text-foreground mt-0.5">
                      {r.nome}
                    </p>
                    {r.itens && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {r.itens}
                      </p>
                    )}
                    {!r.itens && (
                      <p className="text-sm text-muted-foreground italic mt-1">
                        Aguardando registro da paciente...
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    {r.kcal && (
                      <span className="text-sm font-medium text-foreground">
                        {r.kcal} kcal
                      </span>
                    )}
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_ESTILO[r.status]}`}
                    >
                      {STATUS_LABEL[r.status]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
