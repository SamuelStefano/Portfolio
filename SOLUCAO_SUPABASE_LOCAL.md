# 🔧 Solução: Supabase Não Funciona Localmente

## 🔍 Diagnóstico

Você configurou o `.env` mas o Supabase ainda não funciona. Vamos resolver!

---

## ✅ Passo a Passo para Corrigir

### 1. **Verifique o Nome do Arquivo**

O arquivo DEVE se chamar exatamente `.env` (com o ponto na frente) e estar na **raiz do projeto**:

```
Repository/
├── .env          ← AQUI (mesmo nível do package.json)
├── package.json
├── src/
└── ...
```

**NÃO PODE SER:**
- ❌ `env.txt`
- ❌ `.env.local`
- ❌ `env`
- ❌ `.env.example`

---

### 2. **Verifique o Formato das Variáveis**

O arquivo `.env` deve estar EXATAMENTE assim:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
```

**IMPORTANTE:**
- ❌ **SEM aspas**: `VITE_SUPABASE_URL="https://..."` (ERRADO)
- ✅ **SEM aspas**: `VITE_SUPABASE_URL=https://...` (CERTO)
- ❌ **SEM espaços**: `VITE_SUPABASE_URL = https://...` (ERRADO)
- ✅ **SEM espaços**: `VITE_SUPABASE_URL=https://...` (CERTO)
- ❌ **SEM comentários na mesma linha**: `VITE_SUPABASE_URL=https://... # minha url` (ERRADO)

---

### 3. **REINICIE O SERVIDOR**

Isso é FUNDAMENTAL! O Vite só lê o `.env` na inicialização:

```bash
# 1. PARE o servidor (Ctrl+C)

# 2. Inicie novamente:
npm run dev
# ou
bun dev
```

**⚠️ ATENÇÃO**: Se você criou/editou o `.env` com o servidor rodando, ELE NÃO VAI FUNCIONAR até reiniciar!

---

### 4. **Verifique se as Variáveis Estão Corretas**

Abra o console do navegador (F12) e procure por:

```
🔍 DEBUG Supabase Config:
URL exists: true
URL value: https://xxxxx.supabase.co
Key exists: true
Key length: 200+
```

**Se aparecer:**
- ❌ `URL exists: false` → Variável não foi lida
- ❌ `URL value: undefined` → Arquivo `.env` não foi carregado
- ❌ `Key exists: false` → ANON_KEY não foi definida

---

### 5. **Limpe o Cache do Vite**

Às vezes o Vite cacheia as variáveis antigas:

```bash
# Pare o servidor (Ctrl+C)

# Limpe o cache
rm -rf node_modules/.vite
# ou no Windows PowerShell:
Remove-Item -Recurse -Force node_modules\.vite

# Reinicie
npm run dev
```

---

### 6. **Verifique as Credenciais no Supabase**

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em: `Settings` → `API`
4. Copie:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`

**Exemplo:**
```env
VITE_SUPABASE_URL=https://kushljlnnwmqxubeeete.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1c2hsamxubndt...
```

---

## 🧪 Como Testar

### 1. **Console do Navegador (F12)**

Procure por estas mensagens:

✅ **FUNCIONANDO:**
```
🔍 DEBUG Supabase Config:
URL exists: true
URL value: https://xxxxx.supabase.co
Key exists: true
Key length: 245
```

❌ **NÃO FUNCIONANDO:**
```
⚠️ Variáveis de ambiente do Supabase não configuradas. Usando dados mock.
VITE_SUPABASE_URL: UNDEFINED
VITE_SUPABASE_ANON_KEY: UNDEFINED
```

### 2. **Teste as Imagens**

Se funcionar, as imagens dos 3 primeiros projetos devem carregar:
- ✅ Skill Evals
- ✅ DevFellowship
- ✅ CodeLibrary

---

## 🚨 Problemas Comuns

### Problema 1: "URL exists: false"
**Causa**: Arquivo `.env` não foi lido pelo Vite  
**Solução**: 
1. Verifique se o arquivo está na raiz
2. Verifique se o nome está correto (`.env` com ponto)
3. Reinicie o servidor

### Problema 2: "URL value: https://... Key exists: false"
**Causa**: ANON_KEY está errada ou com espaços  
**Solução**:
1. Copie novamente do Supabase Dashboard
2. Cole sem aspas
3. Sem espaços antes ou depois do `=`

### Problema 3: "Usando dados mock"
**Causa**: Variáveis não foram definidas  
**Solução**:
1. Verifique o formato do `.env`
2. Sem aspas nas variáveis
3. Reinicie o servidor

### Problema 4: "Imagens ainda não aparecem"
**Causa**: Cache do navegador  
**Solução**:
1. Limpe o cache (Ctrl+Shift+R)
2. Abra em aba anônima
3. Verifique o console por erros

---

## 📋 Checklist de Verificação

Marque cada item:

- [ ] Arquivo se chama `.env` (com ponto)
- [ ] Arquivo está na raiz do projeto
- [ ] Variáveis SEM aspas
- [ ] Variáveis SEM espaços ao redor do `=`
- [ ] Credenciais copiadas do Supabase Dashboard
- [ ] Servidor foi REINICIADO após criar/editar `.env`
- [ ] Cache do Vite foi limpo (se necessário)
- [ ] Console mostra "URL exists: true"
- [ ] Console mostra "Key exists: true"

---

## 🔍 Debug Avançado

Se AINDA não funcionar, adicione isso temporariamente em `src/main.tsx`:

```typescript
// No topo do arquivo
console.log('=== TODAS AS ENV VARS ===');
console.log(import.meta.env);
console.log('=========================');
```

Isso vai mostrar TODAS as variáveis de ambiente carregadas. Procure por `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.

---

## 💡 Dica Extra

Se você usar VS Code, reinicie o terminal integrado também:
1. Feche o terminal (ícone da lixeira)
2. Abra um novo terminal
3. Execute `npm run dev` novamente

---

## 📞 Ainda Não Funciona?

Se após todos esses passos ainda não funcionar, me envie:

1. ✅ Confirmação de que o arquivo se chama `.env` e está na raiz
2. 📸 Screenshot do console do navegador (F12)
3. 📋 Output do comando:
   ```bash
   npm run dev
   ```
4. 🔍 O que aparece quando você cola isso no console do navegador:
   ```javascript
   console.log(import.meta.env)
   ```

---

**Na maioria dos casos, o problema é simplesmente NÃO TER REINICIADO o servidor após criar o `.env`! 🔄**

