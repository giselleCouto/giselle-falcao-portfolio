# Design System — Giselle Light (estilo Base44)

Contrato de design das páginas do universo `/giselle`. Todas as novas páginas
seguem EXATAMENTE estes tokens. Referências: app Base44 da Giselle
(giselle-falcao-mastery.base44.app), calebixca.com (navegação enxuta) e a
logo (gradiente roxo→lavanda→teal sobre fundo branco).

## Princípios
1. **Pouco texto**: máx. 1-2 frases por card/seção. Visual primeiro.
2. **Páginas separadas**: cada assunto tem rota própria; a home só apresenta portais.
3. **Recompensa visual**: ícones grandes, números, diagramas, progresso — nunca parágrafos longos.
4. **Claro e arejado**: fundo branco/quase-branco, muito espaço em branco.

## Tokens

### Cores (paleta da logo sobre claro)
- Fundo de página: `bg-[#f7f8fc]`
- Cards/superfícies: `bg-white` com `border border-slate-200/70` e `shadow-[0_10px_40px_rgba(26,19,51,0.06)]`
- Título (ink): `text-[#1a1333]` (roxo-marinho profundo)
- Corpo: `text-slate-500` (curto!)
- Roxo primário: `#6b21a8` → violeta `#8b5cf6` (gradientes, CTAs primários)
- Lavanda: `#c4b5fd` (fills suaves, `bg-violet-100`)
- Teal: `#14b8a6` (acentos, sucesso, progresso)
- Gradiente de marca (texto/detalhes): `bg-[linear-gradient(90deg,#6b21a8,#8b5cf6,#14b8a6)] bg-clip-text text-transparent`
- Hero escuro (contraste, estilo Base44): painel `bg-[#0d1226]` com foto de fundo

### Tipografia
- Display/títulos: fonte `Baloo 2` (arredondada, amigável — igual ao Base44), classe `font-baloo`
- Corpo/UI: `Manrope` (já importada), padrão do site
- H1: `text-4xl sm:text-5xl font-bold`; H2 de seção: `text-3xl font-bold`; eyebrow:
  `text-xs font-bold uppercase tracking-[0.25em] text-teal-600`

### Componentes padrão
- **Pill CTA primário**: `rounded-full bg-[#1a1333] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6b21a8] transition`
- **Pill CTA secundário**: `rounded-full border-2 border-violet-200 px-6 py-3 text-sm font-semibold text-[#6b21a8] hover:bg-violet-50`
- **Chip**: `rounded-full px-3 py-1 text-xs font-bold` + tint (`bg-violet-100 text-violet-700`, `bg-teal-100 text-teal-700`, `bg-amber-100 text-amber-700`)
- **Card**: `rounded-3xl bg-white border border-slate-200/70 shadow-[0_10px_40px_rgba(26,19,51,0.06)] p-6` + hover `hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(107,33,168,0.12)] transition duration-300`
- **Ícone em bolha**: `flex size-12 items-center justify-center rounded-2xl bg-violet-100 text-[#6b21a8]` (lucide, `size-6`)

### Layout
- Wrapper: componente `GiselleLayout` (nav fixa clara + footer) em
  `client/src/components/giselle/GiselleLayout.tsx` — TODA página do universo /giselle usa ele.
- Container: `container` + `py-16 sm:py-20` por seção
- Grids: `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`
- Animações: framer-motion `fadeUp` com `whileInView` (padrão existente)

### Navegação (rotas)
Início `/giselle` · Soluções `/giselle/solucoes` · Cursos `/giselle/cursos` ·
Serviços `/giselle/servicos` · Sobre `/giselle/sobre` · Contato `/giselle/contato`
CTA fixa na nav: "Agendar conversa" → contact.calendar

## Gamificação (páginas de curso)
- Progresso por aula em localStorage (hook `useCourseProgress`)
- +10 XP por aula concluída, +25 XP por quiz ≥ 70%
- Níveis: 0-99 Explorador(a) · 100-249 Praticante · 250+ Especialista
- Badge por módulo completo; anel de progresso por módulo; barra no hero
- Celebração (motion) ao completar módulo/quiz
