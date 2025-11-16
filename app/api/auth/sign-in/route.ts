// app/api/auth/sign-in/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt' // Para comparar a senha
import { prisma } from '@/lib/prisma' // Nosso client do Prisma

import { encrypt, sessionOptions } from '@/lib/session'

// Função para a rota POST (Login)
export async function POST(request: NextRequest) {
  try {
    // 1. Recebe e valida o corpo da requisição
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios.' },
        { status: 400 }, // 400 = Bad Request
      )
    }

    // 2. Busca o usuário no banco de dados pelo email
    const user = await prisma.user.findUnique({
      where: { email: email },
    })

    if (!user) {
      // Dica de segurança: Não diga "usuário não encontrado".
      // Diga uma mensagem genérica para evitar que hackers "adivinhem" emails.
      return NextResponse.json(
        { error: 'Credenciais inválidas.' },
        { status: 401 }, // 401 = Unauthorized
      )
    }

    // 3. Compara a senha enviada com a senha criptografada (hash) no banco
    // O 'user.hashedPassword' não pode ser nulo,
    // mas checamos por segurança se ele existir (user.hashedPassword || '')
    const isPasswordValid = await bcrypt.compare(
      password,
      user.hashedPassword || '',
    )

    if (!isPasswordValid) {
      // Dica de segurança: Mesma mensagem genérica.
      return NextResponse.json(
        { error: 'Credenciais inválidas.' },
        { status: 401 }, // 401 = Unauthorized
      )
    }

    // 4.Criar a sessão / JWT
    const payload = {
      userId: user.id,
      email: user.email,
    }

    // Criptografar o payload para geração do token 
    const session = await encrypt(payload)

    // 5. Criação da resposta de sucesso
    const response = NextResponse.json(
      {
        message: 'Login bem-sucedido!', 
      },
      { status: 200},
    )

    // 6. Salvar a sessão no cookie
    response.cookies.set(sessionOptions.name, session, sessionOptions)
    
    // 7 Retorna a resposta 
    return response
  
  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 },
    )
  }
}