/* O objetivo deste arquivo: Receber um email e senha do formulário, verificar se são válidos, e criar um novo usuário no banco.*/

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt' // Criptografar a senha
import { prisma } from '@/lib/prisma' // Client do Prisma 

// Função para a rota POST (Cadastro)
export async function POST(request: NextRequest) {
  try {
    // 1. Recebe e valida o corpo da requisição 
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios.'}, 
        { status: 400}, // 400 = Bad request
      )
    }

    if (password.length < 6 ) {
      return NextResponse.json(
        { error: 'Senha deve ter no mínimo 6 caracteres.' }, 
        { status: 400 }, 
      )
    }

    // 2. Verifica se o usuário (email) já existe no banco
    const existingUser = await prisma.user.findUnique({
      where: {email: email}, 
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Este e-mail já está em uso.' }, 
        { status: 409 }, // 409 - Conflict
      )
    }

    // 3. Criptografa a senha (NUNCA salvar senhas em texto puro)
    // O '10' é o "salt round", um bom padrão de segurança. 
    const hashedPassword = await bcrypt.hash(password, 10)

    // 4. Cria o novo usuário no banco de dados
    const newUser = await prisma.user.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
        // O Prisma preenche automaticamente os campos default: id, plan, createdAt, etc.
      },
    })

    // 5. Retorna uma resposta de sucesso 
    return NextResponse.json(
      {
        meessage: 'Usuário criado com sucesso!', 
        userId: newUser.id,
        email: newUser.email,
      },
      { status: 201 }, //201 = Created
    )
  } catch (error) {
    console.log('Erro no cadastro:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }, 
    )
  }
}