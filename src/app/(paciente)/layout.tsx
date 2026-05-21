'use client'

import { Sidebar } from '@/components/shared/Sidebar'
import { CalendarDays, TrendingUp, User } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/hoje', label: 'Hoje', icon: CalendarDays },
  { href: '/progresso', label: 'Progresso', icon: TrendingUp },
  { href: '/perfil', label: 'Perfil', icon: User },
]

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={NAV_ITEMS} name="João Silva" role="Paciente" />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  )
}
