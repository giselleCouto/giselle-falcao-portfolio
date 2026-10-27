// Registro central dos cursos da plataforma.
// Para adicionar um curso: crie o arquivo <slug>.ts nesta pasta e importe aqui.

import type { Course } from "./types";
import { fundamentosCienciaDeDados } from "./fundamentos-ciencia-de-dados";
import { fundamentosMl } from "./fundamentos-ml";
import { analiseDadosEstrategica } from "./analise-dados-estrategica";
import { estatisticaPadroes } from "./estatistica-padroes";
import { daQueryAoModelo } from "./da-query-ao-modelo";
import { empreendedorismoIa } from "./empreendedorismo-ia";
import { iaNaPratica } from "./ia-na-pratica";
import { agentesIa } from "./agentes-ia";
import { ensinarAvaliacaoMlopsLlmops } from "./ensinar-avaliacao-mlops-llmops";
// Programas para empresas (publico: "empresas")
import { solucoesDadosIaLideres } from "./solucoes-dados-ia-lideres";
import { iaGenerativaNoTrabalho } from "./ia-generativa-no-trabalho";
import { agentesIaLideres } from "./agentes-ia-lideres";
import { decisoesOrientadasPorDados } from "./decisoes-orientadas-por-dados";
import { iaDeProducaoTimesDados } from "./ia-de-producao-times-dados";

export const courses: Course[] = [
  fundamentosCienciaDeDados,
  fundamentosMl,
  analiseDadosEstrategica,
  daQueryAoModelo,
  empreendedorismoIa,
  estatisticaPadroes,
  iaNaPratica,
  agentesIa,
  ensinarAvaliacaoMlopsLlmops,
  solucoesDadosIaLideres,
  iaGenerativaNoTrabalho,
  agentesIaLideres,
  decisoesOrientadasPorDados,
  iaDeProducaoTimesDados,
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}
