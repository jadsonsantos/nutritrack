const MACROS = [
  { label: 'Proteínas', consumed: 145, goal: 160, color: '#005440' },
  { label: 'Carboidratos', consumed: 210, goal: 250, color: '#0F6E56' },
  { label: 'Gorduras', consumed: 55, goal: 65, color: '#BA1A1A' },
]

export default function MacrosBar() {
  return (
    <div className="col-span-2 bg-card border border-border rounded-xl p-6 space-y-5">
      <p className="font-semibold text-foreground">
        Consumo de Macronutrientes
      </p>
      {MACROS.map((macro) => (
        <div key={macro.label} className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-foreground">{macro.label}</span>
            <span className="text-muted-foreground">
              {macro.consumed}g / {macro.goal}g
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${macro.goal > 0 ? Math.min((macro.consumed / macro.goal) * 100, 100) : 0}%`,
                backgroundColor: macro.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
