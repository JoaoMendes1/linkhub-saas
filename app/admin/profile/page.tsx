// app/admin/profile/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function ProfileAdminPage() {
  // Estados dos campos
  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [bio, setBio] = useState('')

  // Estados de interface
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  // 1. Carregar dados ao abrir a página
  useEffect(() => {
    fetch('/api/profile')
      .then((res) => {
        if (res.status === 401) return null
        return res.json()
      })
      .then((data) => {
        if (data) {
          setSlug(data.slug || '')
          setTitle(data.title || '')
          setBio(data.bio || '')
        }
      })
      .finally(() => setIsLoading(false))
  }, [])

  // 2. Salvar dados ao enviar o formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, title, bio }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao salvar.')
      }

      setMessage({ text: 'Perfil atualizado com sucesso!', type: 'success' })
    } catch (error: any) {
      setMessage({ text: error.message, type: 'error' })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-zinc-900">
        <p className="text-zinc-500">Carregando perfil...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen justify-center p-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Configurações do Perfil
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Atualize sua página pública e seus links.
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Mensagem de Feedback */}
        {message && (
          <div
            className={`p-4 rounded-md text-sm ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Seu Perfil
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Estas informações serão exibidas publicamente.
            </p>

            {/* Campo do Slug (URL) */}
            <div className="mt-6">
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-200"
              >
                URL (Slug)
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-zinc-300 bg-zinc-200 px-3 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                  linkhub.dev/
                </span>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  required
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 sm:text-sm"
                  placeholder="seu-nome-publico"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
              
              {/* NOVO: Link clicável para a página pública */}
              {slug && (
                <p className="mt-2 text-sm text-zinc-500">
                  Seu link público:{" "}
                  <a
                    href={`/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline font-medium dark:text-indigo-400"
                  >
                    {`${typeof window !== 'undefined' ? window.location.origin : ''}/${slug}`}
                  </a>
                </p>
              )}
            </div>

            {/* Campo do Título */}
            <div className="mt-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-200"
              >
                Título da Página
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className="mt-1 block w-full rounded-md border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 sm:text-sm"
                placeholder="Ex: João Mendes, Dev"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Campo da Bio */}
            <div className="mt-4">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-200"
              >
                Bio (Descrição Curta)
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                className="mt-1 block w-full rounded-md border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 sm:text-sm"
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
              disabled={isSaving}
              className={`rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800 ${
                isSaving
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}