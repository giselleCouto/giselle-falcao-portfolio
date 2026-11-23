// CPF/CNPJ de estudantes cifrado no banco (AES-256-GCM).
//
// A chave vem de ESTUDANTES_CHAVE_CPF (qualquer texto longo; recomendado) ou,
// na falta dela, é derivada de JWT_SECRET. O prefixo diz qual chave cifrou,
// para a troca futura não deixar CPF ilegível:
//   cpf1:<base64>  → ESTUDANTES_CHAVE_CPF
//   cpf0:<base64>  → derivada de JWT_SECRET
// Sem nenhuma das duas o CPF não é gravado (nunca vai em texto aberto).

import { createCipheriv, createDecipheriv, createHash, hkdfSync, randomBytes } from "crypto";

const PREFIXOS = { dedicada: "cpf1:", derivada: "cpf0:" } as const;

function chave(tipo: keyof typeof PREFIXOS): Buffer | null {
  if (tipo === "dedicada") {
    const k = process.env.ESTUDANTES_CHAVE_CPF?.trim();
    return k ? createHash("sha256").update(k).digest() : null;
  }
  const segredo = process.env.JWT_SECRET?.trim();
  if (!segredo) return null;
  return Buffer.from(hkdfSync("sha256", segredo, "nokahi-estudantes", "cpf-v0", 32));
}

export const estaCifrado = (v: string | null | undefined) =>
  typeof v === "string" && (v.startsWith(PREFIXOS.dedicada) || v.startsWith(PREFIXOS.derivada));

/** CPF/CNPJ → texto cifrado (ou null se não houver chave configurada). */
export function cifrarDocumento(documento: string | null | undefined): string | null {
  const limpo = String(documento ?? "").trim();
  if (!limpo) return null;
  if (estaCifrado(limpo)) return limpo;
  const tipo: keyof typeof PREFIXOS = chave("dedicada") ? "dedicada" : "derivada";
  const k = chave(tipo);
  if (!k) return null;
  const iv = randomBytes(12);
  const cifra = createCipheriv("aes-256-gcm", k, iv);
  const corpo = Buffer.concat([cifra.update(limpo, "utf8"), cifra.final()]);
  return PREFIXOS[tipo] + Buffer.concat([iv, cifra.getAuthTag(), corpo]).toString("base64");
}

/** Texto cifrado → CPF/CNPJ. Valor antigo em texto aberto volta como está. */
export function decifrarDocumento(valor: string | null | undefined): string | null {
  if (!valor) return null;
  if (!estaCifrado(valor)) return valor;
  const tipo: keyof typeof PREFIXOS = valor.startsWith(PREFIXOS.dedicada) ? "dedicada" : "derivada";
  const k = chave(tipo);
  if (!k) return null;
  try {
    const bruto = Buffer.from(valor.slice(PREFIXOS[tipo].length), "base64");
    const decifra = createDecipheriv("aes-256-gcm", k, bruto.subarray(0, 12));
    decifra.setAuthTag(bruto.subarray(12, 28));
    return Buffer.concat([decifra.update(bruto.subarray(28)), decifra.final()]).toString("utf8");
  } catch {
    return null; // chave trocada ou valor corrompido
  }
}

/** Só o miolo do CPF aparece na lista do painel: •••.456.789-•• */
export function mascararDocumento(documento: string | null | undefined): string | null {
  const d = String(documento ?? "").replace(/\D/g, "");
  if (d.length === 11) return `•••.${d.slice(3, 6)}.${d.slice(6, 9)}-••`;
  if (d.length === 14) return `••.${d.slice(2, 5)}.${d.slice(5, 8)}/••••-••`;
  return d ? "•••" : null;
}

const CHAVES_DOCUMENTO = /^(document|documento|cpf|cpf_cnpj|cnpj|doc|tax_id|taxid)$/i;

/**
 * Cópia do aviso da Voomp sem o CPF (vai para voomp_eventos, que guarda o
 * corpo para conferência). Troca o valor de qualquer chave de documento pela
 * versão mascarada, em qualquer nível do objeto.
 */
export function ocultarDocumentos(corpo: unknown): unknown {
  if (Array.isArray(corpo)) return corpo.map(ocultarDocumentos);
  if (typeof corpo !== "object" || corpo === null) return corpo;
  return Object.fromEntries(
    Object.entries(corpo as Record<string, unknown>).map(([k, v]) => [
      k,
      CHAVES_DOCUMENTO.test(k) && (typeof v === "string" || typeof v === "number") ? mascararDocumento(String(v)) : ocultarDocumentos(v),
    ])
  );
}
