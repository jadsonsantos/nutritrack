import { PACIENTE_MOCK } from '@/lib/mock-data'

export default function PatientHeader() {
  return (
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
      <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-3 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
        Criar plano
      </button>
    </div>
  )
}
