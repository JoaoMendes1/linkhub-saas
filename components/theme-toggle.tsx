// components/theme-toggle.tsx
'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Renderiza um placeholder "invisível" no servidor
    return <div className="h-9 w-9" />
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      // Corrigido com estilos para light E dark hover
      className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
      aria-label="Toggle dark mode"
    >
      {resolvedTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}