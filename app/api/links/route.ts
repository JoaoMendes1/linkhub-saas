import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { decrypt, sessionOptions } from '@/lib/session'

const linkSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório.' }),
  // Substituímos .url() por regex para evitar o aviso de deprecation e garantir o formato
  url: z.string().regex(/^(http|https):\/\/[^ "]+$/, { message: 'URL inválida. Deve começar com http:// ou https://' }),
})

async function getSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(sessionOptions.name)?.value
  return await decrypt(sessionCookie)
}

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized'}, { status: 401 })

  // Busca o profile primeiro
  const profile = await prisma.profile.findUnique({
    where: {userId: session.userId},
  })

  if (!profile) return NextResponse.json([])

    const links = await prisma.link.findMany({
      where: { profileId: profile.id }, 
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(links)
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { title, url } = linkSchema.parse(body)

    // Garante profile existente 
    let profile = await prisma.profile.findUnique({
      where: { userId: session.userId },
    })

    if (!profile) {
      profile = await prisma.profile.create({
        data: { userId: session.userId, slug: session.userId.slice(0, 8) },
      })
    }

    const newLink = await prisma.link.create({
      data: { title, url, profileId: profile.id },
    })

    return NextResponse.json(newLink, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    
  }
}
