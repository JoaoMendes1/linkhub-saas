# 🛣️ LinkHub SaaS - Roadmap

Este documento descreve a visão de alto nível e as fases de desenvolvimento do LinkHub. Para um acompanhamento detalhado das tarefas, consulte nosso [GitHub Project Board](https://github.com/users/JoaoMendes1/projects/5).

---

## 🎯 Fase 1: MVP (Minimum Viable Product)

O objetivo desta fase é lançar o _core_ do produto: autenticação, uma página de perfil pública funcional e a capacidade de gerenciar links.

### 1.1: Fundação & Setup (Project Foundation)

- [ ] Configurar projeto Next.js, TypeScript, Tailwind, Neon e Prisma.
- [ ] Definir padrões de código (ESLint, Prettier, Husky).
- [ ] Estruturar o banco de dados V1 (`User`, `Profile`, `Link`).

### 1.2: Autenticação (Authentication)

- [ ] Permitir cadastro e login com E-mail/Senha.
- [ ] Criar rotas de API protegidas e gerenciamento de sessão.

### 1.3: Dashboard de Admin (Admin Dashboard)

- [ ] Criar a UI do dashboard para usuários logados (com suporte a Dark Mode).
- [ ] Permitir que o usuário edite seu perfil (slug, bio, título).
- [ ] UI para Adicionar, Editar, Remover e Reordenar links.

### 1.4: Página Pública (Public Profile Page)

- [ ] Criar a rota dinâmica `/[slug]` para exibir perfis.
- [ ] Renderizar os links do perfil com o tema selecionado.

---

## 💳 Fase 2: SaaS (Billing & Pro Features)

O objetivo desta fase é transformar o projeto em um SaaS real com integração de pagamentos e _features_ premium.

### 2.1: Integração com Stripe (Stripe Integration)

- [ ] Configurar Webhooks do Stripe.
- [ ] Criar a página de "Planos & Preços".
- [ ] Implementar o fluxo de checkout e gerenciamento de assinatura.

### 2.2: Features PRO (Pro Features)

- [ ] **Analytics:** Implementar a lógica de contagem de cliques nos links.
- [ ] **Dashboard de Analytics:** Criar a UI para exibir os cliques.
- [ ] **Temas Premium:** Permitir customização avançada de temas.
- [ ] **Remoção de Marca:** Ocultar o selo "Powered by LinkHub".

---

## 🚀 Fase 3: Crescimento (Growth Features)

Recursos futuros para tornar o produto mais competitivo.

- [ ] **Domínios Customizados:** Permitir que usuários PRO conectem seus próprios domínios.
- [ ] **Internacionalização (i18n):** Traduzir a plataforma (UI, e-mails) para múltiplos idiomas (ex: EN, PT-BR).
- [ ] **Integrações:** Enviar dados de analytics para Google Analytics, etc.
- [ ] **Login Social:** Adicionar OAuth (Google, GitHub).
- [ ] **Equipes:** Permitir que múltiplos usuários gerenciem um único perfil (plano "Business").
