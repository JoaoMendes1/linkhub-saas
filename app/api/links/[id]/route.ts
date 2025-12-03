// app/api/links/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod' // Importamos o Zod para validar a edição
import { prisma } from '@/lib/prisma'
import { decrypt, sessionOptions } from '@/lib/session'

// Schema para validar a atualização (título, url ou ordem)
const updateLinkSchema = z.object({
  title: z.string().min(1).optional(),
  url: z.string().regex(/^(http|https):\/\/[^ "]+$/).optional(),
  order: z.number().int().optional(),
})

async function getSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(sessionOptions.name)?.value
  return await decrypt(sessionCookie)
}

// --- DELETE: Remover Link ---
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Next.js 15+ requer Promise nos params
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Em versões recentes do Next.js, params é uma Promise, então precisamos do await
  const { id: linkId } = await params

  // 1. Verificar se o link existe e pertence ao usuário
  const link = await prisma.link.findUnique({
    where: { id: linkId },
    include: { profile: true },
  })

  if (!link) {
    return NextResponse.json({ error: 'Link não encontrado' }, { status: 404 })
  }

  if (link.profile.userId !== session.userId) {
    return NextResponse.json({ error: 'Proibido' }, { status: 403 })
  }

  // 2. Deletar
  await prisma.link.delete({
    where: { id: linkId },
  })

  return NextResponse.json({ success: true })
}

// --- PUT: Atualizar Link ---
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id: linkId } = await params

  try {
    const body = await request.json()
    const data = updateLinkSchema.parse(body)

    // 1. Verificar propriedade
    const link = await prisma.link.findUnique({
      where: { id: linkId },
      include: { profile: true },
    })

    if (!link || link.profile.userId !== session.userId) {
      return NextResponse.json({ error: 'Link não encontrado ou proibido' }, { status: 404 })
    }

    // 2. Atualizar
    const updatedLink = await prisma.link.update({
      where: { id: linkId },
      data: data,
    })

    return NextResponse.json(updatedLink)
  } catch (error) {
    if (error instanceof z.ZodError) {
        // Usando .issues como você corrigiu anteriormente
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}