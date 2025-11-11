// app/[slug]/page.tsx
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa'

// --- DADOS FAKE (Mock Data) ---
// (Vamos fingir que buscamos isso no banco de dados)
const fakeProfile = {
    title: 'João Mendes | Desenvolvedor Full Stack',
    bio: 'Apaixonado por criar soluções com TypeScript, React, Next.js e Node.js. Vamos construir algo incrível!',
    avatarUrl: 'https://github.com/joaomendes1.png', // (Use seu avatar do GitHub!)
}

const fakeLinks = [
    {
        id: '1',
        title: 'Meu GitHub',
        url: 'https://github.com/JoaoMendes1',
        icon: <FaGithub size={20} />, // Ícone correspondente
    },
    {
        id: '2',
        title: 'Meu LinkedIn',
        url: 'https://www.linkedin.com/',
        icon: <FaLinkedin size={20} />,
    },
    {
        id: '3',
        title: 'Meu Canal no YouTube',
        url: 'https://www.youtube.com/',
        icon: <FaYoutube size={20} />,
    },
]

// --- Fim dos Dados Fake ---

// Esta é uma "Página de Servidor" (Server Component) por padrão,
// o que é ótimo para performance e SEO.
// Os 'params' vêm do Next.js e contêm o valor da URL (o 'slug').

export default function PublicProfilePage({
    params,
}: {
    params: { slug: string }
}) {
    // (No futuro, usaríamos o 'params.slug' para buscar dados reais no banco)
    // const userProfile = await prisma.profile.findUnique({ where: { slug: params.slug } })

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-900 text-zinc-50 ">
            <div className="mx-auto w-full max-w-lg p-8">
                {/* Cabeçalho do Perfil (Avatar, Título, Bio) */}
                <header className="flex flex-col items-center text-center">
                    <img
                        src={fakeProfile.avatarUrl}
                        alt="Avatar do Perfil"
                        className="h-24 w-24 rounded-full border-2 border-indigo-500 object-cover shadow-lg"
                    />
                </header>

                {/* Lista de Links */}
                <main className="mt-8 space-y-4">
                    {fakeLinks.map((link) => (
                        <a
                            key={link.id}
                            href="link.url"
                            target="_blank" //Abre em nova aba
                            rel="noopener noreferrer" // Boa prática de segurança
                            className="flex w-full items-center gap-4 rounded-lg bg-zinc-800 p-4 text-zinc-50 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:bg-zinc-700"
                        >
                            {/* Ícone */}
                            <div className="flex-shrink-0 text-indigo-400">{link.icon}</div>
                            {/* Título */}
                            <div className="flex-grow tect-center">
                                <p className="font-medium">{link.title}</p>
                            </div>
                        </a>
                    ))}
                </main>

                {/* Rodapé */}
                <footer className="mt-8 text-center text-sm text-zinc-500">
                    Feito com 💜 por LinkHub
                </footer>
            </div>
        </div>
    )
}
