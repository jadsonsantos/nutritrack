import MetricsCard from '@/components/nutricionista/MetricsCard'
import PatientsTable from '@/components/nutricionista/PatientsTable'

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <MetricsCard />
      <PatientsTable />
    </div>
  )
}
