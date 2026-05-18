// lib/mock-data.ts
export type Paciente = {
  id: string
  nome: string
  email: string
  iniciais: string
  pesoAtual: number
  pesoMeta: number
  variacao: number
  ultimoRegistro: string
  status: 'em-dia' | 'atencao' | 'sem-plano'
}

export const PACIENTES: Paciente[] = [
  {
    id: '1',
    nome: 'Ana Lúcia Oliveira',
    email: 'ana.lucia@email.com',
    iniciais: 'AL',
    pesoAtual: 64.5,
    pesoMeta: 60.0,
    variacao: +0.8,
    ultimoRegistro: 'Hoje, 08:45',
    status: 'em-dia',
  },
  {
    id: '2',
    nome: 'Ricardo Mendonça',
    email: 'r.mendonca@email.com',
    iniciais: 'RM',
    pesoAtual: 89.2,
    pesoMeta: 82.0,
    variacao: -1.1,
    ultimoRegistro: 'Ontem, 19:20',
    status: 'atencao',
  },
  {
    id: '3',
    nome: 'Mariana Borges',
    email: 'mari.borges@email.com',
    iniciais: 'MB',
    pesoAtual: 58.0,
    pesoMeta: 58.0,
    variacao: 0.0,
    ultimoRegistro: 'Há 3 dias',
    status: 'sem-plano',
  },
  {
    id: '4',
    nome: 'Guilherme Santos',
    email: 'guilherme.s@email.com',
    iniciais: 'GS',
    pesoAtual: 104.2,
    pesoMeta: 95.0,
    variacao: -2.3,
    ultimoRegistro: 'Hoje, 10:15',
    status: 'em-dia',
  },
]

export const METRICAS = [
  {
    label: 'Pacientes ativos',
    valor: 124,
    detalhe: '+4% este mês',
    destaque: false,
  },
  {
    label: 'Com plano ativo',
    valor: 112,
    detalhe: '90.3% do total',
    destaque: false,
  },
  {
    label: 'Registros hoje',
    valor: 86,
    detalhe: 'Boa adesão',
    destaque: false,
  },
  {
    label: 'Precisam de atenção',
    valor: 12,
    detalhe: 'Sem registro 3d',
    destaque: true,
  },
]
