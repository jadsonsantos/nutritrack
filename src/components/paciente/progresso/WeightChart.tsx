import { Period } from '@/types'
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const WEIGHT_DATA: Record<
  Period,
  { date: string; weight: number; goal: number }[]
> = {
  '7 dias': [
    { date: 'Seg', weight: 80.2, goal: 75 },
    { date: 'Ter', weight: 79.8, goal: 75 },
    { date: 'Qua', weight: 79.5, goal: 75 },
    { date: 'Qui', weight: 79.9, goal: 75 },
    { date: 'Sex', weight: 79.1, goal: 75 },
    { date: 'Sáb', weight: 78.8, goal: 75 },
    { date: 'Dom', weight: 78.5, goal: 75 },
  ],
  '30 dias': [
    { date: '01 Mai', weight: 82.0, goal: 75 },
    { date: '08 Mai', weight: 81.2, goal: 75 },
    { date: '15 Mai', weight: 80.1, goal: 75 },
    { date: '22 Mai', weight: 79.0, goal: 75 },
    { date: 'Hoje', weight: 78.5, goal: 75 },
  ],
  '3 meses': [
    { date: 'Mar', weight: 85.0, goal: 75 },
    { date: 'Abr', weight: 82.3, goal: 75 },
    { date: 'Mai', weight: 78.5, goal: 75 },
  ],
}

export function WeightChart({ activePeriod }: { activePeriod: Period }) {
  const weightData = WEIGHT_DATA[activePeriod]
  const currentWeight = weightData[weightData.length - 1]?.weight ?? 0
  const firstWeight = weightData[0]?.weight ?? 0
  const weightDiff = (currentWeight - firstWeight).toFixed(1)
  const isLoss = currentWeight < firstWeight
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Evolução de peso
          </p>
          <div className="flex items-baseline gap-3 mt-1">
            <span className="text-4xl font-bold text-foreground">
              {currentWeight} kg
            </span>
            <span
              className={`text-sm font-medium ${isLoss ? 'text-primary' : 'text-destructive'}`}
            >
              {isLoss ? '↓' : '↑'} {Math.abs(Number(weightDiff))}kg este período
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-primary rounded" />
            Peso real
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-muted-foreground/40 rounded border-dashed" />
            Meta
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <RechartsLineChart
          data={weightData}
          margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={['auto', 'auto']}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '13px',
            }}
            formatter={(value, name) => [
              `${value as number} kg`,
              name === 'weight' ? 'Peso real' : 'Meta',
            ]}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#005440"
            strokeWidth={2.5}
            dot={{ fill: '#005440', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="goal"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            dot={false}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}
