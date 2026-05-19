import { PACIENTES } from '@/lib/mock-data'

const STATUS_ESTILO = {
  'em-dia': 'bg-primary/10 text-primary',
  atencao: 'bg-destructive/10 text-destructive',
  'sem-plano': 'bg-muted text-muted-foreground',
}

const STATUS_LABEL = {
  'em-dia': 'Em dia',
  atencao: 'Atenção',
  'sem-plano': 'Sem plano',
}

export default function PatientsTable() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Header da tabela */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h2 className="font-semibold text-foreground">Pacientes Recentes</h2>
        <button className="text-sm text-primary font-medium hover:underline">
          Ver todos →
        </button>
      </div>

      {/* Tabela */}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Paciente
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Email
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Peso atual
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Meta
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Último registro
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {PACIENTES.map((patient) => (
            <tr
              key={patient.id}
              className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
            >
              {/* Avatar + nome */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    {patient.iniciais}
                  </div>
                  <span className="font-medium text-foreground">
                    {patient.nome}
                  </span>
                </div>
              </td>

              {/* Email */}
              <td className="px-6 py-4 text-muted-foreground">
                {patient.email}
              </td>

              {/* Peso atual + variação */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-1.5">
                  <span>{patient.pesoAtual}kg</span>
                  {patient.variacao > 0 && (
                    <span className="text-xs text-destructive">
                      ▲ {patient.variacao}
                    </span>
                  )}
                  {patient.variacao < 0 && (
                    <span className="text-xs text-primary">
                      ▼ {Math.abs(patient.variacao)}
                    </span>
                  )}
                  {patient.variacao === 0 && (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </div>
              </td>

              {/* Meta */}
              <td className="px-6 py-4 text-muted-foreground">
                {patient.pesoMeta}kg
              </td>

              {/* Último registro */}
              <td className="px-6 py-4 text-muted-foreground">
                {patient.ultimoRegistro}
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_ESTILO[patient.status]}`}
                >
                  {STATUS_LABEL[patient.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
