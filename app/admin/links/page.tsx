'use client'

import React, { useState } from 'react'
import { FaEdit, FaTrash, FaGripVertical } from 'react-icons/fa'

export default function LinksAdminPage() {
    const [newLinkTitle, setNewLinkTitle] = useState('')
    const [newLinkUrl, setNewLinkUrl] = useState('')

    // Lista fake apenas para demonstração 
    const fakeLinks = [
        {
            id: '1',
            title: 'Meu Portfólio',
            url: 'https://github.com/JoaoMendes1',
        },
        { id: '2', title: 'Meu LinkedIn', url: 'https://linkedin.com/...' },
    ]

    // Funbção submit Formulário
    const handleAddNewLink = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // TODO: Chamar a API (Issue Futura)
        console.log({ title: newLinkTitle, url: newLinkUrl })
        setNewLinkTitle('')
        setNewLinkUrl('')
    }

    return (
        <div className="flex min-h-screen justify-center bg-zinc-900 p-8 text-zinc-50">
            <div className="w-full max-w-2xl space-y-8">
                {/* Cabeçalho */}
                <div className="text-left">
                    <h1 className="text-3xl font bold tracking-tight text-zinc-50">
                        Gerenciar Links
                    </h1>
                    <p className="mt-2 text-sm text-zinc-400">
                        Adicione, edite e reordene os links da sua página.
                    </p>
                </div>

                {/* 1. Formulário para Adicionar Novo Link */}
                <div className="rounded-lg bg-zinc-800 p-6 shadow-lg">
                    <h2 className="text-xl font-semibold text-zinc-50">Adicionar Novo Link</h2>
                    <form onSubmit={handleAddNewLink} className="mt-4 space-y-4">
                        {/* Campo Título */}
                        <div>
                            <label
                                htmlFor=""
                                className="block text-sm font-medium text-zinc-200"
                            >
                                Título
                            </label>
                            <input
                                id="linkTitle"
                                type="text"
                                className="mt-1 block w-full rounded-md border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-50 placeholder-zinc-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Meu Portfólio"
                                value={newLinkTitle}
                                onChange={(e) => setNewLinkTitle(e.target.value)}
                                required
                            />
                        </div>
                        {/* Campo URL */}
                        <div>
                            <label
                                htmlFor=""
                                className="block text-sm font-medium text-zinc-200"
                            >
                                URL
                            </label>
                            <input
                                id="linkURL"
                                type="url"
                                className="mt-1 block w-full rounded-md border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-50 placeholder-zinc-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="https://..."
                                value={newLinkUrl}
                                onChange={(e) => setNewLinkUrl(e.target.value)}
                                required
                            />
                        </div>
                        {/* Botão Salvar */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
                            >
                                Adicionar Link
                            </button>
                        </div>
                    </form>
                </div>
                {/* 2. Lista de Links Existentes */}
                <div className="rounded-lg bg-zinc-800 p-6 shadow-lg">
                    <h2 className="text-xl font-semibold text-zinc-50">Seus Links</h2>
                    <div className="mt-4 space-y-4">
                        {/* Usamos a lista "fake" para renderizar os links */}
                        {fakeLinks.map((link) => (
                            <div
                                key={link.id}
                                className="flex items-center justify-between rounded-lg bg-zinc-900 p-4"
                            >
                                {/* (Ícone de "arrastar" - Stretch Goal) */}
                                { <FaGripVertical className="text-zinc-500 cursor-move" /> }
                                <div className="ml-4 flex-1">
                                    <p className="text-sm font-medium text-zinc-50">
                                        {link.title}
                                    </p>
                                    <p className="text-sm text-zinc-400">{link.url}</p>
                                </div>
                                {/* Botões de Ação */}
                                <div className="flex gap-2">
                                    <button className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">
                                        { <FaEdit /> }
                                        Editar
                                    </button>
                                    <button className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300">
                                        { <FaTrash/> }
                                        Excluir
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}