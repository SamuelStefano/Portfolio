# Portfolio Samuel Stefano

Portfólio pessoal moderno e responsivo desenvolvido com React, TypeScript e TailwindCSS, seguindo a metodologia Atomic Design.

## 🚀 Tecnologias

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **TailwindCSS** - Framework CSS utilitário
- **Lucide React** - Biblioteca de ícones
- **Supabase** - Backend-as-a-Service
- **Vite** - Build tool e dev server

## 📁 Estrutura do Projeto

O projeto segue a metodologia **Atomic Design** para organização dos componentes:

```
src/
├── components/
│   ├── atoms/           # Componentes básicos e reutilizáveis
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── badge.tsx
│   │   ├── tooltip.tsx
│   │   ├── Icon.tsx
│   │   ├── Heading.tsx
│   │   └── Text.tsx
│   ├── molecules/       # Combinações de atoms
│   │   ├── SocialLink.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── SkillBar.tsx
│   │   └── ExperienceItem.tsx
│   └── organisms/       # Componentes complexos
│       ├── Header.tsx
│       ├── ProjectCarousel.tsx
│       ├── ProjectGrid.tsx
│       ├── TechStack.tsx
│       ├── About.tsx
│       └── Footer.tsx
├── lib/
│   ├── utils.ts
│   └── supabase.ts
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
└── hooks/
    └── use-mobile.tsx
```

## 🎨 Atomic Design

### Atoms
Componentes básicos e indivisíveis que formam a base da interface:
- **Button** - Botões com diferentes variantes
- **Card** - Containers para conteúdo
- **Dialog** - Modais e popups
- **Badge** - Etiquetas e tags
- **Icon** - Wrapper para ícones do Lucide
- **Heading** - Títulos com diferentes níveis
- **Text** - Texto com diferentes variantes

### Molecules
Combinações de atoms que formam componentes funcionais:
- **SocialLink** - Links para redes sociais
- **ProjectCard** - Card para exibir projetos
- **SkillBar** - Barra de progresso para habilidades
- **ExperienceItem** - Item de experiência profissional

### Organisms
Componentes complexos que formam seções completas:
- **Header** - Cabeçalho com informações pessoais
- **ProjectCarousel** - Carrossel de projetos em destaque
- **ProjectGrid** - Grid com todos os projetos
- **TechStack** - Seção de habilidades e experiência
- **About** - Seção sobre mim
- **Footer** - Rodapé com informações de contato

## 🛠️ Instalação e Execução

1. Clone o repositório:
```bash
git clone <repository-url>
cd portfolio-samuel-stefano
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env.local na raiz do projeto
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

4. Configure o banco de dados Supabase:
```sql
-- Crie o schema portfolio
CREATE SCHEMA portfolio;

-- Tabela de usuários
CREATE TABLE portfolio.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE,
  role text DEFAULT 'owner'::text,
  photo_url text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- Tabela de projetos
CREATE TABLE portfolio.projects (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  stack ARRAY,
  collaborators jsonb,
  images ARRAY,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT projects_pkey PRIMARY KEY (id)
);
```

5. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

6. Para build de produção:
```bash
npm run build
```

## 📦 Dependências Principais

- `@supabase/supabase-js` - Cliente Supabase
- `lucide-react` - Ícones
- `react-router-dom` - Roteamento
- `@radix-ui/react-*` - Componentes acessíveis
- `tailwindcss` - Estilização
- `class-variance-authority` - Variantes de componentes
- `clsx` - Utilitário para classes CSS

## 🎯 Próximos Passos

- [ ] Integração com Storybook para documentação de componentes
- [ ] Configuração do Supabase para dados dinâmicos
- [ ] Implementação de testes unitários
- [ ] Otimização de performance
- [ ] PWA (Progressive Web App)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👨‍💻 Autor

**Samuel Stefano Teixeira do Carmo**
- GitHub: [@SamuelStefano](https://github.com/SamuelStefano)
- LinkedIn: [samuel-stefano](https://linkedin.com/in/samuel-stefano)
- Email: samuel@example.com