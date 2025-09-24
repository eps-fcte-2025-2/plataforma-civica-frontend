# Arquitetura do Projeto - Plataforma Cívica Frontend

## Visão Geral

Este projeto utiliza uma **arquitetura híbrida** que combina organização baseada em features com Atomic Design simplificado. Esta abordagem promove:

- **Escalabilidade**: Estrutura que cresce naturalmente com o projeto
- **Manutenibilidade**: Código organizado e fácil de localizar
- **Reutilização**: Componentes modulares e reutilizáveis
- **Separação de responsabilidades**: Cada pasta tem um propósito claro

## Tecnologias Base

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Cypress** (E2E Testing)

## Estrutura de Pastas

```
src/
├── app/                    # Next.js App Router - Rotas e layouts
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout raiz da aplicação
│   ├── page.tsx           # Página inicial
│   ├── (auth)/           # Route groups para autenticação
│   ├── dashboard/        # Páginas do dashboard
│   └── ...               # Outras rotas
│
├── components/            # Componentes reutilizáveis (Atomic Design)
│   ├── ui/               # Componentes básicos (átomos)
│   │   ├── Button/       # Componente Button
│   │   ├── Input/        # Componente Input
│   │   ├── Card/         # Componente Card
│   │   └── index.ts      # Barrel exports
│   │
│   ├── forms/            # Componentes de formulários (moléculas)
│   │   ├── LoginForm/    # Formulário de login
│   │   ├── ContactForm/  # Formulário de contato
│   │   └── index.ts      # Barrel exports
│   │
│   ├── layout/           # Componentes de layout (organismos)
│   │   ├── Header/       # Cabeçalho da aplicação
│   │   ├── Footer/       # Rodapé da aplicação
│   │   ├── Sidebar/      # Barra lateral
│   │   └── index.ts      # Barrel exports
│   │
│   └── features/         # Componentes específicos por feature
│       ├── dashboard/    # Componentes do dashboard
│       ├── auth/         # Componentes de autenticação
│       └── civic/        # Componentes cívicos específicos
│
├── lib/                  # Utilitários e configurações
│   ├── utils.ts         # Funções utilitárias gerais
│   ├── constants.ts     # Constantes da aplicação
│   ├── validations.ts   # Schemas de validação
│   ├── api.ts           # Configuração de API
│   └── auth.ts          # Configuração de autenticação
│
├── hooks/               # Custom React hooks
│   ├── useAuth.ts       # Hook de autenticação
│   ├── useLocalStorage.ts # Hook para localStorage
│   ├── useFetch.ts      # Hook para requisições
│   └── index.ts         # Barrel exports
│
├── services/            # Serviços e integrações externas
│   ├── api/             # Serviços de API
│   │   ├── auth.ts      # Serviços de autenticação
│   │   ├── users.ts     # Serviços de usuários
│   │   └── civic.ts     # Serviços cívicos
│   │
│   ├── storage/         # Serviços de armazenamento
│   │   ├── localStorage.ts
│   │   └── sessionStorage.ts
│   │
│   └── external/        # Integrações externas
│       ├── maps.ts      # Integração com mapas
│       └── notifications.ts # Serviço de notificações
│
├── types/               # Definições de tipos TypeScript
│   ├── auth.ts          # Tipos de autenticação
│   ├── user.ts          # Tipos de usuário
│   ├── civic.ts         # Tipos cívicos
│   ├── api.ts           # Tipos de API
│   └── index.ts         # Barrel exports centralizados
│
├── contexts/            # React Contexts
│   ├── AuthContext.tsx  # Context de autenticação
│   ├── ThemeContext.tsx # Context de tema
│   └── index.ts         # Barrel exports
│
└── styles/              # Estilos adicionais
    ├── components.css   # Estilos de componentes
    └── utilities.css    # Utilitários CSS customizados
```

## Responsabilidades das Pastas

### 📱 `/app`

**Propósito**: Roteamento e layouts do Next.js App Router

- Páginas da aplicação usando file-based routing
- Layouts compartilhados
- Route groups para organização
- Middleware e configurações de rota

### 🧩 `/components`

**Propósito**: Componentes React reutilizáveis organizados por complexidade

#### `/components/ui` (Átomos)

- Componentes básicos e primitivos
- Botões, inputs, cards, badges, etc.
- Totalmente reutilizáveis e sem lógica de negócio

#### `/components/forms` (Moléculas)

- Combinações de componentes UI
- Formulários específicos
- Componentes compostos com lógica simples

#### `/components/layout` (Organismos)

- Componentes de estrutura da página
- Header, Footer, Sidebar
- Layouts complexos e navegação

#### `/components/features` (Templates)

- Componentes específicos por funcionalidade
- Organizados por domínio de negócio
- Podem usar componentes de todas as outras camadas

### 📚 `/lib`

**Propósito**: Utilitários, configurações e helpers

- Funções puras e utilitárias
- Configurações da aplicação
- Schemas de validação
- Configurações de bibliotecas externas

### 🪝 `/hooks`

**Propósito**: Custom React hooks reutilizáveis

- Lógica de estado reutilizável
- Abstrações de funcionalidades comuns
- Hooks personalizados para o domínio da aplicação

### 🔌 `/services`

**Propósito**: Integrações e serviços externos

- Chamadas de API
- Integrações com serviços externos
- Camada de abstração para dados externos
- Funções de negócio que não dependem do React

### 📝 `/types`

**Propósito**: Definições de tipos TypeScript

- Interfaces e tipos da aplicação
- Tipos de API e dados
- Enums e constantes tipadas
- Organização por domínio

### 🌐 `/contexts`

**Propósito**: React Contexts para estado global

- Estados compartilhados da aplicação
- Provedores de contexto
- Gerenciamento de estado global leve

### 🎨 `/styles`

**Propósito**: Estilos CSS adicionais

- Estilos de componentes específicos
- Utilitários CSS customizados
- Extensões do Tailwind CSS

## Convenções de Nomenclatura

### Arquivos e Pastas

- **Componentes**: PascalCase (`Button.tsx`, `UserProfile.tsx`)
- **Hooks**: camelCase iniciando com 'use' (`useAuth.ts`, `useFetch.ts`)
- **Utilitários**: camelCase (`utils.ts`, `apiClient.ts`)
- **Tipos**: camelCase para arquivos, PascalCase para interfaces (`auth.ts` → `interface User`)
- **Pastas**: camelCase (`userProfile/`, `authForms/`)

### Componentes

```tsx
// Estrutura padrão de componente
export interface ComponentProps {
  // Props tipadas
}

export default function Component({ prop }: ComponentProps) {
  // Implementação
}

// Exports nomeados para subcomponentes se necessário
export { SubComponent };
```

## Padrões de Import/Export

### Barrel Exports

Cada pasta principal deve ter um `index.ts` para facilitar imports:

```typescript
// components/ui/index.ts
export { default as Button } from "./Button";
export { default as Input } from "./Input";
export { default as Card } from "./Card";

// Uso
import { Button, Input, Card } from "@/components/ui";
```

### Path Mapping

Configure no `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/services/*": ["./src/services/*"],
      "@/types/*": ["./src/types/*"]
    }
  }
}
```

## Fluxo de Desenvolvimento

### Criando uma Nova Feature

1. **Página**: Criar rota em `/app`
2. **Componentes**: Criar componentes em `/components/features/[feature]`
3. **Tipos**: Definir tipos em `/types/[feature].ts`
4. **Serviços**: Implementar em `/services/api/[feature].ts`
5. **Hooks**: Custom hooks em `/hooks/use[Feature].ts`

## Boas Práticas

### Componentes

- **Um componente por arquivo**
- **Props interface sempre tipada**
- **Default export para componente principal**
- **Named exports para subcomponentes**

### Imports

- **Imports absolutos usando path mapping**
- **Ordem**: externos, internos, relativos
- **Barrel exports para melhor organização**
