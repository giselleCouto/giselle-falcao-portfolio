import { useCallback, useEffect, useMemo, useState } from "react";
import type { Course } from "./types";

// Gamificação client-side: progresso por curso persistido em localStorage.
// XP: +10 por aula concluída, +25 por quiz do módulo com nota >= 70%.

export const XP_PER_LESSON = 10;
export const XP_PER_QUIZ = 25;
export const QUIZ_PASS_PERCENT = 70;

export type CourseProgressState = {
  completedLessons: string[];
  quizScores: Record<string, number>;
};

export type LevelInfo = {
  name: string;
  emoji: string;
  min: number;
  next: number | null;
};

export const LEVELS: LevelInfo[] = [
  { name: "Explorador(a)", emoji: "🧭", min: 0, next: 100 },
  { name: "Praticante", emoji: "⚡", min: 100, next: 250 },
  { name: "Especialista", emoji: "🏆", min: 250, next: null },
];

export function lessonKey(moduleId: string, lessonIndex: number) {
  return `${moduleId}::${lessonIndex}`;
}

function storageKey(slug: string) {
  return `gf-academy-progress-${slug}`;
}

function loadState(slug: string): CourseProgressState {
  if (typeof window === "undefined") return { completedLessons: [], quizScores: {} };
  try {
    const raw = window.localStorage.getItem(storageKey(slug));
    if (!raw) return { completedLessons: [], quizScores: {} };
    const parsed = JSON.parse(raw) as CourseProgressState;
    return {
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      quizScores: parsed.quizScores && typeof parsed.quizScores === "object" ? parsed.quizScores : {},
    };
  } catch {
    return { completedLessons: [], quizScores: {} };
  }
}

export function levelForXp(xp: number): LevelInfo {
  return [...LEVELS].reverse().find((l) => xp >= l.min) ?? LEVELS[0];
}

/** Leitura síncrona do % concluído (para os cards do catálogo). */
export function readCoursePercent(course: Course): number {
  const state = loadState(course.slug);
  const done = new Set(state.completedLessons);
  let total = 0;
  let complete = 0;
  for (const mod of course.modules) {
    total += mod.lessons.length;
    mod.lessons.forEach((_, i) => {
      if (done.has(lessonKey(mod.id, i))) complete += 1;
    });
  }
  return total === 0 ? 0 : Math.round((complete / total) * 100);
}

export function useCourseProgress(course: Course) {
  const [state, setState] = useState<CourseProgressState>(() => loadState(course.slug));

  useEffect(() => {
    setState(loadState(course.slug));
  }, [course.slug]);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey(course.slug), JSON.stringify(state));
    } catch {
      // armazenamento indisponível (modo privado): gamificação segue em memória
    }
  }, [course.slug, state]);

  const completedSet = useMemo(() => new Set(state.completedLessons), [state.completedLessons]);

  const isLessonComplete = useCallback(
    (moduleId: string, lessonIndex: number) => completedSet.has(lessonKey(moduleId, lessonIndex)),
    [completedSet],
  );

  const markLessonComplete = useCallback((moduleId: string, lessonIndex: number) => {
    setState((current) => {
      const key = lessonKey(moduleId, lessonIndex);
      if (current.completedLessons.includes(key)) return current;
      return { ...current, completedLessons: [...current.completedLessons, key] };
    });
  }, []);

  const registerQuizScore = useCallback((moduleId: string, percent: number) => {
    setState((current) => {
      const best = current.quizScores[moduleId] ?? 0;
      if (percent <= best) return current;
      return { ...current, quizScores: { ...current.quizScores, [moduleId]: percent } };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setState({ completedLessons: [], quizScores: {} });
  }, []);

  const derived = useMemo(() => {
    let lessonsDone = 0;
    let totalLessons = 0;
    const moduleProgress: Record<string, { done: number; total: number; percent: number; badge: boolean }> = {};

    for (const mod of course.modules) {
      const total = mod.lessons.length;
      let done = 0;
      mod.lessons.forEach((_, i) => {
        if (completedSet.has(lessonKey(mod.id, i))) done += 1;
      });
      const quizOk = !mod.quiz || (state.quizScores[mod.id] ?? 0) >= QUIZ_PASS_PERCENT;
      moduleProgress[mod.id] = {
        done,
        total,
        percent: total === 0 ? 0 : Math.round((done / total) * 100),
        badge: total > 0 && done === total && quizOk,
      };
      lessonsDone += done;
      totalLessons += total;
    }

    const quizXp = Object.entries(state.quizScores).filter(([, p]) => p >= QUIZ_PASS_PERCENT).length * XP_PER_QUIZ;
    const xp = lessonsDone * XP_PER_LESSON + quizXp;
    const level = levelForXp(xp);
    const badges = Object.values(moduleProgress).filter((m) => m.badge).length;
    const coursePercent = totalLessons === 0 ? 0 : Math.round((lessonsDone / totalLessons) * 100);

    return { xp, level, badges, coursePercent, moduleProgress, lessonsDone, totalLessons };
  }, [course.modules, completedSet, state.quizScores]);

  return {
    ...derived,
    quizScores: state.quizScores,
    isLessonComplete,
    markLessonComplete,
    registerQuizScore,
    resetProgress,
  };
}
