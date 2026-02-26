# Brainstorming de Design - Cards Marketplace

## Conceito Escolhido: Modern Minimalism com Toque de Colecionador

### Design Movement
**Modern Minimalism** com influências de **Luxury E-commerce** e **Gaming UI**. A estética busca transmitir sofisticação, profissionalismo e um toque de exclusividade que remete ao universo de colecionadores.

### Core Principles
1. **Clareza Hierárquica**: Informações organizadas em níveis claros de importância, facilitando a navegação intuitiva
2. **Espaço Respirável**: Uso generoso de whitespace para criar elegância e reduzir cognitivo overload
3. **Foco no Conteúdo**: Cards e imagens como protagonistas, com UI secundária discreta
4. **Interatividade Sutil**: Transições suaves e feedback visual imediato sem distrações

### Color Philosophy
- **Primária**: Deep Navy (#1a2a4a) - confiança, sofisticação, profissionalismo
- **Secundária**: Vibrant Teal (#00d4aa) - energia, modernidade, destaque
- **Neutros**: Gradação de cinzas (branco a #f5f5f5 para backgrounds)
- **Acentos**: Dourado suave (#d4af37) para elementos premium/raros
- **Intenção Emocional**: Transmitir confiabilidade e exclusividade, como um marketplace premium

### Layout Paradigm
- **Hero Section**: Assimétrico com imagem de fundo (card em perspectiva 3D)
- **Marketplace Grid**: Layout responsivo com cards em grid 3-4 colunas
- **Sidebar Navigation**: Para usuário logado, mantendo contexto de navegação
- **Modais e Overlays**: Para criar/editar trades, sem sair do contexto

### Signature Elements
1. **Card Showcase**: Cards com efeito hover 3D (lift effect), sombra dinâmica
2. **Badge System**: Status badges (OFFERING, RECEIVING, COMPLETED) com cores distintas
3. **Gradient Accents**: Linhas e bordas com gradientes suaves teal→azul

### Interaction Philosophy
- **Hover Effects**: Cards elevam-se, sombras aumentam, cores mudam sutilmente
- **Transições**: 300-400ms ease-out para movimentos principais
- **Feedback Imediato**: Toasts para ações (sucesso/erro), spinners para loading
- **Micro-interactions**: Botões com ripple effect, checkboxes com animação

### Animation Guidelines
- **Page Transitions**: Fade-in de 200ms ao carregar páginas
- **Card Entrance**: Stagger animation (100ms delay entre cards)
- **Button Hover**: Scale 1.02 + sombra aumentada
- **Loading States**: Shimmer effect em skeletons, spinner suave
- **Success/Error**: Pulse effect em toasts, slide-in de baixo

### Typography System
- **Display Font**: "Playfair Display" (serif, elegante) para títulos principais
- **Body Font**: "Inter" (sans-serif, legível) para conteúdo
- **Hierarchy**:
  - H1: 48px, 700 weight, Playfair Display
  - H2: 32px, 600 weight, Playfair Display
  - H3: 24px, 600 weight, Inter
  - Body: 16px, 400 weight, Inter
  - Small: 14px, 400 weight, Inter

---

## Decisões de Implementação

### Paleta Final
```
Primary: #1a2a4a (Deep Navy)
Secondary: #00d4aa (Vibrant Teal)
Accent: #d4af37 (Gold)
Background: #ffffff
Surface: #f8f9fa
Text Primary: #1a2a4a
Text Secondary: #6b7280
Border: #e5e7eb
Success: #10b981
Warning: #f59e0b
Error: #ef4444
```

### Componentes Principais
- **Header**: Logo + Navigation (Desktop) / Hamburger (Mobile)
- **Card Component**: Showcase de cartas com imagem, nome, descrição
- **TradeCard**: Exibição de solicitações de troca com OFFERING/RECEIVING
- **Modal**: Para criar/editar trades
- **Form**: Validação em tempo real, feedback visual
- **Toast**: Notificações de sucesso/erro
- **Loading**: Skeleton screens e spinners

