// app/admin/profile/page.tsx

// Esta página será um "Client Component" para usarmos formulários 
'use client'

import { useState } from 'react'

export default function ProfileAdminPage() {
    // (Vamos adicionar os 'useStates' para os campos aqui)
    const [slug, setSlug] = useState('')
    const [title, setTitle] = useState('')
    const [bio, setBio] = useState('')

    // (Função de 'submit' implementar na próxima issue)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //TODO: Chamar a API (Issue futura)
        console.log({ slug, title, bio })
    }

    return (
        <div className="flex min-h-screen justify-center bg-zinc-900 p-8 text-zinc-50">
            <div className="w-full max-w-2xl space-y-8">
                {/* Cabeçalho */}
                <div className="text-left">
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
                        Configurações do Perfil
                    </h1>
                    <p className="mt-2 text-sm text-zinc-400">
                        Atualize sua página pública e seus links
                    </p>
                </div>

                {/* Formulário de perfil */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="rounded-lg bg-zinc-800 p-6 shadow-lg">
                        <h2 className="text-xl font-semibold text-zinc-50">
                            Seu perfil
                        </h2>
                        <p className="mt-1 text-sm text-zinc-400">
                            Estas informações serão exibidas publicamente.
                        </p>

                        {/* Campo do Slug (URL) */}
                        <div className="mt-6">
                            <label htmlFor="slug"
                                className="block text-sm font-medium text-zinc-200"
                            >
                                URL (slug)
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center rounded-l-md border border-r-0 border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-400">
                                    linkhub.dev/
                                </span>
                                <input
                                    id="slug"
                                    name="slug"
                                    type="text"
                                    required
                                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-50 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="seu-nome-publico"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                />

                            </div>
                        </div>
                        {/* Campo do Título */}
                        <div className="mt-4">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-zinc-200"
                            >
                                Título da Página
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                className="mt-1 block w-full rounded-md border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-50 placeholder-zinc-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Ex: João Mendes, Dev"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        {/* Campo da Bio */}
                        <div className="mt-4">
                            <label
                                htmlFor="bio"
                                className="block text-sm font-medium text-zinc-200"
                            >
                                Bio (Descrição Curta)
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                rows={3}
                                className="mt-1 block w-full rounded-md border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-50 placeholder-zinc-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Desenvolvedor focado em..."
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Botão Salvar */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}