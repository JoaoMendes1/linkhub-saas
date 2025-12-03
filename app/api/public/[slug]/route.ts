// app/api/public/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Esta rota é PÚBLICA (não verifica sessão)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const profile = await prisma.profile.findUnique({
      where: { slug: slug },
      include: {
        links: {
          orderBy: { order: 'asc' }, // Traz os links ordenados
        },
      },
    })

    if (!profile) {
      return NextResponse.json({ error: 'Perfil não encontrado' }, { status: 404 })
    }

    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}