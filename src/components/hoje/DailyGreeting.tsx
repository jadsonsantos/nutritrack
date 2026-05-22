export function DailyGreeting({ name }: { name: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Olá, {name}!</h1>
      <p className="text-sm text-muted-foreground mt-1">
        {new Date().toLocaleDateString('pt-BR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })}
      </p>
    </div>
  )
}
