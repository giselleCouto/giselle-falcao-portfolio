// Avalia as respostas críticas do agente do WhatsApp com o Claude de verdade.
// Uso: ANTHROPIC_API_KEY=... pnpm whatsapp:avaliar
// (o mesmo teste roda no painel /painel/whatsapp, com a chave do Railway)

import "dotenv/config";
import { clienteClaudePadrao } from "../server/whatsapp/agente";
import { avaliar } from "../server/whatsapp/avaliacao";

const claude = clienteClaudePadrao();
if (!claude) {
  console.error("Falta ANTHROPIC_API_KEY no ambiente.");
  process.exit(1);
}

const { passaram, total, resultados } = await avaliar(claude, {
  modelo: process.env.WHATSAPP_MODELO || undefined,
  esforco: (process.env.WHATSAPP_ESFORCO as "low" | "medium" | "high" | undefined) || undefined,
});
for (const r of resultados) {
  console.log(`${r.passou ? "✓" : "✗"} ${r.nome} → ${r.tipo}${r.categoria ? ` (${r.categoria})` : ""}`);
  if (!r.passou) console.log(`   ${r.problemas.join("; ")}\n   ${r.texto.replace(/\n/g, "\n   ")}`);
}
console.log(`\n${passaram}/${total} cenários passaram.`);
process.exit(passaram === total ? 0 : 1);
