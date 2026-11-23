// Importação do relatório de progresso (/painel/estudantes → Acompanhamento).
// Aceita o CSV exportado do Voomp Play, da Anhanguera ou uma planilha própria
// (ou o conteúdo colado do Excel). Primeiro confere sem gravar; depois grava.

import { useMemo, useState } from "react";
import { CheckCircle2, FileUp, Upload } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { ROTULO_CAMPO, lerPlanilha, mapearColunas } from "@shared/academico";
import { CURSOS_VOOMP } from "@shared/voomp";
import type { ResultadoImportacao } from "./estudantesUtil";

const ROTULO_RESULTADO = {
  atualizada: { texto: "vai atualizar", cor: "#0f9d8f" },
  sem_mudanca: { texto: "sem mudança", cor: "#64748b" },
  nao_encontrada: { texto: "não achei no curso", cor: "#be123c" },
  nao_matriculada: { texto: "inscrição não paga", cor: "#b45309" },
  ambigua: { texto: "repetida ou ambígua", cor: "#c2410c" },
} as const;

/** Lê o arquivo em UTF-8 e, se vier com acento quebrado (CSV do Excel), em Windows-1252. */
async function lerArquivo(arquivo: File) {
  const bytes = await arquivo.arrayBuffer();
  const utf8 = new TextDecoder("utf-8").decode(bytes);
  return utf8.includes("�") ? new TextDecoder("windows-1252").decode(bytes) : utf8;
}

export default function GiselleEstudantesImportar({ token, onImportado }: { token: string; onImportado: () => void }) {
  const [productId, setProductId] = useState<string>("");
  const [texto, setTexto] = useState("");
  const [nomeArquivo, setNomeArquivo] = useState<string | null>(null);
  const [conferido, setConferido] = useState<{ chave: string; resultado: ResultadoImportacao } | null>(null);
  const [gravado, setGravado] = useState<ResultadoImportacao | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const importar = trpc.academy.importarProgresso.useMutation();

  const planilha = useMemo(() => (texto.trim() ? lerPlanilha(texto) : null), [texto]);
  const colunas = useMemo(() => (planilha ? mapearColunas(planilha.cabecalhos) : []), [planilha]);
  const chave = `${productId}|${texto}`;
  const pronto = Boolean(productId && planilha && planilha.linhas.length > 0);

  const enviar = async (simular: boolean) => {
    if (!planilha || !productId) return;
    setErro(null);
    try {
      const r = await importar.mutateAsync({ token, productId, cabecalhos: planilha.cabecalhos, linhas: planilha.linhas, simular });
      if (!r.ok) {
        setErro(r.erro);
        return;
      }
      if (simular) {
        setConferido({ chave, resultado: r });
        setGravado(null);
      } else {
        setGravado(r);
        setConferido(null);
        onImportado();
      }
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Não consegui importar.");
    }
  };

  const mostrado = gravado ?? conferido?.resultado ?? null;
  const resultadoOk = mostrado && mostrado.ok ? mostrado : null;

  return (
    <div className="space-y-4 text-sm">
      <p className="text-xs leading-relaxed text-slate-500">
        Exporte o relatório de progresso dos alunos (Voomp Play → relatórios do curso, ou a planilha da Anhanguera) em CSV e
        escolha o arquivo, ou copie as linhas do Excel e cole abaixo. A planilha precisa de uma coluna de <b>e-mail</b>,
        matrícula, RA ou CPF; as colunas de progresso (%), aulas concluídas, último acesso, data de conclusão e situação
        (aprovado/concluído) são lidas se existirem. Nada é gravado antes de você conferir.
      </p>

      <div className="flex flex-col gap-2 sm:flex-row">
        <select
          value={productId}
          onChange={(e) => {
            setProductId(e.target.value);
            setConferido(null);
          }}
          aria-label="Curso do relatório"
          className="rounded-2xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-semibold focus:border-[#8b5cf6] focus:outline-none"
        >
          <option value="">De qual curso é o relatório?</option>
          {Object.entries(CURSOS_VOOMP).map(([id, c]) => (
            <option key={id} value={id}>
              {c.nome}
            </option>
          ))}
        </select>
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 px-4 py-2 text-xs font-bold text-slate-500 hover:border-[#8b5cf6] hover:text-[#6b21a8]">
          <FileUp className="size-4" />
          {nomeArquivo ?? "Escolher arquivo CSV"}
          <input
            type="file"
            accept=".csv,.tsv,.txt,text/csv,text/plain"
            className="sr-only"
            onChange={async (e) => {
              const arquivo = e.target.files?.[0];
              if (!arquivo) return;
              setNomeArquivo(arquivo.name);
              setTexto(await lerArquivo(arquivo));
              setConferido(null);
              setGravado(null);
            }}
          />
        </label>
      </div>

      <textarea
        value={texto}
        onChange={(e) => {
          setTexto(e.target.value);
          setNomeArquivo(null);
          setConferido(null);
          setGravado(null);
        }}
        placeholder={"ou cole aqui (com a linha de títulos)\nE-mail;Progresso;Último acesso\nmaria@exemplo.com;45%;20/03/2027"}
        aria-label="Conteúdo da planilha"
        className="min-h-[96px] w-full rounded-2xl border-2 border-slate-200 px-3 py-2 font-mono text-xs focus:border-[#8b5cf6] focus:outline-none"
      />

      {planilha ? (
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          <span className="font-bold text-slate-500">{planilha.linhas.length} linha(s) · colunas:</span>
          {planilha.cabecalhos.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className={`rounded-full px-2 py-0.5 font-semibold ${colunas[i] ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-400"}`}
              title={colunas[i] ? `lida como ${ROTULO_CAMPO[colunas[i]!]}` : "ignorada"}
            >
              {c || "(sem título)"}
              {colunas[i] ? ` → ${ROTULO_CAMPO[colunas[i]!]}` : ""}
            </span>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={!pronto || importar.isPending}
          onClick={() => void enviar(true)}
          className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-[#1a1333] hover:bg-violet-100 disabled:opacity-40"
        >
          {importar.isPending && !conferido ? "Conferindo…" : "Conferir (sem gravar)"}
        </button>
        <button
          type="button"
          disabled={!pronto || importar.isPending || conferido?.chave !== chave}
          onClick={() => void enviar(false)}
          className="flex items-center gap-1.5 rounded-full bg-[#1a1333] px-4 py-2 text-xs font-bold text-white hover:bg-[#6b21a8] disabled:opacity-40"
        >
          <Upload className="size-3.5" />
          Gravar importação
        </button>
        {!productId && planilha ? <span className="text-xs text-amber-700">Escolha o curso do relatório.</span> : null}
      </div>

      {erro ? <p className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">{erro}</p> : null}

      {resultadoOk ? (
        <div className="rounded-2xl border border-slate-200/70 p-3">
          <p className="flex items-center gap-1.5 text-xs font-bold">
            {gravado ? <CheckCircle2 className="size-4 text-emerald-600" /> : null}
            {gravado ? "Importação gravada" : "Conferência (nada gravado ainda)"}: {resultadoOk.totais.atualizadas} para atualizar ·{" "}
            {resultadoOk.totais.semMudanca} sem mudança · {resultadoOk.totais.concluiramAgora} concluíram ·{" "}
            {resultadoOk.totais.naoEncontradas} não achados · {resultadoOk.totais.naoMatriculadas} sem inscrição paga ·{" "}
            {resultadoOk.totais.ambiguas} repetidos
          </p>
          <div className="mt-2 max-h-72 overflow-auto">
            <table className="w-full min-w-[560px] text-xs">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-[0.1em] text-slate-400">
                  <th className="pb-1">Linha</th>
                  <th className="pb-1">E-mail / matrícula</th>
                  <th className="pb-1">Nome</th>
                  <th className="pb-1 text-right">Progresso</th>
                  <th className="pb-1">Resultado</th>
                </tr>
              </thead>
              <tbody>
                {resultadoOk.resultados
                  .slice()
                  .sort((a, b) => (a.resultado === "atualizada" ? 1 : 0) - (b.resultado === "atualizada" ? 1 : 0))
                  .slice(0, 300)
                  .map((r) => (
                    <tr key={r.linha} className="border-t border-slate-100">
                      <td className="py-1 tabular-nums text-slate-400">{r.linha}</td>
                      <td className="py-1">{r.email ?? r.matricula ?? "—"}</td>
                      <td className="py-1">{r.nome ?? ""}</td>
                      <td className="py-1 text-right tabular-nums">
                        {r.progressoAntes !== null && r.progressoAntes !== r.progressoDepois ? `${r.progressoAntes}% → ` : ""}
                        {r.progressoDepois !== null ? `${r.progressoDepois}%` : "—"}
                      </td>
                      <td className="py-1 font-bold" style={{ color: ROTULO_RESULTADO[r.resultado].cor }}>
                        {ROTULO_RESULTADO[r.resultado].texto}
                        {r.concluiuAgora ? " · concluiu" : ""}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}
