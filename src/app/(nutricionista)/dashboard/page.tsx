import PatientsTable from '@/components/nutricionista/PatientsTable'
import { METRICAS } from '@/lib/mock-data'

export default function DashboardPage() {
  return (
    <>
      <div className="p-8 space-y-8">
        {/* Cards de métricas */}
        <div className="grid grid-cols-4 gap-6">
          {METRICAS.map((metrica) => (
            <div
              key={metrica.label}
              className="bg-card border border-border rounded-xl p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                {metrica.label}
              </p>
              <p
                className={`text-4xl font-bold ${metrica.destaque ? 'text-destructive' : 'text-foreground'}`}
              >
                {metrica.valor}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {metrica.detalhe}
              </p>
            </div>
          ))}
        </div>
      </div>
      <PatientsTable />
    </>
  )
}
