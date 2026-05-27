import PatientHeader from '@/components/nutricionista/PatientHeader'
import { PatientTabs } from '@/components/nutricionista/PatientTabs'
import { getDayRange, TIMEZONE_COOKIE } from '@/lib/date'
import { prisma } from '@/lib/prisma'
import { ArrowLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function PatientProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const cookieStore = await cookies()
  const timezone = cookieStore.get(TIMEZONE_COOKIE)?.value
  const { today, tomorrow } = getDayRange(timezone)

  const patient = await prisma.patientProfile.findUnique({
    where: { id },
    include: {
      user: true,
      weightLogs: {
        orderBy: { loggedAt: 'desc' },
        take: 1,
      },
      mealPlans: {
        where: { isActive: true },
        take: 1,
        include: {
          meals: {
            orderBy: { order: 'asc' },
            include: {
              foodLogs: {
                where: {
                  logDate: { gte: today, lt: tomorrow },
                },
                include: { tacoFood: true },
              },
            },
          },
        },
      },
    },
  })

  if (!patient) notFound()

  const activeMealPlan = patient.mealPlans[0]
  const meals = activeMealPlan?.meals ?? []

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
      <PatientTabs meals={meals} />
    </div>
  )
}
