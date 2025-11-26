import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod' // Nossa biblioteca de validação
import { prisma } from '@/lib/prisma'
import { decrypt, sessionOptions } from '@/lib/session'

// 1. Schema de validação (regras de roteiro)
const profileSchema = z.object({
  slug: z
    .string()
    .min(3, 'Slug deve ter pelo menos 3 caracteres.')
    .max(30, 'Slug deve ter no máximo 30 caracteres')
    .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  title: z.string().max(50, 'Título muito longo.').optional().or(z.literal('')),
  bio: z.string().max(500, 'Bio muito longa.').optional().or(z.literal(''),)
})

//Helper: Verificar Sessão 
async function getSession() {
  const cookieStore = await cookies() // Next;js 15 requer awat aqui 
  const sessionCookie = cookieStore.get(sessionOptions.name)?.value
  const payload = await decrypt(sessionCookie)
  return payload 
}

// --- GET: Buscar Perfil --- 
export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Não  autorizado'}, { status:401 })
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.userId},
  })

  //  Se não houver perfil, retorna objeto vazio (Não é erro, é só "Novo")
  return NextResponse.json(profile || {})
}

// --- PUT: Salvar/Atualizar Perfil ---
export async function PUT(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const body = await request.json()

    //1. Validação dos dados (zod)
    const result = profileSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Dados Inválidos', details: result.error },
        { status: 400 }
      )
    }

    const { slug, title, bio } = result.data

    //2. Verificar se o Slug já existe (se foi alterado)
    const existingProfile = await prisma.profile.findUnique({
      where: { slug: slug},
    })

    // Se existe um perfil com esse slug e não é o meu perfil = Conflito
    if (existingProfile && existingProfile.userId !== session.userId) {
      return NextResponse.json(
        { error: 'Este URL já está em uso. Escolha outro.' },
        { status: 409 }
      )
    }

  // 3. Salvar no Banco (Upsert> Atualiza se existe, Cria se não existe)
  const updateProfile = await prisma.profile.upsert({
    where: { userId: session.userId },
    update: { slug, title, bio },
    create: {
      userId: session.userId,
      slug,
      title,
      bio,
    },
  })

  return NextResponse.json(updateProfile)
  } catch (error) {
    console.log('Erro ao salvar perfil:', error)
    return NextResponse.json({ eeror: 'Erro interno'}, { status: 500 })
  }
}