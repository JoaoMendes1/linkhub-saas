// app/sign-up/page.tsx

'use client'

import Link from 'next/link'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {

  //"Estados" para guardar os dados do formulário
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // "Estados" para feedback ao usuário
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const router = useRouter() // Hook para redirecionar 

  // Função que roda ao enviar o formulário 
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // 1. Previne o recarregamento da página 
      event.preventDefault()
      setError(null) // Limpa erros antigos
      setSuccess(null)

    // 2. Validação client-side (senhas não conferem)
    if (password !== confirmPassword) {
      setError('As senhas não conferem!')
      return // Stop 
    }

    // 3. Tentativa chamar a API 
    try {
      const response = await fetch('api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      const data = await response.json()

      // 4. Lida com a respsta da API 
      if (!response.ok) {
        // Se a API retornou um erro (ex: "Email já existe")
        setError(data.error || 'Falha ao criar conta.')
      } else {
        // SUCESSO
        setSuccess('Usuário criado com sucesso! Redirecionando...')

        //Redireciona para o login após 2 segundos
        setTimeout(() => {
          // Forçamos um carregamento total da página.
        // Isso garante que o Header (Server Component) seja recriado do zero.
        // window.location.href = '/admin/profile'
          router.push('/sign-in')
        }, 2000)
      }
    } catch (err) {
      // Se a 'fetch' falhar (ex: sem internet)
      setError('Erro ao conectar. Tente novamente.')
    }
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-8 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-800">
        {/* Cabeçalho */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Criar sua conta
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Comece a organizar seus links em um só lugar
          </p>
        </div>

        {/* Formulário */}
        <form action="" className="space-y-6" onSubmit={handleSubmit}>
          {/* Campo de Email */}
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
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Campo de senha */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-200"
            >
              Senha (mín. 6 caracteres)
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              className="mt-1 block w-full rounded-md border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 sm:text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Campo de Confirmar Senha */}
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-200"
            >
              Confirmar senha
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 block w-full rounded-md border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 sm:text-sm"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/*Exibição de Erro */}
          {error && (
            <div className="rounded-md border border-red-800 bg-red-950 p-3 text-center text-sm text-red-300">
              <p>{error}</p>
            </div>
          )}

          {/* Exibição de Sucesso */}
          {success && (
            <div className="rounded-md border border-green-800 bg-green-950 p-3 text-center text-sm text-green-300">
              <p>{success}</p>
            </div>
          )}

          {/* Botão de Criar Conta */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-800"
            >
              Criar conta
            </button>
          </div>
        </form>
        {/* Link para Login */}
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Já tem uma conta?{' '}
          <Link
            href="/sign-in"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  )
}
