import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900 text-zinc-50">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-zinc-800 p-8 shadow-lg">
        {/* Cabeçalho */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
            Acessar sua conta
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Bem-vindo de volta! Insira seus dados.
          </p>
        </div>

        {/* Formulário */}
        <form className="space-y-6">
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
              className="mt-1 block w-full rounded-md border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-50 placeholder-zinc-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="seuemail@exemplo.com"
            />
          </div>

          {/* Campo de Senha */}
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
              autoComplete="current-password"
              required
              className="mt-1 block w-full rounded-md border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-50 placeholder-zinc-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          {/* Botão de Entrar */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
            >
              Entrar
            </button>
          </div>
        </form>

        {/* Link para Cadastro */}
        <p className="text-center text-sm text-zinc-400">
          Não tem uma conta?{' '}
          <Link
            href="/sign-up"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  )
}