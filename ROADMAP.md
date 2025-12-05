# 🛣️ LinkHub SaaS - Roadmap

Este documento descreve a visão de alto nível e as fases de desenvolvimento do LinkHub.

---

## 🎯 Fase 1: MVP (Minimum Viable Product) - ✅ CONCLUÍDO

O objetivo desta fase foi lançar o *core* do produto: autenticação, dashboard e página pública.

### 1.1: Fundação & Setup (Project Foundation)
* [x] Configurar projeto Next.js, TypeScript, Tailwind, Neon e Prisma.
* [x] Definir padrões de código (ESLint, Prettier, Husky).
* [x] Estruturar o banco de dados V1 (`User`, `Profile`, `Link`).
* [x] Implementar Tema Claro/Escuro (Dark Mode).

### 1.2: Autenticação (Authentication)
* [x] Criar UI da página de Cadastro (`/sign-up`).
* [x] Criar API de Cadastro (`/api/auth/sign-up`).
* [x] Conectar UI de Cadastro à API.
* [x] Criar UI da página de Login (`/sign-in`).
* [x] Criar API de Login (`/api/auth/sign-in`).
* [x] Conectar UI de Login à API.
* [x] Implementar sistema de Sessão (JWT/Cookies) para manter o usuário logado.
* [x] Proteger rotas de admin (`/admin/*`) via Middleware.

### 1.3: Dashboard de Admin (Admin Dashboard)
* [x] Criar a UI da página de Perfil (`/admin/profile`).
* [x] Criar a UI da página de Links (`/admin/links`).
* [x] Criar API para criar/atualizar o Perfil.
* [x] Criar API para gerenciar Links (CRUD completo: Criar, Ler, Deletar).
* [x] Conectar a UI do Dashboard às APIs.

### 1.4: Página Pública (Public Profile Page)
* [x] Criar a rota dinâmica `/[slug]`.
* [x] Criar API pública para buscar Perfil e Links reais no banco.
* [x] Conectar a página `/[slug]` à API.

### 1.5: Home Page (Landing Page)
* [x] Criar a página de "vitrine" do projeto (Landing Page).
* [x] Implementar Header e Footer globais.
* [x] Deploy em Produção (Vercel).

---

## 💳 Fase 2: SaaS (Billing & Pro Features) - 🚧 PRÓXIMO PASSO

O objetivo desta fase é transformar o projeto em um SaaS real com integração de pagamentos e *features* premium.

### 2.1: Integração com Stripe (Stripe Integration)
* [ ] Configurar Webhooks do Stripe.
* [ ] Criar a página de "Planos & Preços".
* [ ] Implementar o fluxo de checkout e gerenciamento de assinatura.

### 2.2: Features PRO (Pro Features)
* [ ] **Analytics:** Implementar a lógica de contagem de cliques nos links.
* [ ] **Dashboard de Analytics:** Criar a UI para exibir os cliques.
* [ ] **Temas Premium:** Permitir customização de cores e fundos.

---

## 📊 Fase 3: Melhorias & Extras (Backlog)

* [ ] **Recuperação de Conta:** Implementar fluxo de "Esqueci minha senha" (envio de e-mail).
* [ ] **Drag-and-drop:** Melhorar a UX para reordenar links arrastando.
* [ ] **QR Code:** Gerar QR Code automático para o perfil.
* [ ] **Social Login:** Adicionar Login com Google/GitHub.