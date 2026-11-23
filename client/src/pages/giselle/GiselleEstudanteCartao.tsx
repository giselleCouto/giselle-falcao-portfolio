// Cartão do estudante (/painel/estudantes): todos os dados da pessoa, CPF
// completo (escondido até pedir), vida acadêmica editável e avisos da Voomp.

import { useEffect, useState } from "react";
import { Eye, EyeOff, Save, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { CALENDARIO_CURSOS, calendarioDoCurso, situacaoAcademica, textoRisco } from "@shared/academico";
import { cursoVoomp } from "@shared/voomp";
import {
  BarraProgresso,
  Selo,
  SeloAcademico,
  data,
  dataHora,
  linkWhatsApp,
  reais,
  statusDe,
  type FichaEstudante,
} from "./estudantesUtil";

type Formulario = {
  ra: string;
  turma: string;
  progressoPct: string;
  aprovado: "" | "sim" | "nao";
  concluido: boolean;
  cancelado: boolean;
  motivoCancelamento: string;
  observacoes: string;
};

function formularioDe(f: FichaEstudante): Formulario {
  const a = f.academico;
  return {
    ra: a?.ra ?? "",
    turma: a?.turma ?? "",
    progressoPct: a?.progressoPct === null || a?.progressoPct === undefined ? "" : String(a.progressoPct),
    aprovado: a?.aprovado === true ? "sim" : a?.aprovado === false ? "nao" : "",
    concluido: Boolean(a?.concluidoAt),
    cancelado: Boolean(a?.canceladoAt),
    motivoCancelamento: a?.motivoCancelamento ?? "",
    observacoes: a?.observacoes ?? "",
  };
}

function Linha({ rotulo, children }: { rotulo: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[130px_1fr] gap-3 border-t border-slate-100 py-2 text-sm first:border-t-0">
      <dt className="text-xs font-bold uppercase tracking-[0.08em] text-slate-400">{rotulo}</dt>
      <dd className="min-w-0 break-words">{children || <span className="text-slate-300">—</span>}</dd>
    </div>
  );
}

const campo =
  "w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#8b5cf6] focus:outline-none";

export default function GiselleEstudanteCartao({
  token,
  inscricaoId,
  onFechar,
  onSalvo,
}: {
  token: string;
  inscricaoId: number;
  onFechar: () => void;
  onSalvo: () => void;
}) {
  const query = trpc.academy.estudante.useQuery({ token, inscricaoId }, { retry: false, refetchOnWindowFocus: false });
  const salvar = trpc.academy.atualizarEstudante.useMutation();
  const [verCpf, setVerCpf] = useState(false);
  const [form, setForm] = useState<Formulario | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  useEffect(() => {
    if (query.data) setForm(formularioDe(query.data));
  }, [query.data]);

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && onFechar();
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [onFechar]);

  const ficha = query.data;
  const i = ficha?.inscricao;
  const acomp = i ? situacaoAcademica(i, ficha.academico) : null;
  const turmasDoCurso = i ? (CALENDARIO_CURSOS[i.productId]?.turmas ?? []).map((t) => t.codigo) : [];

  const gravar = async () => {
    if (!ficha || !form) return;
    const antes = formularioDe(ficha);
    const mudou = <K extends keyof Formulario>(k: K) => form[k] !== antes[k];
    const progresso = form.progressoPct.trim() === "" ? null : Math.max(0, Math.min(100, Math.round(Number(form.progressoPct))));
    if (form.progressoPct.trim() !== "" && !Number.isFinite(Number(form.progressoPct))) {
      setAviso("Progresso precisa ser um número de 0 a 100.");
      return;
    }
    try {
      await salvar.mutateAsync({
        token,
        inscricaoId,
        ...(mudou("ra") ? { ra: form.ra } : {}),
        ...(mudou("turma") ? { turma: form.turma } : {}),
        ...(mudou("progressoPct") ? { progressoPct: progresso } : {}),
        ...(mudou("aprovado") ? { aprovado: form.aprovado === "" ? null : form.aprovado === "sim" } : {}),
        ...(mudou("concluido") ? { concluido: form.concluido } : {}),
        ...(mudou("cancelado") ? { cancelado: form.cancelado } : {}),
        ...(mudou("motivoCancelamento") ? { motivoCancelamento: form.motivoCancelamento } : {}),
        ...(mudou("observacoes") ? { observacoes: form.observacoes } : {}),
      });
      setAviso("Salvo.");
      await query.refetch();
      onSalvo();
    } catch (erro) {
      setAviso(erro instanceof Error ? erro.message : "Não consegui salvar.");
    }
  };

  const wa = linkWhatsApp(i?.phone ?? null);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#1a1333]/40" role="dialog" aria-modal="true" aria-label="Cartão do estudante">
      <button type="button" aria-label="Fechar" className="absolute inset-0 cursor-default" onClick={onFechar} />
      <div className="relative h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-slate-100 bg-white px-5 py-4">
          <div className="min-w-0">
            <p className="font-mono text-xs font-bold text-[#6b21a8]">{i?.matricula ?? "sem matrícula"}</p>
            <h2 className="truncate font-baloo text-xl font-bold text-[#1a1333]">{i?.name || i?.email || "Estudante"}</h2>
            {i ? (
              <div className="mt-1 flex flex-wrap gap-1.5">
                <Selo status={statusDe(i.status)} />
                {acomp ? <SeloAcademico situacao={acomp.situacao} /> : null}
              </div>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar cartão"
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-600"
          >
            <X className="size-4" />
          </button>
        </div>

        {query.isError ? (
          <p className="p-6 text-sm text-rose-600">{query.error?.message || "Não consegui abrir o cartão."}</p>
        ) : !ficha || !i || !form ? (
          <p className="p-6 text-sm text-slate-400">Carregando…</p>
        ) : (
          <div className="space-y-6 px-5 py-5">
            <section>
              <h3 className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-[#6b21a8]">Dados pessoais</h3>
              <dl>
                <Linha rotulo="E-mail">{i.email}</Linha>
                <Linha rotulo="Telefone">
                  {i.phone ? (
                    wa ? (
                      <a href={wa} target="_blank" rel="noreferrer" className="font-semibold text-[#0f766e] underline">
                        {i.phone}
                      </a>
                    ) : (
                      i.phone
                    )
                  ) : null}
                </Linha>
                <Linha rotulo="CPF/CNPJ">
                  {i.documento ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="font-mono">{verCpf ? i.documento : "•••••••••••"}</span>
                      <button
                        type="button"
                        onClick={() => setVerCpf((v) => !v)}
                        className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500 hover:bg-violet-100"
                      >
                        {verCpf ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
                        {verCpf ? "Esconder" : "Mostrar CPF"}
                      </button>
                    </span>
                  ) : null}
                </Linha>
                <Linha rotulo="CEP">{i.zipcode}</Linha>
                <Linha rotulo="Cidade / UF">{[i.city, i.uf].filter(Boolean).join(" / ")}</Linha>
              </dl>
            </section>

            <section>
              <h3 className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-[#6b21a8]">Inscrição</h3>
              <dl>
                <Linha rotulo="Curso">{cursoVoomp(i.productId, i.productName).nome}</Linha>
                <Linha rotulo="Oferta">{i.offerName}</Linha>
                <Linha rotulo="Valor">
                  {i.amountCents !== null ? reais(i.amountCents) : null}
                  {i.method ? ` · ${i.method}` : ""}
                  {i.installments && i.installments > 1 ? ` · ${i.installments}×` : ""}
                </Linha>
                <Linha rotulo="Cupom">{i.coupon}</Linha>
                <Linha rotulo="Pago em">{dataHora(i.paidAt)}</Linha>
                <Linha rotulo="Origem">
                  {[i.utmSource, i.utmCampaign, i.utmContent].filter(Boolean).join(" · ")}
                </Linha>
                <Linha rotulo="Situação Voomp">
                  {i.statusVoomp}
                  {i.refusedReason ? ` · ${i.refusedReason}` : ""}
                </Linha>
              </dl>
            </section>

            {acomp ? (
              <section>
                <h3 className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-[#6b21a8]">Curso</h3>
                <dl>
                  <Linha rotulo="Turma">
                    {acomp.turma.codigo} · início {data(acomp.turma.inicio)}
                  </Linha>
                  <Linha rotulo="Prazo">
                    {data(acomp.turma.prazo)}
                    {` (máximo de ${calendarioDoCurso(i.productId).rotuloPrazo})`}
                    {acomp.diasAtePrazo >= 0 ? ` · faltam ${acomp.diasAtePrazo} dias` : " · prazo vencido"}
                  </Linha>
                  <Linha rotulo="Carga horária">
                    {`${String(acomp.horas.cumpridas).replace(".", ",")} de ${acomp.horas.total} h cumpridas`}
                    {acomp.horas.porSemanaNecessario !== null
                      ? ` · precisa de ${String(acomp.horas.porSemanaNecessario).replace(".", ",")} h/semana até o prazo (planejado ${String(acomp.horas.porSemanaPlanejado).replace(".", ",")})`
                      : ""}
                  </Linha>
                  {acomp.situacao === "em_risco" ? (
                    <Linha rotulo="Por que em risco">{textoRisco(acomp, ficha.academico?.progressoPct)}</Linha>
                  ) : null}
                  <Linha rotulo="Progresso">
                    <BarraProgresso valor={ficha.academico?.progressoPct} />
                    {acomp.progressoEsperado !== null && acomp.situacao !== "concluiu" ? (
                      <span className="text-xs text-slate-400">esperado hoje: {acomp.progressoEsperado}%</span>
                    ) : null}
                    {ficha.academico?.aulasTotal ? (
                      <span className="text-xs text-slate-400">
                        {ficha.academico.aulasConcluidas ?? 0} de {ficha.academico.aulasTotal} aulas
                      </span>
                    ) : null}
                  </Linha>
                  <Linha rotulo="Último avanço">
                    {[
                      dataHora(ficha.academico?.ultimoAvancoAt) || (acomp.diasSemAvanco !== null ? "nunca avançou" : ""),
                      acomp.diasSemAvanco !== null ? `${acomp.diasSemAvanco} dias sem avançar` : "",
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </Linha>
                  <Linha rotulo="Último acesso">{dataHora(ficha.academico?.ultimoAcessoAt)}</Linha>
                  <Linha rotulo="Concluiu em">{dataHora(ficha.academico?.concluidoAt)}</Linha>
                  <Linha rotulo="Atualizado">
                    {ficha.academico
                      ? `${dataHora(ficha.academico.updatedAt)} · ${ficha.academico.origem === "importacao" ? "importação" : "painel"}`
                      : null}
                  </Linha>
                </dl>
              </section>
            ) : (
              <p className="rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
                A inscrição não foi paga, então ainda não há matrícula nem acompanhamento do curso.
              </p>
            )}

            {acomp ? (
              <section className="rounded-3xl border border-slate-200/70 bg-[#f7f8fc] p-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[#6b21a8]">Editar acompanhamento</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="text-xs font-semibold text-slate-500">
                    RA (Anhanguera)
                    <input className={`${campo} mt-1`} value={form.ra} onChange={(e) => setForm({ ...form, ra: e.target.value })} />
                  </label>
                  <label className="text-xs font-semibold text-slate-500">
                    Turma
                    <input
                      className={`${campo} mt-1`}
                      list={`turmas-${inscricaoId}`}
                      placeholder={acomp.turma.codigo}
                      value={form.turma}
                      onChange={(e) => setForm({ ...form, turma: e.target.value })}
                    />
                    <datalist id={`turmas-${inscricaoId}`}>
                      {turmasDoCurso.map((t) => (
                        <option key={t} value={t} />
                      ))}
                    </datalist>
                  </label>
                  <label className="text-xs font-semibold text-slate-500">
                    Progresso (%)
                    <input
                      className={`${campo} mt-1`}
                      inputMode="numeric"
                      value={form.progressoPct}
                      onChange={(e) => setForm({ ...form, progressoPct: e.target.value })}
                    />
                  </label>
                  <label className="text-xs font-semibold text-slate-500">
                    Aprovação
                    <select
                      className={`${campo} mt-1`}
                      value={form.aprovado}
                      onChange={(e) => setForm({ ...form, aprovado: e.target.value as Formulario["aprovado"] })}
                    >
                      <option value="">sem resultado</option>
                      <option value="sim">aprovada(o)</option>
                      <option value="nao">reprovada(o)</option>
                    </select>
                  </label>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <label className="flex items-center gap-2 font-semibold">
                    <input type="checkbox" checked={form.concluido} onChange={(e) => setForm({ ...form, concluido: e.target.checked })} />
                    Concluiu o curso
                  </label>
                  <label className="flex items-center gap-2 font-semibold">
                    <input type="checkbox" checked={form.cancelado} onChange={(e) => setForm({ ...form, cancelado: e.target.checked })} />
                    Cancelou (sem reembolso)
                  </label>
                </div>
                {form.cancelado ? (
                  <label className="mt-3 block text-xs font-semibold text-slate-500">
                    Motivo do cancelamento
                    <input
                      className={`${campo} mt-1`}
                      value={form.motivoCancelamento}
                      onChange={(e) => setForm({ ...form, motivoCancelamento: e.target.value })}
                    />
                  </label>
                ) : null}
                <label className="mt-3 block text-xs font-semibold text-slate-500">
                  Observações
                  <textarea
                    className={`${campo} mt-1 min-h-[72px]`}
                    value={form.observacoes}
                    onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
                  />
                </label>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => void gravar()}
                    disabled={salvar.isPending}
                    className="flex items-center gap-1.5 rounded-full bg-[#1a1333] px-4 py-2 text-xs font-bold text-white hover:bg-[#6b21a8] disabled:opacity-40"
                  >
                    <Save className="size-3.5" />
                    {salvar.isPending ? "Salvando…" : "Salvar"}
                  </button>
                  {aviso ? <p className="text-xs font-semibold text-slate-500">{aviso}</p> : null}
                </div>
              </section>
            ) : null}

            <section>
              <h3 className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-[#6b21a8]">
                Avisos da Voomp ({ficha.eventos.length})
              </h3>
              {ficha.eventos.length === 0 ? (
                <p className="text-xs text-slate-400">Nenhum aviso ligado a esta inscrição.</p>
              ) : (
                <ul className="divide-y divide-slate-100 text-xs">
                  {ficha.eventos.map((e) => (
                    <li key={e.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2">
                      <span className="tabular-nums text-slate-400">{dataHora(e.receivedAt)}</span>
                      <Selo status={statusDe(e.status)} />
                      <span className="text-slate-400">
                        {e.evento ?? "evento"}
                        {e.statusVoomp ? ` · ${e.statusVoomp}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
