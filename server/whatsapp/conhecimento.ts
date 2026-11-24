// Fatos do atendimento no WhatsApp (preços, cupons, links e datas) e montagem
// do prompt do agente a partir de base-de-conhecimento.md.
//
// Preços, cupons e links NÃO são digitados aqui: vêm dos mesmos arquivos das
// páginas de vendas (ninguemNasceFluenteData.ts, mbaData.ts e
// doDadoAoValorData.ts). Se o site mudar, o WhatsApp muda junto.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  CUPOM_PRIMEIRA_TURMA,
  LINKS_INSCRICAO,
  condicaoPrimeiraTurmaAtiva,
  inscricoesAbertas,
  niveis,
  turma,
  type NivelId,
} from "../../client/src/lib/ninguemNasceFluenteData";
import { mba } from "../../client/src/lib/mbaData";
import { doDadoAoValor } from "../../client/src/lib/doDadoAoValorData";

export type CursoId = "fluente" | "extensao" | "mba";
export type Fase = "primeira_turma" | "regular" | "inscricoes_encerradas";

export const SITE = "https://www.coutofalcao.com";
/** Origem dos links que o agente manda (vira utm_source no checkout e no registro de estudantes). */
export const UTM_AGENTE = { utm_source: "whatsapp", utm_campaign: "atendimento-whatsapp" } as const;

const NIVEL_DO_CURSO: Record<CursoId, NivelId> = { fluente: 1, extensao: 2, mba: 3 };
const PAGINA: Record<CursoId, string> = {
  fluente: "/nivel/whatsapp",
  extensao: "/do-dado-ao-valor/whatsapp",
  mba: "/mba/whatsapp",
};
export const TESTE_DE_NIVEL = `${SITE}/nivel/whatsapp`;

export type Valor = { avista: string; parcelado: string; avistaCentavos: number; parcelaCentavos: number };

export type CursoFato = {
  id: CursoId;
  nivel: NivelId;
  nome: string;
  tipo: string;
  cupom: string | null;
  desconto: string | null;
  descontoCentavos: number | null;
  primeiraTurma: Valor;
  regular: Valor;
  /** Preço que vale na data consultada. */
  hoje: Valor;
  /** Cupom que vale na data consultada (null depois de 12/12/2026). */
  cupomHoje: string | null;
  /** Link de inscrição que o agente pode mandar hoje (null depois de 22/01/2027). */
  linkInscricao: string | null;
  pagina: string;
  certificado: string;
  paraQuem: string;
};

export type Fatos = {
  fase: Fase;
  condicaoAtiva: boolean;
  inscricoesAbertas: boolean;
  cursos: Record<CursoId, CursoFato>;
  testeDeNivel: string;
  /** Datas que o agente pode citar (dd/mm/aaaa). */
  datas: string[];
};

/** "R$ 1.750" / "12× de R$ 620,01" → centavos do primeiro valor em reais do texto. */
export function centavosDoTexto(texto: string): number {
  const m = texto.match(/R\$\s*([\d.]+(?:,\d{1,2})?)/);
  if (!m) throw new Error(`Sem valor em reais em "${texto}"`);
  return reaisParaCentavos(m[1]);
}

/** "1.750" → 175000; "24,50" → 2450; "6.200,00" → 620000. */
export function reaisParaCentavos(numero: string): number {
  const [inteiro, decimal = ""] = numero.split(",");
  const reais = Number(inteiro.replace(/\./g, ""));
  const centavos = Number((decimal + "00").slice(0, 2));
  return reais * 100 + centavos;
}

export function formatarReais(centavos: number): string {
  const reais = Math.floor(centavos / 100);
  const resto = centavos % 100;
  const inteiro = reais.toLocaleString("pt-BR");
  return resto ? `R$ ${inteiro},${String(resto).padStart(2, "0")}` : `R$ ${inteiro}`;
}

function valor(p: { avista: string; parcelado: string }): Valor {
  return {
    avista: p.avista,
    parcelado: p.parcelado,
    avistaCentavos: centavosDoTexto(p.avista),
    parcelaCentavos: centavosDoTexto(p.parcelado),
  };
}

export function faseDoDia(agora: number): Fase {
  if (!inscricoesAbertas(agora)) return "inscricoes_encerradas";
  return condicaoPrimeiraTurmaAtiva(agora) ? "primeira_turma" : "regular";
}

function linkDeInscricao(id: CursoId, comCupom: boolean): string | null {
  const nivel = NIVEL_DO_CURSO[id];
  const base = LINKS_INSCRICAO[nivel];
  if (!base) return null;
  const url = new URL(base);
  const cupom = CUPOM_PRIMEIRA_TURMA[nivel];
  if (comCupom && cupom) url.searchParams.set("cupom", cupom);
  for (const [k, v] of Object.entries(UTM_AGENTE)) url.searchParams.set(k, v);
  return url.toString();
}

/** Tudo o que o agente pode afirmar sobre preço, cupom, link e data em um dado momento. */
export function fatosDoDia(agora = Date.now()): Fatos {
  const fase = faseDoDia(agora);
  const condicaoAtiva = fase === "primeira_turma";
  const abertas = fase !== "inscricoes_encerradas";

  const cursos = {} as Record<CursoId, CursoFato>;
  for (const id of Object.keys(NIVEL_DO_CURSO) as CursoId[]) {
    const n = niveis[NIVEL_DO_CURSO[id] - 1];
    const primeiraTurma = valor(n.precos.primeiraTurma);
    const regular = valor(n.precos.regular);
    const cupom = CUPOM_PRIMEIRA_TURMA[n.id] ?? null;
    const descontoCentavos = cupom ? regular.avistaCentavos - primeiraTurma.avistaCentavos : null;
    cursos[id] = {
      id,
      nivel: n.id,
      nome: n.curso,
      tipo: n.tipo,
      cupom,
      desconto: descontoCentavos ? formatarReais(descontoCentavos) : null,
      descontoCentavos,
      primeiraTurma,
      regular,
      hoje: condicaoAtiva ? primeiraTurma : regular,
      cupomHoje: condicaoAtiva ? cupom : null,
      linkInscricao: abertas ? linkDeInscricao(id, condicaoAtiva) : null,
      pagina: `${SITE}${PAGINA[id]}`,
      certificado: n.certificado,
      paraQuem: n.paraQuem,
    };
  }

  return {
    fase,
    condicaoAtiva,
    inscricoesAbertas: abertas,
    cursos,
    testeDeNivel: TESTE_DE_NIVEL,
    datas: [turma.fimCondicao, turma.inicioRegular, turma.fimInscricoes, turma.inicio],
  };
}

// ------------------------------------------------------------ blocos do prompt

function blocoDatas(f: Fatos): string {
  return [
    `- Condição de primeira turma: até ${turma.fimCondicao}, às 23h59 (horário de Brasília). Depois disso ela não reabre. ${
      f.condicaoAtiva ? "Hoje ela VALE." : `Hoje ela JÁ TERMINOU (desde ${turma.inicioRegular} vale o valor regular).`
    }`,
    `- Inscrições da Turma 01: até ${turma.fimInscricoes}. ${f.inscricoesAbertas ? "Hoje estão ABERTAS." : "Hoje já estão ENCERRADAS."}`,
    `- Início das aulas dos três cursos: ${turma.inicio}.`,
  ].join("\n");
}

function blocoPrecos(f: Fatos): string {
  const linhas: string[] = [];
  if (f.fase === "primeira_turma") {
    linhas.push(`Hoje vale a condição de primeira turma (até ${turma.fimCondicao}).`);
  } else if (f.fase === "regular") {
    linhas.push(
      `A condição de primeira turma terminou em ${turma.fimCondicao} e não reabre. Hoje não existe nenhum cupom válido: passe só o valor regular.`
    );
  } else {
    linhas.push(
      `As inscrições da Turma 01 encerraram em ${turma.fimInscricoes}. Não mande links de inscrição. Se a pessoa quiser se inscrever, perguntar de próximas turmas ou de entrar depois do início, passe para a Giselle (categoria "nao_sei"). Os valores abaixo são só referência do valor regular.`
    );
  }
  for (const c of Object.values(f.cursos)) {
    linhas.push("", `*${c.nome}* (${c.tipo})`);
    if (f.fase === "primeira_turma" && c.cupom) {
      linhas.push(
        `- Hoje: ${c.primeiraTurma.avista} à vista ou ${c.primeiraTurma.parcelado} no cartão, com o cupom ${c.cupom} (${c.desconto} de desconto sobre o valor regular).`,
        `- Valor regular (sem o cupom, e o que vale a partir de ${turma.inicioRegular}): ${c.regular.avista} à vista ou ${c.regular.parcelado}.`
      );
    } else {
      linhas.push(`- Valor: ${c.regular.avista} à vista ou ${c.regular.parcelado} no cartão.`);
    }
    if (c.linkInscricao) {
      linhas.push(
        `- Link de inscrição${f.fase === "primeira_turma" ? " (o cupom já vai dentro do link)" : ""}: ${c.linkInscricao}`
      );
    }
    linhas.push(`- Página do curso: ${c.pagina}`);
  }
  linhas.push("", `Teste de nível (5 perguntas, indica por qual curso começar): ${f.testeDeNivel}`);
  linhas.push("", "Use os links exatamente como estão acima, sem mudar nenhum caractere.");
  return linhas.join("\n");
}

/** Tira "Dra."/"Doutora" da Giselle (o título não se aplica; ver base-de-conhecimento.md). */
function semTituloDeDoutora(texto: string): string {
  return texto
    .replace(/Profa?\.\s*Dra?\.\s*Giselle/g, "Giselle")
    .replace(/Doutora\s*·\s*/g, "");
}

function blocoCursos(): string {
  const fluente = niveis[0];
  const ext = doDadoAoValor;
  const linhas: string[] = [];

  linhas.push(
    `## Nível 1 · ${fluente.curso} (${fluente.tipo})`,
    `- O que é: curso livre, a versão completa da série gratuita Fluente em IA. 7 módulos, 40 aulas, 10 h no total.`,
    `- A pessoa sai sabendo: ${fluente.saiSabendo}`,
    ...fluente.detalhes.map((d) => `- ${d}`),
    `- Para quem: ${fluente.paraQuem} Para quem usa IA no trabalho e quer usar com segurança.`,
    `- Certificado: ${fluente.certificado}`,
    `- Frase que parece com quem é do nível 1: "${fluente.frase}"`,
    ""
  );

  linhas.push(
    `## Nível 2 · ${ext.nomeCompleto} (curso de extensão universitária)`,
    `- O que é: ${ext.sub}`,
    `- Fatos: ${ext.fatos.join(" · ")}`,
    `- Módulos: ${ext.modulos.map((m) => `${m.n}. ${m.titulo}`).join("; ")}.`,
    `- Entregável: ${ext.canvas.nome}. ${ext.canvas.texto}`,
    `- Inclui: ${ext.inclui.join("; ")}.`,
    `- Bônus: ${ext.bonus.map((b) => `${b.titulo} (${b.texto})`).join("; ")}`,
    `- Para quem: ${ext.paraQuem.map((p) => `${p.titulo} ${p.texto}`).join(" ")}`,
    `- Certificado: ${ext.certificado}`,
    `- Nota legal: ${ext.notaLegal}`,
    `- Frase que parece com quem é do nível 2: "${niveis[1].frase}"`,
    `- Perguntas frequentes:`,
    ...ext.faq.map((f) => `  - ${f.q} ${f.a}`),
    ""
  );

  linhas.push(
    `## Nível 3 · ${mba.nome} (MBA Executivo, pós-graduação lato sensu)`,
    `- O que é: ${mba.sub}`,
    `- Fatos: ${mba.fatos.join(" · ")}`,
    `- Disciplinas (uma nova abre a cada mês): ${mba.disciplinas
      .map((d) => `${d.n}. ${d.titulo} (${d.horas}${d.anhanguera ? ", docentes da Anhanguera" : ""})`)
      .join("; ")}.`,
    `- Entregável final: ${mba.blueprint.nome}. ${mba.blueprint.texto} Partes: ${mba.blueprint.partes.join("; ")}.`,
    `- Como é estudar: ${mba.comoEstudar.map((c) => `${c.titulo}: ${c.texto}`).join(" ")}`,
    `- Ritmo: ${mba.ritmo}`,
    `- Para quem: ${mba.paraQuem.join("; ")}.`,
    `- Não é para: ${mba.naoEPara.join(" ")}`,
    `- Corpo docente: ${mba.docentes
      .map((d) => `${semTituloDeDoutora(d.nome)} (${semTituloDeDoutora(d.titulo)}: ${d.disciplinas})`)
      .join("; ")}.`,
    `- Certificado: ${mba.certificado}`,
    `- Nota legal: ${mba.notaLegal}`,
    `- Frase que parece com quem é do nível 3: "${niveis[2].frase}"`,
    `- Perguntas frequentes:`,
    ...mba.faq.map((f) => `  - ${f.q} ${f.a}`)
  );

  return linhas.join("\n");
}

// --------------------------------------------------------- arquivo editável

const NOME_BASE = "base-de-conhecimento.md";

function caminhoDaBase(): string {
  const candidatos = [
    path.resolve(process.cwd(), "server", "whatsapp", NOME_BASE),
    (() => {
      try {
        return path.resolve(path.dirname(fileURLToPath(import.meta.url)), NOME_BASE);
      } catch {
        return "";
      }
    })(),
    (() => {
      try {
        // no build (dist/index.js), o arquivo continua em server/whatsapp/
        return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "server", "whatsapp", NOME_BASE);
      } catch {
        return "";
      }
    })(),
  ].filter(Boolean);
  const achado = candidatos.find((c) => fs.existsSync(c));
  if (!achado) throw new Error(`base-de-conhecimento.md não encontrada (procurei em ${candidatos.join(", ")})`);
  return achado;
}

let baseEmCache: string | null = null;

export function lerBaseDeConhecimento(): string {
  baseEmCache ??= fs.readFileSync(caminhoDaBase(), "utf8");
  return baseEmCache;
}

/**
 * Prompt de sistema do agente para a data consultada. Muda só quando a fase
 * muda (12/12/2026 e 22/01/2027), o que mantém o cache de prompt do Claude.
 */
export function montarPromptDoSistema(agora = Date.now(), base = lerBaseDeConhecimento()): string {
  const f = fatosDoDia(agora);
  const texto = base
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace("{{DATAS}}", blocoDatas(f))
    .replace("{{PRECOS_E_LINKS}}", blocoPrecos(f))
    .replace("{{CURSOS}}", blocoCursos())
    .trim();
  const faltando = texto.match(/\{\{[A-Z_]+\}\}/g);
  if (faltando) throw new Error(`Marcador sem valor na base de conhecimento: ${faltando.join(", ")}`);
  return texto;
}

// ------------------------------------------------------------- relógio

const DIAS = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];

/** Data e hora em Brasília (America/Sao_Paulo). */
export function relogioBrasilia(agora = Date.now()) {
  const partes = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      weekday: "short",
    })
      .formatToParts(new Date(agora))
      .map((p) => [p.type, p.value])
  );
  const diaSemana = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(partes.weekday);
  const hora = Number(partes.hour);
  const minuto = Number(partes.minute);
  return {
    data: `${partes.day}/${partes.month}/${partes.year}`,
    hora: `${partes.hour}:${partes.minute}`,
    diaSemana,
    nomeDia: DIAS[diaSemana],
    /** Seg–sex, das 8h às 18h: horário em que a Giselle responde. */
    horarioDaGiselle: diaSemana >= 1 && diaSemana <= 5 && hora >= 8 && (hora < 18 || (hora === 18 && minuto === 0)),
  };
}
