const DAILY_GOAL = {
  calories: 2200,
  protein: 150,
  carbs: 290,
  fat: 65,
}

const INITIAL_MEALS = [
  {
    id: '1',
    name: 'Café da Manhã',
    time: '07:30',
    estimatedKcal: 420,
    status: 'done' as const,
    foods: ['Ovos mexidos', 'Pão Integral', 'Café'],
  },
  {
    id: '2',
    name: 'Almoço',
    time: '12:30',
    estimatedKcal: 650,
    status: 'pending' as const,
    foods: [],
  },
  {
    id: '3',
    name: 'Lanche da Tarde',
    time: '16:00',
    estimatedKcal: 210,
    status: 'upcoming' as const,
    foods: [],
  },
  {
    id: '4',
    name: 'Jantar',
    time: '19:30',
    estimatedKcal: 720,
    status: 'upcoming' as const,
    foods: [],
  },
]

const STATUS_CONFIG = {
  done: {
    label: 'Registrado',
    dotClass: 'bg-primary',
    badgeClass: 'bg-primary/10 text-primary',
  },
  pending: {
    label: 'Registrar',
    dotClass: 'bg-muted-foreground',
    badgeClass: 'bg-primary text-primary-foreground',
  },
  upcoming: {
    label: 'Pendente',
    dotClass: 'bg-muted-foreground/40',
    badgeClass: 'bg-muted text-muted-foreground',
  },
}

const CONSUMED = {
  calories: 750,
  protein: 60,
  carbs: 120,
  fat: 30,
}

const MACROS = [
  {
    label: 'Proteína',
    consumed: CONSUMED.protein,
    goal: DAILY_GOAL.protein,
    unit: 'g',
    color: 'bg-primary',
  },
  {
    label: 'Carb',
    consumed: CONSUMED.carbs,
    goal: DAILY_GOAL.carbs,
    unit: 'g',
    color: 'bg-primary/60',
  },
  {
    label: 'Gordura',
    consumed: CONSUMED.fat,
    goal: DAILY_GOAL.fat,
    unit: 'g',
    color: 'bg-destructive/70',
  },
]

const PERIODS = ['7 dias', '30 dias', '3 meses'] as const

export { CONSUMED, DAILY_GOAL, INITIAL_MEALS, MACROS, PERIODS, STATUS_CONFIG }
