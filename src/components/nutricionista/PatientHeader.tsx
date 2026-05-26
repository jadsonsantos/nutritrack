interface PatientProps {
  patient: {
    user: {
      name: string | null
      createdAt: Date | string
    }
    currentWeight: number | null
    goalWeight: number | null
  }
}

export default function PatientHeader({
  patient,
}: {
  patient: PatientProps['patient']
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-6">
      {/* Avatar */}
      <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold shrink-0">
        {patient.user.name
          ?.split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2) ?? '??'}
      </div>

      {/* Nome + info */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-foreground">
          {patient.user.name}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Paciente desde{' '}
          {new Date(patient.user.createdAt).toLocaleDateString('pt-BR', {
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>

      {/* Peso + meta */}
      <div className="flex items-center gap-8">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            Peso atual
          </p>
          <p className="text-2xl font-bold text-foreground">
            {patient.currentWeight} kg
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            Meta
          </p>
          <p className="text-2xl font-bold text-primary">
            {patient.goalWeight} kg
          </p>
          {/* Barra de progresso */}
          {patient.currentWeight != null && patient.goalWeight != null && (
            <>
              <div className="w-32 h-1.5 bg-muted rounded-full mt-2">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    width: `${(patient.currentWeight / patient.goalWeight) * 100}%`,
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {((patient.currentWeight / patient.goalWeight) * 100).toFixed(
                  0
                )}
                % da meta
              </p>
            </>
          )}
        </div>
      </div>

      {/* Botão criar plano */}
      <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-3 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
        Criar plano
      </button>
    </div>
  )
}
