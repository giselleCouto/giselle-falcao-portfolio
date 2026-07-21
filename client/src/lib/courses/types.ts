// Modelo de dados da plataforma de cursos.
// Cada curso vive em um arquivo próprio nesta pasta (ex: fundamentos-ml.ts).
// A Giselle edita os campos videoUrl / slidesUrl / practiceUrl conforme grava
// as aulas e publica os materiais — ver docs/cursos/GUIA-DA-PROFESSORA.md.

export type LessonType = "video" | "leitura" | "pratica" | "quiz" | "podcast";

export type Lesson = {
  title: string;
  type: LessonType;
  duration: string;
  summary: string;
  /** Ferramenta da prática (Colab, Google Sheets, Looker Studio...) */
  practiceTool?: string;
  /** Link da prática (notebook Colab, planilha modelo...) — null = em preparação */
  practiceUrl?: string | null;
  /** Embed do YouTube (https://www.youtube.com/embed/VIDEO_ID) — null = aula ainda não gravada */
  videoUrl?: string | null;
  /** Áudio do podcast (para type = "podcast", ex.: /cursos/podcasts/arquivo.m4a) — null = em preparação */
  audioUrl?: string | null;
  /** Embed do Google Slides publicado ou PDF — null = slides ainda não publicados */
  slidesUrl?: string | null;
  /** Texto da aula (para type = "leitura"), parágrafos separados por \n\n */
  content?: string | null;
};

export type QuizQuestion = {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type CourseModule = {
  id: string;
  title: string;
  subtitle?: string;
  duration: string;
  /** Módulo acessível sem pagamento (em curso pago, o módulo 1 é amostra gratuita) */
  free: boolean;
  lessons: Lesson[];
  quiz?: QuizQuestion[];
};

export type CourseLevel = "Iniciante" | "Intermediário" | "Avançado";

export type PracticeResource = {
  title: string;
  description: string;
  tool: string;
  url: string | null;
};

export type Course = {
  slug: string;
  title: string;
  level: CourseLevel;
  hours: string;
  /** Curso inteiramente gratuito (básico) vs. pago */
  free: boolean;
  tagline: string;
  description: string;
  outcomes: string[];
  audience: string;
  prerequisites: string;
  /** "disponivel" habilita a página do curso; "em-breve" mantém só o card na vitrine */
  status: "disponivel" | "em-breve";
  modules: CourseModule[];
  /** Biblioteca de prática: recursos permanentes do curso (notebooks, datasets, modelos) */
  library: PracticeResource[];
};
