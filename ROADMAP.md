# 🛣️ LinkHub SaaS - Roadmap

Este documento descreve a visão de alto nível e as fases de desenvolvimento do LinkHub. Para um acompanhamento detalhado das tarefas, consulte nosso [GitHub Project Board]. (Lembre-se de adicionar o link do seu board aqui)

---

## 🎯 Fase 1: MVP (Minimum Viable Product)

O objetivo desta fase é lançar o *core* do produto: um fluxo de autenticação funcional e um dashboard para gerenciar uma página pública.

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
* [ ] **A FAZER:** Conectar UI de Login à API.
* [ ] **A FAZER:** Implementar sistema de Sessão (ex: JWT/Cookies) para manter o usuário logado.
* [ ] **A FAZER:** Implementar fluxo de "Esqueci minha senha" (API de token e envio de e-mail).
* [ ] **A FAZER:** Proteger rotas de admin (`/admin/*`).
* [ ] **A FAZER:** Criar o *Header* dinâmico (Mostrar "Login" vs "Dashboard").

### 1.3: Dashboard de Admin (Admin Dashboard)
* [x] Criar a UI da página de Perfil (`/admin/profile`).
* [x] Criar a UI da página de Links (`/admin/links`).
* [ ] **A FAZER:** Criar API para criar/atualizar o Perfil.
* [ ] **A FAZER:** Criar API para gerenciar Links (CRUD completo).
* [ ] **A FAZER:** Conectar a UI do Dashboard às APIs.

### 1.4: Página Pública (Public Profile Page)
* [x] Criar a rota dinâmica `/[slug]` (com dados *fake*).
* [ ] **A FAZER:** Criar API pública para buscar Perfil e Links.
* [ ] **A FAZER:** Conectar a página `/[slug]` à API (dados reais).

### 1.5: Home Page (Landing Page)
* [ ] **A FAZER:** Criar a página de "vitrine" do projeto (com Header e Footer).

---

## 💳 Fase 2: SaaS (Billing & Pro Features)

O objetivo desta fase é transformar o projeto em um SaaS real com integração de pagamentos e *features* premium.

### 2.1: Integração com Stripe (Stripe Integration)
* [ ] Configurar Webhooks do Stripe.
* [ ] Criar a página de "Planos & Preços".
* [ ] Implementar o fluxo de checkout e gerenciamento de assinatura.

### 2.2: Features PRO (Pro Features)
* [ ] **Analytics:** Implementar a lógica de contagem de cliques nos links.
* [ ] **Dashboard de Analytics:** Criar a UI para exibir os cliques.
* [ ] **Temas Premium:** Permitir custom