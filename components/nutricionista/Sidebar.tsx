'use client'

import {
  BarChart2,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/pacientes', label: 'Pacientes', icon: Users },
  { href: '/planos', label: 'Planos', icon: ClipboardList },
  { href: '/relatorios', label: 'Relatórios', icon: BarChart2 },
  { href: '/configuracoes', label: 'Configurações', icon: Settings },
]

export function SidebarNutricionista() {
  const pathname = usePathname()

  return (
    <aside className="w-[220px] shrink-0 flex flex-col min-h-screen border-r border-border bg-card">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-border">
        <span className="text-xl font-bold text-primary">NutriTrack</span>
      </div>

      {/* Perfil */}
      <div className="px-6 py-5 border-b border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
          JS
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Jadson Santos</p>
          <p className="text-xs text-muted-foreground">Nutricionista Clínico</p>
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
