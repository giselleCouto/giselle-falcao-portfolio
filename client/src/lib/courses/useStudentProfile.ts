import { useCallback, useState } from "react";

// Perfil do aluno salvo no navegador após o cadastro gratuito.
// O cadastro em si vai para o banco (tabela academy_students) via tRPC.

export type StudentProfile = {
  name: string;
  email: string;
  registeredAt: string;
};

const STORAGE_KEY = "gf-academy-student";

function loadProfile(): StudentProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StudentProfile;
    return parsed && parsed.email ? parsed : null;
  } catch {
    return null;
  }
}

export function useStudentProfile() {
  const [profile, setProfile] = useState<StudentProfile | null>(() => loadProfile());

  const saveProfile = useCallback((data: { name: string; email: string }) => {
    const next: StudentProfile = {
      name: data.name,
      email: data.email,
      registeredAt: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // modo privado: segue em memória
    }
    setProfile(next);
  }, []);

  return { profile, saveProfile };
}
