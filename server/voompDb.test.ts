import { readFileSync } from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { ALTER_DOCUMENTO, DDL_ACADEMICO, DDL_VOOMP } from "./voompDb";

const comandos = (arquivo: string) =>
  readFileSync(path.resolve(import.meta.dirname, "../drizzle", arquivo), "utf-8")
    .split("--> statement-breakpoint")
    .map((c) => c.trim());

describe("tabelas do registro de estudantes", () => {
  it("o servidor cria as tabelas com o mesmo SQL da migração 0017", () => {
    expect(DDL_VOOMP.map((c) => c.trim())).toEqual(comandos("0017_confused_speed_demon.sql"));
    expect(DDL_VOOMP.every((c) => c.startsWith("CREATE TABLE IF NOT EXISTS"))).toBe(true);
  });

  it("vida acadêmica e CPF cifrado seguem a migração 0018", () => {
    expect([DDL_ACADEMICO.trim(), ALTER_DOCUMENTO]).toEqual(comandos("0018_parched_celestials.sql"));
    expect(DDL_ACADEMICO.startsWith("CREATE TABLE IF NOT EXISTS")).toBe(true);
  });
});
