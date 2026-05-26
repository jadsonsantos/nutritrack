import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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

export default async function PatientsTable() {
  const session = await auth()

  if (!session?.user?.id) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 text-center">
        <p className="text-muted-foreground">
          Faça login para ver seus pacientes.
        </p>
      </div>
    )
  }

  const nutritionist = await prisma?.nutritionistProfile.findUnique({
    where: { userId: session.user.id },
    include: {
      patients: {
        include: {
          user: true,
          weightLogs: {
            orderBy: { loggedAt: 'desc' },
            take: 2,
          },
        },
      },
    },
  })

  const patients = nutritionist?.patients ?? []

  return (
    <div className="bg-card border border-border rounded-xl overflow-x-auto">
      {/* Header da tabela */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h2 className="font-semibold text-foreground">Pacientes Recentes</h2>
        <button
          type="button"
          className="text-sm text-primary font-medium cursor-pointer hover:underline"
        >
          Ver todos →
        </button>
      </div>

      {/* Tabela */}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            {[
              'Paciente',
              'Email',
              'Peso atual',
              'Meta',
              'Último registro',
              'Status',
            ].map((header) => (
              <th
                key={header}
                className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="text-center py-6 text-muted-foreground italic"
              >
                Nenhum paciente encontrado.
              </td>
            </tr>
          )}
          {patients.map((patient) => {
            const logs = patient.weightLogs
            const currentWeight = logs[0]?.weight ?? patient.currentWeight
            const previousWeight = logs[1]?.weight ?? null
            const variation =
              currentWeight && previousWeight
                ? currentWeight - previousWeight
                : null
            const initials =
              patient.user.name
                ?.split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2) ?? '??'

            return (
              <tr
                key={patient.id}
                className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
              >
                {/* Avatar + nome */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                      {initials}
                    </div>
                    <span className="font-medium text-foreground">
                      {patient.user.name}
                    </span>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4 text-muted-foreground">
                  {patient.user.email}
                </td>

                {/* Peso atual + variação */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <span>{currentWeight ?? '-'}kg</span>
                    {variation && variation > 0 && (
                      <span className="text-xs text-destructive">
                        ▲ {variation}
                      </span>
                    )}
                    {variation && variation < 0 && (
                      <span className="text-xs text-primary">
                        ▼ {Math.abs(variation) ?? '-'}
                      </span>
                    )}
                    {variation === 0 && (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </div>
                </td>

                {/* Meta */}
                <td className="px-6 py-4 text-muted-foreground">
                  {patient.goalWeight ?? '-'}kg
                </td>

                {/* Último registro */}
                <td className="px-6 py-4 text-muted-foreground">
                  {/* {patient.ultimoRegistro} */}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_ESTILO['em-dia']}`}
                  >
                    {STATUS_LABEL['em-dia']}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
