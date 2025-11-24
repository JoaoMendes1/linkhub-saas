// app/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers' 
import { Header } from '@/components/header'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'LinkHub',
  description: 'Todos os seus links em um só lugar.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      {/* AQUI ESTÁ A CORREÇÃO FINAL */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased 
          bg-zinc-100 text-zinc-900 
          dark:bg-zinc-900 dark:text-zinc-50 
          transition-colors duration-300`}
      >
        <Providers>
          <Header /> {/* <-- 2. ADICIONADO AQUI */}
          {children}
        </Providers>
      </body>
    </html>
  )
}