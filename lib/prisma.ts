import { PrismaClient } from '@prisma/client'

//Declara uma variável global para "guardar" o client do Prisma
// Isso evita criar mútiplas conexões em ambiente de desenvolvimento (com o "hot reload")
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Criação client Prisma 

export const prisma = 
  globalForPrisma.prisma ?? 
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error' ] // loga todas as queries no terminal
  })

  // Se não estamos em produção, armazena a conexão global 

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma