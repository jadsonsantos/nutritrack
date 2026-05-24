const FEATURES = [
  'Planos alimentares personalizados em minutos',
  'Acompanhe o progresso em tempo real',
  'Dashboard completo de macronutrientes',
]

const LoginHero = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground font-bold text-sm">
          N
        </div>
        <span className="text-primary-foreground font-bold text-xl">
          NutriTrack
        </span>
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-primary-foreground leading-tight">
            Nutrição que
            <br />
            transforma vidas
          </h1>
          <p className="text-primary-foreground/70 mt-4 text-lg">
            Conecte nutricionistas e pacientes em uma plataforma moderna,
            intuitiva e completa.
          </p>
        </div>

        <ul className="space-y-3">
          {FEATURES.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 text-primary-foreground/90"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground/60 shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-primary-foreground/40 text-sm">
        © 2026 NutriTrack. Todos os direitos reservados.
      </p>
    </div>
  )
}

export default LoginHero
