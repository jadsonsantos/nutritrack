import { getDate } from '@/utils'
import { Bell, HelpCircle, Search, UserPlus } from 'lucide-react'

type Props = {
  titulo: string
}

export function HeaderNutricionista({ titulo }: Props) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-8 h-16 bg-card border-b border-border">
      {/* Esquerda — título da página */}
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-foreground">{titulo}</h1>
        <p className="text-sm text-muted-foreground">{getDate()}</p>
      </div>

      {/* Direita — busca + ações */}
      <div className="flex items-center gap-4">
        {/* Campo de busca */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Buscar paciente..."
            aria-label="Buscar paciente"
            className="pl-9 pr-4 py-2 text-sm bg-background border border-border rounded-full w-56 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>

        {/* Botão novo paciente */}
        <button
          type="button"
          aria-label="Novo paciente"
          className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-full cursor-pointer hover:opacity-90 transition-opacity"
        >
          <UserPlus size={16} />
          Novo paciente
        </button>

        {/* Ícones */}
        <div className="flex items-center gap-3 text-muted-foreground">
          <Bell
            size={20}
            className="cursor-pointer hover:text-foreground transition-colors"
          />
          <HelpCircle
            size={20}
            className="cursor-pointer hover:text-foreground transition-colors"
          />
        </div>
      </div>
    </header>
  )
}
