//app/sign-in/page.tsx

'use client'
import Link from 'next/link'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { stringify } from 'querystring'

export default function SignInPage() {
  // Estados para guardar novos usuários
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState<string | null>(null)

  const router = useRouter() // Hook para redirecionar 

  // Função que roda a enviar o formulário 
  const handleSubmit = async (event: 
    FormEvent<HTMLFormElement>) => {
      // 1. Previne o recarregamento da página 
      event.preventDefault()
      setError(null) // Limpa erros antigos 

    // 2. Chamar a API 
    try {
      const response = await fetch('/api/auth/sign-in', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          email: email, 
          password: password, 
        }),
      })


      const data = await response.json()
      // 3. Lida com a resposta da API 
      if (!response.ok) {
        // Se a API retornou um erro (ex: 401 Credenciais inválidas)
        setError(data.error || 'Falha no login.')
      } else {
        // SUCESSO!
        // Redireciona para o dashboard de perfil
        router.push('/admin/profile')
      }
    } catch (err) {
      // Se a 'fetch' falhar (ex: sem internet)
      setError('Erro ao conectar. Tente novamente')
    }
  }

  return (
    // Aplicando as classes de tema (light/dark)
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-8 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-800">
        {/* Cabeçalho */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Acessar sua conta
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Bem-vindo de volta! Insira seus dados.
          </p>
        </div>

        {/* Formulário (agora com onSubmit) */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Campo de Email (agora com value e onChange) */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-200"
            >
              Endereço de e-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full rounded-md border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 sm:text-sm"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Campo de Senha (agora com value e onChange) */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-200"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full rounded-md border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 sm:text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* NOVO: Exibição de Erro */}
          {error && (
            <div className="rounded-md border border-red-800 bg-red-950 p-3 text-center text-sm text-red-300">
              <p>{error}</p>
            </div>
          )}

          {/* Botão de Entrar */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-800"
            >
              Entrar
            </button>
          </div>
        </form>

        {/* Link para Cadastro */}
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Não tem uma conta?{' '}
          <Link
            href="/sign-up"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  )
}