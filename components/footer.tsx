// components/footer.tsx
import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-12 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          <a
            href="https://github.com/JoaoMendes1" // Seu GitHub
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300"
          >
            <span className="sr-only">GitHub</span>
            {/* CORREÇÃO AQUI: className em vez de classId */}
            <FaGithub className="h-6 w-6" size={24} />
          </a>
          <a
            href="https://www.linkedin.com/" // Seu LinkedIn
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300"
          >
            <span className="sr-only">LinkedIn</span>
            {/* CORREÇÃO AQUI: className em vez de classId */}
            <FaLinkedin className="h-6 w-6" size={24} />
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} LinkHub SaaS. Feito com 💜 por João Mendes.
          </p>
        </div>
      </div>
    </footer>
  )
}