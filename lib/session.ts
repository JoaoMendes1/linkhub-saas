// lib/session.ts 
import 'server-only' // Garante que este código só rode no servidor (Segurança)
import { SignJWT, jwtVerify } from 'jose'
import { z } from 'zod' // Para validar a variável dee ambiente 

// 1. Definir o schema da nossa variável de ambiente 
const secretSchema = z.object({
  JWT_SECRET: z.string().min(32, 'JWT_SECRET deve ter no mínimo 32 caracteres'),
})

// 2. Validar e obter o segredo 
const result = secretSchema.safeParse(process.env)
if(!result.success) {
  console.error('Variável JWT_SECRET inválida', result.error)
  throw new Error('Variável de ambiente JWT_SECRET mal configurada.')
}

const { JWT_SECRET } = result.data
const secretKey = new TextEncoder().encode(JWT_SECRET)

// 3. Função para CRIPTOGRAFAR e criar a sessão (token)
export async function encrypt(payload: { userId: string; email: string}) {
  return new SignJWT(payload)
  .setProtectedHeader({ alg: 'HS256'})
  .setIssuedAt()
  .setExpirationTime('1d') // Expira em um dia 
  .sign(secretKey)
}

// 4. Função para Descriptografar e ler a sessão 
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, secretKey, {
      algorithms: ['HS256'],
    })
    return payload as { userId: string; email: string; iat: number; exp: number }
  } catch (error) {
    return null
  }
}

// 5. Definir as opções de cookies 
export const sessionOptions = {
  name: 'session', 
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', 
  maxAge: 60 * 60 * 24 * 1, // 1 dia 
  path: '/'
}
