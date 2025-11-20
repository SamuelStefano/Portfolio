# 📸 Como Adicionar Imagens dos Novos Projetos

## 🎯 Estrutura de Pastas Criada

As seguintes pastas foram criadas e estão prontas para receber as imagens:

```
public/projects/
├── greenloop/
├── mintwork/
└── reviewrequests/
```

---

## 📋 Passo a Passo

### 1. **Preparar as Imagens**

Para cada projeto, você precisará de:
- ✅ **1 imagem principal** (thumbnail) - será exibida no card do carrossel
- ✅ **Imagens de seções** (opcional) - para mostrar detalhes quando clicar no projeto

**Recomendações**:
- Formato: `.jpg`, `.png` ou `.webp`
- Resolução: mínimo 1200x800px para thumbnails
- Otimizar as imagens antes (use TinyPNG ou similar)
- Nome dos arquivos: sem espaços, usar kebab-case

---

### 2. **GreenLoop** 🌿

#### Estrutura sugerida:
```
public/projects/greenloop/
├── thumbnail.jpg              ← OBRIGATÓRIO (imagem principal)
├── dashboard/
│   ├── main-view.jpg
│   └── metrics.jpg
├── mobile/
│   ├── home.jpg
│   └── rewards.jpg
├── features/
│   ├── token-system.jpg
│   ├── collection-points.jpg
│   └── blockchain-tracking.jpg
└── admin/
    └── management.jpg
```

#### O que fotografar:
- Dashboard principal mostrando coletas e tokens
- Sistema de recompensas/tokens
- Pontos de coleta no mapa
- Interface mobile (se houver)
- Painel administrativo

---

### 3. **MintWork** 💼

#### Estrutura sugerida:
```
public/projects/mintwork/
├── thumbnail.jpg              ← OBRIGATÓRIO (imagem principal)
├── jobs/
│   ├── job-listing.jpg
│   ├── job-details.jpg
│   └── create-job.jpg
├── marketplace/
│   ├── browse.jpg
│   ├── escrow-flow.jpg
│   └── payments.jpg
├── nft/
│   ├── credential-nft.jpg
│   └── nft-gallery.jpg
└── profile/
    ├── talent-profile.jpg
    └── company-profile.jpg
```

#### O que fotografar:
- Listagem de jobs disponíveis
- Detalhes de um job (estrutura, pagamento em USDC)
- Processo de escrow
- NFT de credencial gerada
- Perfis de talentos e empresas

---

### 4. **Review Requests** 📝

#### Estrutura sugerida:
```
public/projects/reviewrequests/
├── thumbnail.jpg              ← OBRIGATÓRIO (imagem principal)
├── dashboard/
│   ├── overview.jpg
│   └── pending-reviews.jpg
├── reviews/
│   ├── review-detail.jpg
│   ├── comment-system.jpg
│   └── approval-flow.jpg
├── create/
│   └── create-request.jpg
└── admin/
    └── management-panel.jpg
```

#### O que fotografar:
- Dashboard com lista de reviews pendentes
- Detalhes de uma review request
- Sistema de comentários e feedback
- Fluxo de aprovação/rejeição
- Histórico de revisões

---

## 🚀 Depois de Adicionar as Imagens

### Opção 1: Sistema Automático (Supabase Storage)
Se você estiver usando o Supabase Storage, o sistema vai descobrir as imagens automaticamente.

### Opção 2: Atualizar Manualmente
Se não estiver usando Supabase Storage, atualize o arquivo `src/lib/mockProjects.ts`:

#### Para GreenLoop:
```typescript
{
  id: '4',
  title: 'GreenLoop',
  // ... outros campos
  thumbnail_url: '/projects/greenloop/thumbnail.jpg', // ← adicione aqui
  image_categories: {
    'dashboard': [
      '/projects/greenloop/dashboard/main-view.jpg',
      '/projects/greenloop/dashboard/metrics.jpg'
    ],
    'mobile': [
      '/projects/greenloop/mobile/home.jpg',
      '/projects/greenloop/mobile/rewards.jpg'
    ],
    'features': [
      '/projects/greenloop/features/token-system.jpg',
      '/projects/greenloop/features/collection-points.jpg',
      '/projects/greenloop/features/blockchain-tracking.jpg'
    ]
  }
}
```

#### Para MintWork:
```typescript
{
  id: '5',
  title: 'MintWork',
  // ... outros campos
  thumbnail_url: '/projects/mintwork/thumbnail.jpg', // ← adicione aqui
  image_categories: {
    'jobs': [
      '/projects/mintwork/jobs/job-listing.jpg',
      '/projects/mintwork/jobs/job-details.jpg'
    ],
    'marketplace': [
      '/projects/mintwork/marketplace/browse.jpg',
      '/projects/mintwork/marketplace/escrow-flow.jpg'
    ],
    'nft': [
      '/projects/mintwork/nft/credential-nft.jpg',
      '/projects/mintwork/nft/nft-gallery.jpg'
    ]
  }
}
```

#### Para Review Requests:
```typescript
{
  id: '6',
  title: 'Review Requests',
  // ... outros campos
  thumbnail_url: '/projects/reviewrequests/thumbnail.jpg', // ← adicione aqui
  image_categories: {
    'dashboard': [
      '/projects/reviewrequests/dashboard/overview.jpg',
      '/projects/reviewrequests/dashboard/pending-reviews.jpg'
    ],
    'reviews': [
      '/projects/reviewrequests/reviews/review-detail.jpg',
      '/projects/reviewrequests/reviews/comment-system.jpg'
    ]
  }
}
```

---

## 🔍 Testando Localmente

1. Adicione as imagens nas pastas
2. Execute o projeto:
   ```bash
   npm run dev
   # ou
   bun dev
   ```
3. Acesse `http://localhost:3000` (ou a porta configurada)
4. Navegue até a seção "Projetos"
5. Verifique se:
   - ✅ Os cards dos novos projetos aparecem no carrossel
   - ✅ As imagens principais (thumbnails) estão sendo exibidas
   - ✅ Ao clicar no projeto, as imagens de seções aparecem nas abas

---

## 💡 Dicas

### Captura de Tela
- Use `F12` para abrir DevTools e ativar modo responsivo
- Capture em diferentes resoluções (desktop, tablet, mobile)
- Remova informações sensíveis antes de capturar

### Otimização
- Use [TinyPNG](https://tinypng.com/) para comprimir as imagens
- Converta para WebP se possível (melhor compressão)
- Tamanho recomendado: thumbnails ~200-300KB, detalhes ~500KB

### Organização
- Nomeie os arquivos de forma descritiva: `job-listing.jpg` ✅
- Evite nomes genéricos: `image1.jpg` ❌
- Use kebab-case: `token-rewards.jpg` ✅

---

## ❓ Problemas Comuns

### "Imagens não aparecem"
1. Verifique se as imagens estão na pasta correta
2. Certifique-se de que os nomes dos arquivos não têm espaços
3. Reinicie o servidor de desenvolvimento
4. Limpe o cache do navegador (Ctrl+Shift+R)

### "Imagens aparecem quebradas"
1. Verifique o caminho no código
2. Certifique-se de que usou `/` (barra) e não `\` (barra invertida)
3. Verifique as permissões dos arquivos

### "Não vejo os novos projetos"
1. Verifique se o arquivo `mockProjects.ts` foi salvo
2. Reinicie o servidor
3. Verifique o console do navegador por erros

---

## 📞 Suporte

Se tiver dúvidas, verifique:
1. O arquivo `PORTFOLIO_UPDATES.md` para ver todas as mudanças
2. Os comentários nos arquivos `.gitkeep` dentro das pastas de projetos
3. O console do navegador por mensagens de erro

---

**Pronto para adicionar suas imagens! 🎨✨**

