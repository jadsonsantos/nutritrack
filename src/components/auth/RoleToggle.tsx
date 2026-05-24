type RoleToggleProps = {
  handleSetRole: (role: 'nutritionist' | 'patient') => void
  role: 'nutritionist' | 'patient'
}

const RoleToggle = ({ handleSetRole, role }: RoleToggleProps) => {
  return (
    <div className="flex bg-muted rounded-lg p-1">
      <button
        onClick={() => handleSetRole('nutritionist')}
        className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
          role === 'nutritionist'
            ? 'bg-card text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        Nutricionista
      </button>
      <button
        onClick={() => handleSetRole('patient')}
        className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
          role === 'patient'
            ? 'bg-card text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        Paciente
      </button>
    </div>
  )
}

export default RoleToggle
