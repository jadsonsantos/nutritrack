'use client'

import { LoginForm } from '@/components/auth/LoginForm'
import LoginHero from '@/components/auth/LoginHero'
import RoleToggle from '@/components/auth/RoleToggle'
import Link from 'next/link'
import { useState } from 'react'

type Role = 'nutritionist' | 'patient'

export default function LoginPage() {
  const [role, setRole] = useState<Role>('nutritionist')

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo — verde */}
      <LoginHero />

      {/* Lado direito — formulário */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Título */}
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Bem-vindo de volta
            </h2>
            <p className="text-muted-foreground mt-2">
              Entre na sua conta para continuar
            </p>
          </div>

          {/* Toggle de perfil */}
          <RoleToggle role={role} handleSetRole={setRole} />

          {/* Formulário */}
          <LoginForm role={role} />

          {/* Rodapé */}
          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Não tem conta?{' '}
              <Link
                href="/register"
                className="text-primary font-medium cursor-pointer hover:underline"
              >
                Cadastre-se grátis
              </Link>
            </p>
            <p className="text-xs text-muted-foreground italic">
              O cadastro de pacientes é realizado exclusivamente pelo seu
              nutricionista responsável.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
