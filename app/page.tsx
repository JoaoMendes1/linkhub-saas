import Link from 'next/link'
import { Footer } from '@/components/footer'
import { FaLink, FaChartLine, FaPaintBrush } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      {/* (O Header já está no layout.tsx, então não precisamos dele aqui) */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl">
              Todos os seus links
              <span className="block text-indigo-600 dark:text-indigo-400">
                em um só lugar.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              Crie uma página de perfil bonita e personalizável para compartilhar
              todos os seus projetos, redes sociais e conteúdos com apenas um link.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/sign-up"
                className="rounded-full bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-indigo-700 transition-transform hover:scale-105"
              >
                Começar Grátis
              </Link>
              <Link
                href="/sign-in"
                className="rounded-full bg-white px-8 py-3 text-base font-semibold text-indigo-600 shadow-md border border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-indigo-400 dark:hover:bg-zinc-800 transition-transform hover:scale-105"
              >
                Fazer Login
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white mb-4">
                  <FaLink size={24} />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Links Ilimitados</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  Adicione quantos links quiser. Organize e gerencie tudo em um painel simples.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white mb-4">
                  <FaPaintBrush size={24} />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Personalizável</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  Seu perfil, sua cara. Escolha temas (claro/escuro) e mostre sua identidade.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white mb-4">
                  <FaChartLine size={24} />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Analytics</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  (Em breve) Acompanhe quantos cliques seus links estão recebendo em tempo real.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}