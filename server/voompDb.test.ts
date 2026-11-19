import { readFileSync } from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { DDL_VOOMP } from "./voompDb";

describe("tabelas do registro de estudantes", () => {
  it("o servidor cria as tabelas com o mesmo SQL da migração 0017", () => {
    const migracao = readFileSync(path.resolve(import.meta.dirname, "../drizzle/0017_confused_speed_demon.sql"), "utf-8");
    const comandos = migracao.split("--> statement-breakpoint").map((c) => c.trim());
    expect(DDL_VOOMP.map((c) => c.trim())).toEqual(comandos);
    expect(DDL_VOOMP.every((c) => c.startsWith("CREATE TABLE IF NOT EXISTS"))).toBe(true);
  });
});
