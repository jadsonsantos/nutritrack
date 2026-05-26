import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  const isLoggedIn = !!session
  const role = session?.user?.role

  // Rotas públicas — qualquer um pode acessar
  const publicRoutes = ['/login']
  if (publicRoutes.includes(pathname)) {
    // Se já está logado, redireciona pro lugar certo
    if (isLoggedIn) {
      if (role === 'NUTRITIONIST') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
      return NextResponse.redirect(new URL('/hoje', req.url))
    }
    return NextResponse.next()
  }

  // Se não está logado, manda pro login
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Rotas do nutricionista — só nutricionista acessa
  if (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/pacientes') ||
    pathname.startsWith('/planos') ||
    pathname.startsWith('/relatorios')
  ) {
    if (role !== 'NUTRITIONIST') {
      return NextResponse.redirect(new URL('/hoje', req.url))
    }
  }

  // Rotas do paciente — só paciente acessa
  if (pathname.startsWith('/hoje') || pathname.startsWith('/progresso')) {
    if (role !== 'PATIENT') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
