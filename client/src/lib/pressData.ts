// Matérias na imprensa — exibidas na seção "Na mídia" da home.

export type PressFeature = {
  outlet: string;
  section: string;
  date: string;
  title: string;
  summary: string;
  highlight: string;
  url: string;
};

export const pressFeatures: PressFeature[] = [
  {
    outlet: "SAGRES TV",
    section: "É Bom, É Brasil",
    date: "14 set 2026",
    title: "Giselle Falcão: uma trajetória de superação, conhecimento e ciência",
    summary:
      "Entrevista ao programa É Bom, É Brasil (Demà Sagres TV): da sala de aula à Sorbonne, e da pesquisa à IA aplicada que chega à operação.",
    highlight: "Entrevista em vídeo",
    url: "https://youtube.com/live/S-VmfASN6IM",
  },
  {
    outlet: "O TEMPO",
    section: "Economia",
    date: "6 jul 2026",
    title: "Ferramentas de IA impulsionam negócios do agro com prevenção de perdas e aumento de receita",
    summary:
      "Giselle mostra como o gêmeo digital de estufas de morango e a otimização de rotas na cana geram economia real no campo.",
    highlight: "-26% no consumo de água",
    url: "https://www.otempo.com.br/economia/2026/7/6/ferramentas-de-ia-impulsionam-negocios-do-agro-com-prevencao-de-perdas-e-aumento-de-receita",
  },
  {
    outlet: "O TEMPO",
    section: "Economia",
    date: "17 jun 2026",
    title: "IA avança no agronegócio com ferramentas que enxergam além do olho humano",
    summary:
      "Cobertura do painel de Giselle no Minas Summit: visão computacional que antecipa doenças na lavoura antes de qualquer sintoma visível.",
    highlight: "-12% no uso de diesel",
    url: "https://www.otempo.com.br/economia/2026/6/17/ia-avanca-no-agronegocio-com-ferramentas-que-enxergam-alem-do-olho-humano",
  },
];
