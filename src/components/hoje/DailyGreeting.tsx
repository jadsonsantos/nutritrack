import { getDate } from '@/utils'

export function DailyGreeting({ name }: { name: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Olá, {name}!</h1>
      <p className="text-sm text-muted-foreground mt-1">{getDate()}</p>
    </div>
  )
}
