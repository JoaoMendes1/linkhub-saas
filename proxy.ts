// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { decrypt, sessionOptions } from '@/lib/session'

// 1. matcher simples e explícito
export const config = {
  matcher: [
    '/', // A home page
    '/sign-in', // A página de login
    '/sign-up', // A página de cadastro
    '/admin/:path*', // TODAS as rotas de admin (ex: /admin/profile, /admin/links)
  ],
}

export async function proxy(request: NextRequest) {
  // 2. Tenta ler o cookie da sessão
  const sessionCookie = request.cookies.get(sessionOptions.name)?.value
  const session = await decrypt(sessionCookie)

  // 3. Pega a URL que o usuário está tentando acessar
  const pathname = request.nextUrl.pathname

  // --- Lógica de Redirecionamento ---

  // 4. Se o usuário ESTÁ logado (tem uma sessão válida)
  if (session) {
    // Se ele tentar acessar a home, login ou cadastro,
    // redireciona ele para o dashboard (ele já está logado!)
    if (pathname === '/' || pathname === '/sign-in' || pathname === '/sign-up') {
      return NextResponse.redirect(new URL('/admin/profile', request.url))
    }
    // Se ele estiver logado e tentando acessar /admin/*, permite
    return NextResponse.next()
  }

  // 5. Se o usuário NÃO ESTÁ logado (não tem sessão)
  if (!session) {
    // Se ele tentar acessar qualquer rota de admin,
    // redireciona ele para o login
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
    // Se ele tentar acessar a home ou outra página pública, permite
    return NextResponse.next()
  }

  // Permite o acesso por padrão
  return NextResponse.next()
}