import PatientHeader from '@/components/nutricionista/PatientHeader'
import { PatientTabs } from '@/components/nutricionista/PatientTabs'
import { prisma } from '@/lib/prisma'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function PatientProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const patient = await prisma.patientProfile.findUnique({
    where: { id },
    include: {
      user: true,
      weightLogs: {
        orderBy: { loggedAt: 'desc' },
        take: 1,
      },
    },
  })

  if (!patient) notFound()

  return (
    <div className="p-8 space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar
      </Link>
      <PatientHeader patient={patient} />
      <PatientTabs />
    </div>
  )
}
