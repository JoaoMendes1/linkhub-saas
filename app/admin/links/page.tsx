// app/admin/links/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaGripVertical, FaPlus } from 'react-icons/fa'

// Definimos o tipo do Link para o TypeScript não reclamar
type LinkData = {
  id: string
  title: string
  url: string
  order: number
}

export default function LinksAdminPage() {
  const [links, setLinks] = useState<LinkData[]>([]) // Começa vazio
  const [isLoading, setIsLoading] = useState(true)
  
  // States do formulário
  const [newLinkTitle, setNewLinkTitle] = useState('')
  const [newLinkUrl, setNewLinkUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 1. Buscar links ao carregar a página (GET)
  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    try {
      const res = await fetch('/api/links')
      if (res.ok) {
        const data = await res.json()
        // A API retorna { links: [...] } ou [] direto, dependendo da implementação. 
        // Vamos garantir que seja um array.
        setLinks(Array.isArray(data) ? data : data.links || [])
      }
    } catch (error) {
      console.error('Erro ao buscar links:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 2. Criar novo link (POST)
  const handleAddNewLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newLinkTitle, url: newLinkUrl }),
      })

      if (res.ok) {
        // Limpa o formulário e recarrega a lista
        setNewLinkTitle('')
        setNewLinkUrl('')
        fetchLinks() 
      } else {
        alert('Erro ao criar link')
      }
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // 3. Deletar link (DELETE)
  const handleDeleteLink = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este link?')) return

    try {
      const res = await fetch(`/api/links/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        // Remove o link da lista localmente (mais rápido que buscar tudo de novo)
        setLinks((prev) => prev.filter((link) => link.id !== id))
      } else {
        alert('Erro ao deletar link')
      }
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-zinc-900">
        <p className="text-zinc-500">Carregando links...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen justify-center p-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* Cabeçalho */}
        <div className="text-left">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Gerenciar Links
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Adicione, edite e reordene os links da sua página.
          </p>
        </div>

        {/* Formulário de Adicionar */}
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Adicionar Novo Link
          </h2>
          <form onSubmit={handleAddNewLink} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                Título
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-500 focus:border-indigo-500 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 sm:text-sm"
                placeholder="Meu Portfólio"
                value={newLinkTitle}
                onChange={(e) => setNewLinkTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                URL
              </label>
              <input
                type="url"
                required
                className="mt-1 block w-full rounded-md border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-500 focus:border-indigo-500 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 sm:text-sm"
                placeholder="https://..."
                value={newLinkUrl}
                onChange={(e) => setNewLinkUrl(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-zinc-800"
              >
                <FaPlus />
                {isSubmitting ? 'Adicionando...' : 'Adicionar Link'}
              </button>
            </div>
          </form>
        </div>

        {/* Lista de Links */}
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Seus Links
          </h2>
          
          {links.length === 0 ? (
            <p className="mt-4 text-center text-sm text-zinc-500">
              Você ainda não tem links. Adicione o primeiro acima!
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between rounded-lg bg-zinc-50 p-4 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-700"
                >
                  <FaGripVertical className="text-zinc-400 cursor-move hover:text-zinc-600" />
                  
                  <div className="ml-4 flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">
                      {link.title}
                    </p>
                    <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                      {link.url}
                    </p>
                  </div>

                  <div className="flex gap-2 ml-2">
                    {/* Botão Editar (Futuro) */}
                    <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
                      <FaEdit />
                    </button>
                    {/* Botão Excluir */}
                    <button 
                      onClick={() => handleDeleteLink(link.id)}
                      className="flex items-center gap-1 text-sm text-red-600 hover:text-red-500 dark:text-red-400"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}