import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900 p-8 shadow-lg">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-zinc-800 p-8 shadow-lg">
        {/* Cabeçalho */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
            Criar sua conta
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Comece a organizar seus links em um só lugar
          </p>
        </div>

        {/* Formulário */}
        <form action="" className="space-y-6">
          {/* Campo de Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-200"
            >
              Endereço de e-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full rounded-md border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-50 placeholder-zinc-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
              placeholder="Digite seu e-mail"
            />
          </div>

          {/* Campo de senha */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-200"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              className="mt-1 block w-full rounded-md border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-50 placeholder-zinc-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          {/* Campo de Confirmar Senha */}
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-zinc-200"
            >
              Confirmar senha
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 block w-full rounded-md border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-50 placeholder-zinc-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          {/* Botão de Criar Conta */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:outline-none"
            >
              Criar conta
            </button>
          </div>
        </form>
        {/* Link para Login */}
        <p className="text-center text-sm text-zinc-400">
          Já tem uma conta?{' '}
          <Link
            href="/sign-in"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  )
}
