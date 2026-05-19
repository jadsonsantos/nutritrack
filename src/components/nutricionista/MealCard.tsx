import { REFEICOES_MOCK } from '@/lib/mock-data'

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

export default function MealCard() {
  return REFEICOES_MOCK.map((r) => (
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
            <p className="font-semibold text-foreground mt-0.5">{r.nome}</p>
            {r.itens && (
              <p className="text-sm text-muted-foreground mt-1">{r.itens}</p>
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
  ))
}
