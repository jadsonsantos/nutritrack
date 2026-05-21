'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ size?: number }>
}

type SidebarProps = {
  items: NavItem[]
  name: string
  role: string
}

export function Sidebar({ items, name, role }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-[220px] shrink-0 flex flex-col min-h-screen border-r border-border bg-card">
      {/* Logo */}
      <Link
        href="/hoje"
        className="px-6 py-6 border-b border-border block hover:opacity-80 transition-opacity"
      >
        <span className="text-xl font-bold text-primary">NutriTrack</span>
      </Link>

      {/* Perfil */}
      <div className="px-6 py-5 border-b border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
          {name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map(({ href, label, icon: Icon }) => {
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
