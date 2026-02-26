# Cards Marketplace - Marketplace de Troca de Cartas

Um SPA (Single Page Application) moderno para troca de cartas colecionáveis, desenvolvido com Vue 3, TypeScript, Pinia e Tailwind CSS.

## 🎯 Funcionalidades

### Autenticação
- ✅ Registro de novos usuários
- ✅ Login com validação de credenciais
- ✅ Persistência de sessão com JWT
- ✅ Proteção de rotas autenticadas

### Gerenciamento de Cartas
- ✅ Visualizar todas as cartas disponíveis no sistema
- ✅ Adicionar cartas à sua coleção pessoal
- ✅ Visualizar suas cartas
- ✅ Paginação de cartas

### Marketplace de Trocas
- ✅ Visualizar todas as solicitações de troca abertas
- ✅ Criar novas solicitações de troca
- ✅ Especificar cartas que você oferece
- ✅ Especificar cartas que você procura
- ✅ Deletar suas próprias solicitações
- ✅ Paginação de trades

### UX/UI
- ✅ Design moderno e responsivo
- ✅ Sistema de notificações (toasts)
- ✅ Loading spinners
- ✅ Validação de formulários em tempo real
- ✅ Tratamento de erros

## 🏗️ Arquitetura

### Stack Tecnológico
- **Frontend Framework**: Vue 3 (Composition API)
- **Linguagem**: TypeScript
- **Gerenciamento de Estado**: Pinia
- **Roteamento**: Vue Router
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Validação**: Vee-Validate + Yup

### Estrutura de Diretórios

```
client/src/
├── components/          # Componentes reutilizáveis
│   ├── Header.vue
│   ├── Footer.vue
│   ├── CardImage.vue
│   ├── LoadingSpinner.vue
│   ├── Toast.vue
│   └── ToastContainer.vue
├── pages/              # Páginas da aplicação
│   ├── Home.vue
│   ├── Login.vue
│   ├── Register.vue
│   ├── Marketplace.vue
│   ├── Dashboard.vue
│   └── NotFound.vue
├── stores/             # Pinia stores
│   ├── auth.ts         # Gerenciamento de autenticação
│   ├── cards.ts        # Gerenciamento de cartas
│   └── trades.ts       # Gerenciamento de trades
├── services/           # Serviços de API
│   └── api.ts          # Cliente Axios com interceptadores
├── types/              # Definições TypeScript
│   └── index.ts        # Tipos e interfaces
├── utils/              # Utilitários
│   ├── cache.ts        # Sistema de cache
│   └── useToast.ts     # Composable para toasts
├── App.vue             # Componente raiz
├── main.ts             # Ponto de entrada
├── router.ts           # Configuração de rotas
└── index.css           # Estilos globais
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- pnpm (ou npm/yarn)

### Instalação

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview da build
pnpm preview
```

O servidor estará disponível em `http://localhost:3000`

## 📋 Fluxo de Uso

### 1. Registro
- Acesse a página de registro
- Preencha nome, email e senha
- Confirme a senha
- Clique em "Registrar"

### 2. Login
- Acesse a página de login
- Insira email e senha
- Clique em "Entrar"

### 3. Adicionar Cartas
- Acesse o Dashboard
- Clique em "Adicionar Cartas"
- Selecione as cartas que você possui
- Clique em "Adicionar"

### 4. Criar Solicitação de Troca
- Acesse o Dashboard
- Clique em "Criar Troca"
- Selecione as cartas que você oferece
- Selecione as cartas que você procura
- Clique em "Criar Solicitação"

### 5. Explorar Marketplace
- Acesse o Marketplace
- Visualize todas as solicitações de troca abertas
- Veja quais cartas cada usuário oferece e procura

## 🔌 Integração com API

A aplicação se conecta com a API em `https://cards-marketplace-api.onrender.com`

### Endpoints Utilizados

#### Autenticação
- `POST /register` - Registrar novo usuário
- `POST /login` - Fazer login
- `GET /me` - Obter dados do usuário logado

#### Cartas
- `GET /cards` - Listar todas as cartas (com paginação)
- `GET /cards/:id` - Obter detalhes de uma carta
- `GET /me/cards` - Listar cartas do usuário
- `POST /me/cards` - Adicionar cartas ao usuário

#### Trades
- `GET /trades` - Listar todas as solicitações de troca (com paginação)
- `POST /trades` - Criar nova solicitação de troca
- `DELETE /trades/:id` - Deletar solicitação de troca

## 💾 Sistema de Cache

A aplicação implementa um sistema de cache em memória para otimizar o desempenho:

- **Cartas**: Cache de 5 minutos
- **Trades**: Cache por página de 5 minutos
- **Cartas do usuário**: Cache de 5 minutos

O cache é automaticamente invalidado quando dados são atualizados.

## 🎨 Design System

### Paleta de Cores
- **Primária**: Deep Navy (#1a2a4a) - Confiança e profissionalismo
- **Secundária**: Vibrant Teal (#00d4aa) - Energia e modernidade
- **Acentos**: Gold (#d4af37) - Elementos premium
- **Neutros**: Gradação de cinzas

### Tipografia
- **Display**: Playfair Display (serif) - Títulos
- **Body**: Inter (sans-serif) - Conteúdo

### Componentes
- Buttons com hover effects
- Cards com sombras e transições
- Modais para ações importantes
- Toasts para notificações
- Loading spinners para estados assíncronos

## 🔐 Segurança

- Tokens JWT armazenados em localStorage
- Interceptadores de requisição para adicionar token automaticamente
- Validação de formulários no cliente
- Tratamento de erros de autenticação
- Proteção de rotas autenticadas

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🐛 Tratamento de Erros

- Validação de formulários com mensagens claras
- Toasts de erro para operações falhas
- Fallback para imagens quebradas
- Tratamento de erros de rede
- Mensagens de erro da API

## 📦 Dependências Principais

```json
{
  "vue": "^3.5.29",
  "vue-router": "^5.0.3",
  "pinia": "^3.0.4",
  "axios": "^1.12.2",
  "tailwindcss": "^4.1.14",
  "typescript": "5.6.3"
}
```

## 🚢 Deploy

A aplicação pode ser deployada em qualquer plataforma que suporte Node.js:

1. Build: `pnpm build`
2. O diretório `dist/public` contém os arquivos estáticos
3. O arquivo `dist/index.js` contém o servidor Express

### Plataformas Recomendadas
- Vercel
- Netlify
- Railway
- Render
- Heroku

## 📝 Commits

O projeto segue uma estrutura clara de commits:

- `feat:` - Novas funcionalidades
- `fix:` - Correções de bugs
- `style:` - Mudanças de estilo
- `refactor:` - Refatoração de código
- `docs:` - Documentação
- `chore:` - Tarefas de manutenção

## 🤝 Contribuindo

Este é um projeto de desafio técnico. Para sugestões ou melhorias, abra uma issue ou pull request.

## 📄 Licença

MIT

## 👨‍💻 Desenvolvedor

Desenvolvido como desafio técnico para avaliar habilidades em:
- Vue 3 e Composition API
- TypeScript
- Pinia para gerenciamento de estado
- Design responsivo
- Integração com APIs REST
- UX/UI design

## ⚠️ Notas Importantes

1. **API Hibernation**: A API pode hibernar após 30 segundos de inatividade. Aguarde alguns minutos para que ela reinicie.

2. **Validação**: Todos os formulários incluem validação em tempo real com feedback visual.

3. **Cache**: O sistema de cache melhora o desempenho, mas pode ser limpo manualmente se necessário.

4. **Autenticação**: A sessão persiste no localStorage. Limpe o navegador para fazer logout completo.

## 🔗 Links Úteis

- [Vue 3 Documentation](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

**Status**: ✅ Completo e funcional
**Última atualização**: Fevereiro de 2026
