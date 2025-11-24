import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/session";

export async function POST() {
  // 1. Apaga o cookie da sessão 
  (await cookies()).delete(sessionOptions.name)

  // 2. Retorna sucesso 
  return NextResponse.json({message: 'Logout realizado com sucesso!'})
}