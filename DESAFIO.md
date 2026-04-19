# 🏋️ DESAFIO PRÁTICO — TreinoTracker

> **Nível:** Intermediário a Avançado  
> **Tecnologias:** HTML5, CSS3 (Flexbox), JavaScript Puro  
> **Tempo estimado:** 6 a 12 horas  
> **Proibido:** Frameworks CSS (Bootstrap, Tailwind), bibliotecas JS (jQuery, React, etc.)

---

## 📋 Contexto do Projeto

Você foi contratado por uma startup de fitness chamada **FitFlow** para desenvolver o **TreinoTracker**, um aplicativo web que permite aos usuários registrarem e acompanharem seus treinos diários. O produto precisa ser leve, funcionar 100% no navegador (sem backend) e ter uma interface moderna, intuitiva e responsiva. O público-alvo são pessoas que treinam na academia e querem uma forma simples e visual de organizar sua rotina de exercícios.

---

## 🎯 Objetivo

Construir uma aplicação web funcional de página única (SPA) que permita:

- Adicionar treinos com informações detalhadas
- Visualizar treinos em formato de cards
- Filtrar e buscar treinos
- Acompanhar estatísticas
- Persistir dados localmente no navegador

---

## 🧱 Estrutura de Arquivos

O projeto deve conter **exatamente 3 arquivos** (além de assets opcionais):

```
TreinoTracker/
├── index.html    ← Estrutura e semântica
├── styles.css    ← Estilização completa
└── app.js        ← Toda a lógica e interatividade
```

Não é permitido usar CSS inline nem JavaScript inline no HTML. Tudo deve estar separado nos seus respectivos arquivos.

---

## 📐 Requisitos Obrigatórios

### 1. HTML — Estrutura Semântica

| O que fazer | Detalhes |
|---|---|
| Usar tags semânticas | `<header>`, `<main>`, `<section>`, `<footer>`, `<article>`, `<nav>` |
| Header | Deve conter o logo/nome do app e ações globais (busca, tema) |
| Seção de Estatísticas | 3 cards mostrando: total de treinos, tempo total, média por treino |
| Formulário de cadastro | Campos: nome do exercício, tipo (select), duração em minutos, data |
| Seção de filtros | Botões para filtrar por tipo de treino + seletor de ordenação |
| Lista de treinos | Container onde os cards de treino serão renderizados via JS |
| Estado vazio | Mensagem exibida quando não há treinos registrados |
| Footer | Créditos simples |

**Regras:**
- Todo input deve ter um `<label>` associado
- Usar atributos `aria-label` onde necessário para acessibilidade
- Atributos `required`, `min`, `max`, `maxlength` nos inputs para validação nativa
- O formulário deve usar `novalidate` (a validação será feita via JS)
- Estrutura limpa, indentada e sem divs desnecessárias

---

### 2. CSS — Layout e Design

#### Flexbox (OBRIGATÓRIO)

O layout inteiro deve ser construído com Flexbox. **Não usar CSS Grid, float ou position para layout principal.**

| Elemento | Como usar Flexbox |
|---|---|
| Body | `display: flex; flex-direction: column` para empurrar o footer ao final |
| Header | `display: flex; justify-content: space-between` para logo + ações |
| Stats | `display: flex; flex-wrap: wrap` para os 3 cards lado a lado |
| Formulário | `display: flex; flex-wrap: wrap` para campos em linha |
| Filtros | `display: flex; flex-wrap: wrap` para botões em linha |
| Lista de treinos | `display: flex; flex-wrap: wrap` para cards em grid flexível |
| Cada card | `display: flex; flex-direction: column` para organizar internamente |

#### Variáveis CSS

Usar `CSS Custom Properties` (variáveis) em `:root` para:

- Cores do tema claro (background, texto, borda, accent, etc.)
- Espaçamentos (`--space-sm`, `--space-md`, `--space-lg`, etc.)
- Border-radius, transições, fonte

#### Tema Escuro

- Definir classe `.dark` no `<body>` que sobrescreve as variáveis de cor
- A transição entre temas deve ser suave (`transition` nas propriedades de cor)

#### Hover e Transições

Todos os elementos interativos devem ter:

- `cursor: pointer`
- Efeito `hover` visível (mudança de cor, escala, sombra, etc.)
- `transition` suave (mínimo `0.3s ease`)

#### Responsividade (Mobile-First)

| Breakpoint | Comportamento |
|---|---|
| **< 480px** (mobile) | Tudo em coluna única. Header empilhado. Cards ocupam 100% da largura |
| **>= 600px** (tablet) | Cards de treino em 2 colunas |
| **>= 900px** (desktop) | Cards de treino em 3 colunas. Formulário em linha |

**Regras:**
- Começar estilizando para mobile, depois usar `@media (min-width: ...)` para telas maiores
- Textos devem ser legíveis em qualquer tela (mínimo `14px`)
- Botões devem ter área de toque mínima de `40px`

#### Animações

- Cards de treino devem ter **animação de entrada** ao serem adicionados (ex: slide + fade)
- Cards devem ter **animação de saída** ao serem removidos (ex: fade out + escala)
- Usar `@keyframes` para as animações

#### Elementos Visuais dos Cards

Cada card de treino deve ter:

- Barra colorida no topo indicando o tipo (cor diferente por tipo)
- Nome do exercício com emoji do tipo
- Badge/etiqueta com o nome do tipo
- Duração e data na parte inferior
- Botão de excluir (com hover que muda de cor)

---

### 3. JavaScript — Lógica e Interatividade

#### Estrutura do Código

O código JS deve ser organizado em seções claras:

```
1. Seletores do DOM
2. Estado da aplicação (variáveis)
3. Inicialização
4. Funções de localStorage
5. Funções do formulário (validação, adicionar, resetar)
6. Funções de exclusão
7. Funções de renderização
8. Funções de estatísticas
9. Funções de filtro e busca
10. Funções utilitárias
11. Event listeners
12. Chamada init()
```

#### Funcionalidades Obrigatórias

| Funcionalidade | Descrição |
|---|---|
| **Adicionar treino** | Valida campos → cria objeto → salva no array → salva no localStorage → re-renderiza |
| **Excluir treino** | Aplica animação de saída → remove do array → salva → re-renderiza |
| **Filtrar por tipo** | Botões "Todos", "Cardio", "Força", "Flexibilidade", "HIIT". Apenas um ativo por vez |
| **Buscar por nome** | Input de texto que filtra em tempo real (com debounce de ~300ms) |
| **Ordenar** | Select com opções: mais recentes, mais antigos, maior duração, menor duração |
| **Estatísticas** | Atualizar automaticamente ao adicionar/remover treinos |
| **Persistência** | Tudo salvo no `localStorage`. Ao recarregar a página, os dados devem permanecer |
| **Dark mode** | Toggle que alterna classe no body. Preferência salva no `localStorage` |
| **Toast/notificação** | Feedback visual ao adicionar (verde) ou remover (vermelho) um treino |
| **Validação visual** | Campos inválidos recebem borda vermelha. Erro some ao digitar |

#### Modelo de Dados

Cada treino deve ser um objeto com esta estrutura:

```javascript
{
  id: "kx7f3a2b9",       // String única (timestamp + random)
  name: "Corrida",        // String (1-50 caracteres)
  type: "cardio",         // String: "cardio" | "forca" | "flexibilidade" | "hiit"
  duration: 45,           // Número inteiro (1-600 minutos)
  date: "2026-04-19"      // String no formato YYYY-MM-DD
}
```

#### Segurança

- **Escapar HTML** de todo texto inserido pelo usuário antes de renderizar no DOM (prevenir XSS)
- Usar `textContent` ou função de escape em vez de inserir input cru no `innerHTML`
- Validar tipos e limites no JS antes de salvar

#### Boas Práticas

- Não poluir o escopo global (usar IIFE ou manter variáveis no topo)
- Usar delegação de eventos onde possível (ex: filtros)
- Funções pequenas e com responsabilidade única
- Nomes descritivos para variáveis e funções
- Comentários breves explicando cada seção

---

## ⭐ Requisitos Extras (Nível Hard)

Para quem quiser ir além do básico:

| Extra | Descrição |
|---|---|
| **Editar treino** | Clicar em um card abre o formulário preenchido para edição |
| **Confirmação de exclusão** | Modal "Tem certeza?" antes de excluir |
| **Gráfico de barras em CSS** | Mostrar distribuição de treinos por tipo usando barras de largura dinâmica |
| **Exportar dados** | Botão que gera um arquivo `.json` com todos os treinos para download |
| **Importar dados** | Input file que lê um `.json` e carrega os treinos |
| **Streak counter** | Mostrar quantos dias seguidos o usuário treinou |
| **Drag and drop** | Reordenar cards arrastando |
| **Atalhos de teclado** | Ex: `Ctrl+N` para focar no formulário, `Esc` para limpar busca |
| **Animação de confetti** | Ao atingir marcos (10, 25, 50 treinos) |
| **PWA básico** | Adicionar `manifest.json` para instalar como app no celular |

---

## ✅ Critérios de Avaliação

| Critério | Peso | O que será observado |
|---|---|---|
| **Semântica HTML** | 15% | Uso correto de tags, acessibilidade, estrutura limpa |
| **CSS / Flexbox** | 25% | Layout 100% flexbox, variáveis, transições, hover, animações |
| **Responsividade** | 15% | Funcionar perfeitamente em mobile, tablet e desktop |
| **JavaScript** | 30% | Manipulação de DOM, eventos, lógica correta, código organizado |
| **UX / Feedback** | 10% | Toast, validação visual, estado vazio, dark mode |
| **Código limpo** | 5% | Indentação, nomes, comentários, separação de responsabilidades |

---

## 🖼️ Como o Resultado Final Deve Parecer

### Desktop (>= 900px)

```
┌────────────────────────────────────────────────────────┐
│  🏋️ TreinoTracker              [🔍 Busca...] [🌙]     │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │      12      │ │   5h 30min   │ │    27 min    │   │
│  │   Treinos    │ │  Tempo Total │ │ Média/Treino │   │
│  └──────────────┘ └──────────────┘ └──────────────┘   │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Novo Treino                                     │  │
│  │  [Exercício  ] [Tipo ▼] [Duração ] [Data      ] │  │
│  │  [          ➕ Adicionar Treino                 ] │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  [Todos] [🏃 Cardio] [💪 Força] [🧘 Flex] [🔥 HIIT]  │
│                                    Ordenar: [Recentes▼]│
│                                                        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │▬▬▬▬▬▬▬▬▬▬▬▬▬│ │▬▬▬▬▬▬▬▬▬▬▬▬▬│ │▬▬▬▬▬▬▬▬▬▬▬▬▬│   │
│  │ 🏃 Corrida  🗑│ │ 💪 Supino   🗑│ │ 🔥 Burpees  🗑│   │
│  │ ┌─────────┐  │ │ ┌─────────┐  │ │ ┌─────────┐  │   │
│  │ │ CARDIO  │  │ │ │  FORÇA  │  │ │ │  HIIT   │  │   │
│  │ └─────────┘  │ │ └─────────┘  │ │ └─────────┘  │   │
│  │ ⏱️ 45 min    │ │ ⏱️ 30 min    │ │ ⏱️ 20 min    │   │
│  │ 📅 19/04/26  │ │ 📅 18/04/26  │ │ 📅 17/04/26  │   │
│  └──────────────┘ └──────────────┘ └──────────────┘   │
│                                                        │
├────────────────────────────────────────────────────────┤
│        TreinoTracker © 2026 — Feito com 💪            │
└────────────────────────────────────────────────────────┘
```

### Mobile (< 480px)

```
┌──────────────────────┐
│  🏋️ TreinoTracker    │
│  [🔍 Busca...] [🌙]  │
├──────────────────────┤
│ ┌──────────────────┐ │
│ │   12 Treinos     │ │
│ ├──────────────────┤ │
│ │  5h 30min Total  │ │
│ ├──────────────────┤ │
│ │  27 min Média    │ │
│ └──────────────────┘ │
│                      │
│ [Exercício        ]  │
│ [Tipo           ▼]  │
│ [Duração (min)   ]  │
│ [Data            ]  │
│ [➕ Adicionar     ]  │
│                      │
│ [Todos] [Cardio]     │
│ [Força] [Flex][HIIT] │
│ Ordenar: [Recentes▼] │
│                      │
│ ┌──────────────────┐ │
│ │▬▬▬▬▬▬ AZUL ▬▬▬▬▬│ │
│ │ 🏃 Corrida    🗑  │ │
│ │ CARDIO            │ │
│ │ ⏱️ 45min 📅 19/04 │ │
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │▬▬▬▬▬ ROSA ▬▬▬▬▬▬│ │
│ │ 💪 Supino     🗑  │ │
│ │ FORÇA             │ │
│ │ ⏱️ 30min 📅 18/04 │ │
│ └──────────────────┘ │
│                      │
│  © 2026 TreinoTracker│
└──────────────────────┘
```

---

## 🧪 Checklist de Testes Manuais

Antes de considerar o projeto finalizado, teste cada item:

- [ ] Adicionar treino com todos os campos preenchidos — deve aparecer na lista
- [ ] Tentar adicionar treino com campos vazios — deve mostrar erro visual + toast
- [ ] Excluir um treino — deve ter animação e sumir da lista
- [ ] Verificar se estatísticas atualizam ao adicionar/remover
- [ ] Filtrar por cada tipo — deve mostrar apenas os cards daquele tipo
- [ ] Buscar por nome — deve filtrar em tempo real
- [ ] Ordenar por data e duração — verificar se a ordem muda
- [ ] Recarregar a página — treinos devem persistir (localStorage)
- [ ] Alternar tema escuro — deve funcionar e persistir ao recarregar
- [ ] Redimensionar a janela — layout deve se adaptar (mobile → tablet → desktop)
- [ ] Testar em celular real ou DevTools (Chrome: F12 → toggle device)
- [ ] Verificar se o estado vazio aparece quando não há treinos

---

## 💡 Dicas para Desenvolvimento

1. **Comece pelo HTML** — Monte toda a estrutura semântica antes de estilizar
2. **CSS mobile-first** — Estilize para mobile, depois use media queries para telas maiores
3. **JS por partes** — Primeiro faça o CRUD funcionar, depois adicione filtros, busca e extras
4. **Teste sempre** — Abra o DevTools (F12), use o console para debugar
5. **Commits frequentes** — Se usar Git, faça commits pequenos a cada funcionalidade

---

## 🚀 Como Rodar

Não precisa de servidor. Basta abrir o `index.html` no navegador:

1. Clique duplo no arquivo `index.html`, ou
2. Use a extensão **Live Server** do VS Code, ou
3. Rode no terminal: `start index.html` (Windows) / `open index.html` (Mac)

---

> **Boa sorte e bons treinos! 💪**
