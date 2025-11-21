# 🔧 Como Corrigir: Imagens Não Funcionam Localmente

## 🔍 Problema Identificado

As imagens dos projetos **Skill Evals**, **DevFellowship** e **CodeLibrary** não aparecem no ambiente local porque faltam as **variáveis de ambiente do Supabase**.

No deploy (Vercel), as variáveis estão configuradas, por isso funciona.

---

## ✅ Solução: Criar arquivo .env

### Passo 1: Criar o arquivo

Na **raiz do projeto** (mesmo nível do `package.json`), crie um arquivo chamado `.env`:

```
Repository/
├── .env          ← CRIAR ESTE ARQUIVO
├── package.json
├── src/
└── ...
```

### Passo 2: Adicionar as variáveis

Cole o seguinte conteúdo no arquivo `.env`:

```env
VITE_SUPABASE_URL=sua_url_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_aqui
```

### Passo 3: Obter suas credenciais

1. **Acesse o Supabase Dashboard**: https://supabase.com/dashboard
2. **Selecione seu projeto** (o mesmo que está no deploy)
3. **Vá em**: `Settings` → `API`
4. **Copie os valores**:
   - **URL do projeto** → cole em `VITE_SUPABASE_URL`
   - **Chave pública anon** → cole em `VITE_SUPABASE_ANON_KEY`

### Exemplo (com valores fictícios):

```env
VITE_SUPABASE_URL=https://kushljlnnwmqxubeeete.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1c2hsamxubndt...
```

### Passo 4: Reiniciar o servidor

Depois de salvar o arquivo `.env`:

```bash
# Pare o servidor (Ctrl+C)
# Inicie novamente:
npm run dev
# ou
bun dev
```

---

## 🎯 Como Verificar se Funcionou

1. Abra `http://localhost:3000`
2. Navegue até a seção "Projetos"
3. As imagens dos 3 primeiros projetos devem carregar:
   - ✅ **Skill Evals**
   - ✅ **DevFellowship** 
   - ✅ **CodeLibrary**

Os 4 novos projetos não terão imagens ainda (você vai adicionar manualmente):
- ⏳ GreenLoop
- ⏳ MintWork
- ⏳ Review Requests
- ⏳ Learn.devfellowship

---

## 📝 Notas Importantes

### .gitignore

O arquivo `.env` **NÃO deve ser commitado** para o Git (já está no `.gitignore`).

Isso é importante porque contém credenciais sensíveis.

### Deploy (Vercel)

No Vercel, as variáveis de ambiente estão configuradas em:
- `Settings` → `Environment Variables`

Por isso o deploy funciona mesmo sem o arquivo `.env` local.

---

## ❓ Problemas Comuns

### "Imagens ainda não aparecem"

1. Verifique se o arquivo `.env` está na **raiz do projeto**
2. Verifique se **não há espaços** antes ou depois dos valores
3. Certifique-se de que **reiniciou o servidor**
4. Limpe o cache do navegador (Ctrl+Shift+R)

### "Erro ao conectar com Supabase"

- Verifique se as credenciais estão corretas
- Teste acessando o Dashboard do Supabase
- Verifique se o projeto está ativo

### "Algumas imagens aparecem, outras não"

- As imagens dos 3 primeiros projetos vêm do Supabase
- Os novos projetos (GreenLoop, MintWork, etc.) precisam de imagens manuais
- Veja o arquivo `COMO_ADICIONAR_IMAGENS.md` para mais detalhes

---

## 🎨 Estrutura Atual de Imagens

### Projetos com imagens do Supabase (funcionarão após configurar .env):
1. ✅ **Skill Evals** - bucket: `challenge-images`
2. ✅ **DevFellowship** - bucket: `Devfellowship`
3. ✅ **CodeLibrary** - bucket: `Codelibrary-website`

### Projetos aguardando suas imagens:
4. ⏳ **GreenLoop** - pasta: `public/projects/greenloop/`
5. ⏳ **MintWork** - pasta: `public/projects/mintwork/`
6. ⏳ **Review Requests** - pasta: `public/projects/reviewrequests/`
7. ⏳ **Learn.devfellowship** - pasta: `public/projects/learndevfellowship/`

---

**Pronto! Após configurar o `.env`, todas as imagens dos projetos originais funcionarão localmente! 🎉**

