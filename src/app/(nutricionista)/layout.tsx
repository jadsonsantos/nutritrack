'use client'

import { HeaderNutricionista } from '@/components/nutricionista/Header'
import { Sidebar } from '@/components/shared/Sidebar'
import {
  BarChart2,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Users,
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/pacientes', label: 'Pacientes', icon: Users },
  { href: '/planos', label: 'Planos', icon: ClipboardList },
  { href: '/relatorios', label: 'Relatórios', icon: BarChart2 },
  { href: '/configuracoes', label: 'Configurações', icon: Settings },
]

export default function LayoutNutricionista({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={NAV_ITEMS} name="Jadson Santos" role="Nutricionista" />
      <main className="flex-1 flex flex-col">
        <HeaderNutricionista titulo="Bom dia, Jadson!" />
        {children}
      </main>
    </div>
  )
}
