// components/header.tsx
import Link from 'next/link'
import { cookies } from 'next/headers'
import { decrypt, sessionOptions } from '@/lib/session'
import { ThemeToggle } from '@/components/theme-toggle'
import { LogoutButton } from '@/components/logout-button'

export async function Header() {
  // 1. Ler e verificar a sessão (CORRIGIDO: Adicionado 'await')
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(sessionOptions.name)?.value
  const session = await decrypt(sessionCookie)

  return (
    <header className="border-b border-zinc-200 bg-white/75 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/75 sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Logo / Home */}
        <Link href="/" className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
          LinkHub
        </Link>

        <div className="flex items-center gap-6">
          {/* Lógica Condicional: Logado vs Não Logado */}
          {session ? (
            // SE ESTIVER LOGADO:
            <>
              <Link 
                href="/admin/profile" 
                className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
              >
                Dashboard
              </Link>
              <LogoutButton />
            </>
          ) : (
            // SE NÃO ESTIVER LOGADO:
            <>
              <Link 
                href="/sign-in"
                className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Entrar
              </Link>
              <Link 
                href="/sign-up"
                className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
              >
                Criar conta
              </Link>
            </>
          )}

          {/* Botão de Tema (Sempre visível) */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}