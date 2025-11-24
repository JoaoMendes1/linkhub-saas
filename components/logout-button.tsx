// components/logout-button.tsx
'use client'

import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    // Chama a API de logout 
    await fetch('/api/auth/sign-out', { method: 'POST' })
    // Redireciona para o login e atualiza a página
    router.push('/sign-in')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
    >
      Sair
    </button>
  )


}