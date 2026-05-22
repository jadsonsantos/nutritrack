import { Macro } from '@/types'

export function MacroProgress({ macro }: { macro: Macro }) {
  return (
    <div key={macro.label}>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-muted-foreground">{macro.label}</span>
        <span className="font-medium text-foreground">
          {macro.consumed}
          {macro.unit}{' '}
          <span className="text-muted-foreground font-normal">
            / {macro.goal}
            {macro.unit}
          </span>
        </span>
      </div>
      <div className="h-1.5 bg-muted rounded-full">
        <div
          className={`h-full rounded-full ${macro.color}`}
          style={{
            width: `${Math.min((macro.consumed / macro.goal) * 100, 100)}%`,
          }}
        />
      </div>
    </div>
  )
}
