// Registro central dos cursos da plataforma.
// Para adicionar um curso: crie o arquivo <slug>.ts nesta pasta e importe aqui.

import type { Course } from "./types";
import { fundamentosMl } from "./fundamentos-ml";
import { analiseDadosEstrategica } from "./analise-dados-estrategica";
import { iaNaPratica } from "./ia-na-pratica";
import { agentesIa } from "./agentes-ia";

export const courses: Course[] = [
  iaNaPratica,
  fundamentosMl,
  agentesIa,
  analiseDadosEstrategica,
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}
