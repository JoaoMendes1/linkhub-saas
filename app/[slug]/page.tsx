// app/[slug]/page.tsx
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { FaGithub, FaLinkedin, FaYoutube, FaLink, FaInstagram, FaTwitter } from 'react-icons/fa'

// Função auxiliar para escolher o ícone com base na URL (Melhoria visual)
function getLinkIcon(url: string) {
  if (url.includes('github')) return <FaGithub size={20} />
  if (url.includes('linkedin')) return <FaLinkedin size={20} />
  if (url.includes('youtube')) return <FaYoutube size={20} />
  if (url.includes('instagram')) return <FaInstagram size={20} />
  if (url.includes('twitter') || url.includes('x.com')) return <FaTwitter size={20} />
  return <FaLink size={20} />
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ slug: string }> // Next.js 15+ exige Promise
}) {
  const { slug } = await params

  // 1. Buscar dados reais no banco
  const profile = await prisma.profile.findUnique({
    where: { slug: slug },
    include: {
      links: {
        orderBy: { order: 'asc' },
      },
    },
  })

  // 2. Se não achar, mostra página 404 padrão do Next.js
  if (!profile) {
    notFound()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900 text-zinc-50">
      <div className="mx-auto w-full max-w-lg p-8">
        {/* Cabeçalho do Perfil */}
        <header className="flex flex-col items-center text-center">
          {profile.avatarUrl && (
            <img
              src={profile.avatarUrl}
              alt={profile.title || 'Avatar'}
              className="h-24 w-24 rounded-full border-2 border-indigo-500 object-cover shadow-lg mb-4"
            />
          )}
          
          <h1 className="text-2xl font-bold text-zinc-50">
            {profile.title || `@${profile.slug}`}
          </h1>
          
          {profile.bio && (
            <p className="mt-2 text-sm text-zinc-400">{profile.bio}</p>
          )}
        </header>

        {/* Lista de Links Reais */}
        <main className="mt-8 space-y-4">
          {profile.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              // 1. Adicionamos 'relative' e 'justify-center'
              className="relative flex w-full items-center justify-center rounded-lg bg-zinc-800 p-4 text-zinc-50 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:bg-zinc-700"
            >
              {/* 2. O ícone fica 'preso' na esquerda com 'absolute left-4' */}
              <div className="absolute left-4 flex items-center justify-center text-indigo-400">
                {getLinkIcon(link.url)}
              </div>

              {/* 3. O texto fica livre para ser centralizado pelo pai */}
              <p className="font-medium text-center">{link.title}</p>
            </a>
          ))}

          {profile.links.length === 0 && (
            <p className="text-center text-zinc-500 italic">
              Este perfil ainda não tem links públicos.
            </p>
          )}
        </main>

        <footer className="mt-8 text-center text-sm text-zinc-500">
          Feito com 💜 por LinkHub
        </footer>
      </div>
    </div>
  )
}