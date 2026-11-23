// Aba "Acompanhamento do curso" de /painel/estudantes: quem se matriculou e
// como está no curso (aguardando início, cursando, em risco, concluiu, não
// concluiu no prazo, cancelou, reembolso), distribuição por curso, turma,
// progresso e origem, lista com busca e importação do relatório de progresso.

import { useMemo, useState } from "react";
import { AlertTriangle, Download, GraduationCap, MapPin, Search, TrendingUp, Upload, Users } from "lucide-react";
import {
  ATRASO_RITMO_PP,
  CALENDARIO_CURSOS,
  FAIXAS_PROGRESSO,
  ORDEM_SITUACAO,
  SITUACAO_ACADEMICA,
  faixaProgresso,
  situacaoAcademica,
  textoRisco,
  type AcompanhamentoCalculado,
  type SituacaoAcademica,
} from "@shared/academico";
import { CURSOS_VOOMP, cursoVoomp } from "@shared/voomp";
import { Barras, Cartao, Tile } from "./GisellePainel";
import GiselleEstudantesImportar from "./GiselleEstudantesImportar";
import {
  BarraProgresso,
  SeloAcademico,
  baixarCsv,
  contar,
  data,
  dataHora,
  linkWhatsApp,
  pct,
  type DadosEstudantes,
  type Inscricao,
} from "./estudantesUtil";

type Aluno = Inscricao & { acomp: AcompanhamentoCalculado };
type FiltroAcad = "todas" | SituacaoAcademica;

export default function GiselleEstudantesAcompanhamento({
  token,
  dados,
  agora,
  onAbrir,
  onAtualizar,
  buscarDocumentos,
}: {
  token: string;
  dados: DadosEstudantes;
  agora: Date;
  onAbrir: (inscricaoId: number) => void;
  onAtualizar: () => void;
  buscarDocumentos: (ids: number[]) => Promise<Map<number, string | null>>;
}) {
  const [curso, setCurso] = useState("todos");
  const [situacao, setSituacao] = useState<FiltroAcad>("todas");
  const [busca, setBusca] = useState("");
  const [cpfCompleto, setCpfCompleto] = useState(false);
  const [mostrarImportar, setMostrarImportar] = useState(false);

  const c = useMemo(() => {
    const alunos: Aluno[] = [];
    for (const i of dados.inscricoes) {
      const acomp = situacaoAcademica(i, i.academico, agora);
      if (acomp) alunos.push({ ...i, acomp });
    }
    const doCurso = curso === "todos" ? alunos : alunos.filter((a) => a.productId === curso);
    const conta = (s: SituacaoAcademica, lista = doCurso) => lista.filter((a) => a.acomp.situacao === s).length;

    const termo = busca.trim().toLowerCase();
    const filtrados = doCurso.filter((a) => {
      if (situacao !== "todas" && a.acomp.situacao !== situacao) return false;
      if (!termo) return true;
      const alvo = [a.name, a.email, a.matricula, a.academico?.ra, a.city, a.acomp.turma.codigo].filter(Boolean).join(" ").toLowerCase();
      return alvo.includes(termo);
    });

    const idsCursos = Array.from(new Set([...Object.keys(CURSOS_VOOMP), ...alunos.map((a) => a.productId)]));
    const porCurso = idsCursos.map((id) => {
      const lista = alunos.filter((a) => a.productId === id);
      const contagem = Object.fromEntries(ORDEM_SITUACAO.map((s) => [s, conta(s, lista)])) as Record<SituacaoAcademica, number>;
      const comProgresso = lista.filter((a) => a.academico?.progressoPct !== null && a.academico?.progressoPct !== undefined);
      const encerrados = contagem.concluiu + contagem.nao_concluiu + contagem.cancelou;
      return {
        id,
        nome: cursoVoomp(id, lista[0]?.productName).nome,
        contagem,
        total: lista.length,
        progressoMedio: comProgresso.length
          ? Math.round(comProgresso.reduce((s, a) => s + (a.academico?.progressoPct ?? 0), 0) / comProgresso.length)
          : null,
        taxaConclusao: encerrados > 0 ? (contagem.concluiu / encerrados) * 100 : null,
      };
    });

    const ativos = doCurso.filter((a) => a.acomp.situacao !== "reembolsado");
    const emRisco = doCurso
      .filter((a) => a.acomp.situacao === "em_risco")
      .sort((x, y) => x.acomp.diasAtePrazo - y.acomp.diasAtePrazo || (y.acomp.diasSemAvanco ?? 0) - (x.acomp.diasSemAvanco ?? 0));

    return {
      alunos,
      doCurso,
      filtrados,
      porCurso,
      ativos,
      emRisco,
      conta,
      porSituacao: ORDEM_SITUACAO.map((s) => [SITUACAO_ACADEMICA[s].rotulo, conta(s)] as [string, number]).filter(([, n]) => n > 0),
      funil: FAIXAS_PROGRESSO.map((f) => [f, ativos.filter((a) => faixaProgresso(a.academico?.progressoPct) === f).length] as [string, number]),
      porTurma: contar(ativos, (a) => `${cursoVoomp(a.productId).codigo} · ${a.acomp.turma.codigo}`),
      porUf: contar(ativos, (a) => a.uf || "sem UF"),
      concluintesPorOrigem: contar(
        doCurso.filter((a) => a.acomp.situacao === "concluiu"),
        (a) => a.utmSource || "sem origem"
      ),
      evasaoPorOrigem: contar(
        doCurso.filter((a) => ["nao_concluiu", "cancelou", "em_risco"].includes(a.acomp.situacao)),
        (a) => a.utmSource || "sem origem"
      ),
    };
  }, [dados, curso, situacao, busca, agora]);

  const exportar = async () => {
    const documentos = cpfCompleto ? await buscarDocumentos(c.filtrados.map((a) => a.id)) : null;
    const cabecalho = [
      "Matrícula NOKAHI", "RA Anhanguera", "Nome", "E-mail", "Telefone", "CPF", "Cidade", "UF", "Curso", "Turma",
      "Início da turma", "Prazo máximo", "Situação no curso", "Motivo do risco", "Progresso (%)", "Progresso esperado hoje (%)",
      "Horas cumpridas", "Carga horária", "Horas/semana necessárias até o prazo", "Aulas concluídas", "Total de aulas",
      "Último avanço", "Dias sem avançar", "Último acesso", "Concluiu em", "Aprovação", "Cancelou em",
      "Motivo do cancelamento", "Valor pago (R$)", "Cupom", "Origem (utm_source)", "Campanha (utm_campaign)",
      "Pago em", "Observações",
    ];
    const linhas = c.filtrados.map((a) => [
      a.matricula, a.academico?.ra, a.name, a.email, a.phone,
      documentos ? (documentos.get(a.id) ?? "") : (a.documentoMascarado ?? ""),
      a.city, a.uf, cursoVoomp(a.productId, a.productName).nome, a.acomp.turma.codigo, data(a.acomp.turma.inicio),
      data(a.acomp.turma.prazo), SITUACAO_ACADEMICA[a.acomp.situacao].rotulo, textoRisco(a.acomp, a.academico?.progressoPct),
      a.academico?.progressoPct, a.acomp.progressoEsperado, String(a.acomp.horas.cumpridas).replace(".", ","), a.acomp.horas.total,
      a.acomp.horas.porSemanaNecessario === null ? "" : String(a.acomp.horas.porSemanaNecessario).replace(".", ","),
      a.academico?.aulasConcluidas, a.academico?.aulasTotal, dataHora(a.academico?.ultimoAvancoAt), a.acomp.diasSemAvanco,
      dataHora(a.academico?.ultimoAcessoAt), dataHora(a.academico?.concluidoAt),
      a.academico?.aprovado === true ? "aprovada(o)" : a.academico?.aprovado === false ? "reprovada(o)" : "",
      dataHora(a.academico?.canceladoAt), a.academico?.motivoCancelamento,
      a.amountCents !== null ? (a.amountCents / 100).toFixed(2).replace(".", ",") : "", a.coupon, a.utmSource,
      a.utmCampaign, dataHora(a.paidAt), a.academico?.observacoes,
    ]);
    baixarCsv(`alunos-acompanhamento-${new Date().toISOString().slice(0, 10)}.csv`, [cabecalho, ...linhas]);
  };

  const total = c.doCurso.length;
  const encerrados = c.conta("concluiu") + c.conta("nao_concluiu") + c.conta("cancelou");
  const horasSemana = (h: number, semanas: number) => (h / semanas).toFixed(1).replace(".", ",");
  const prazos = Object.entries(CALENDARIO_CURSOS).map(([id, cal]) => {
    const semanas = "dias" in cal.prazo ? cal.prazo.dias / 7 : (cal.prazo.meses * 365.25) / 12 / 7;
    return `${cursoVoomp(id).codigo}: ${cal.cargaHoraria} h em até ${cal.rotuloPrazo} (≈ ${horasSemana(cal.cargaHoraria, semanas)} h/semana)`;
  });

  return (
    <div className="space-y-5">
      {/* Filtros */}
      <div className="flex flex-col gap-2 rounded-3xl border border-slate-200/70 bg-white p-3 sm:flex-row sm:items-center">
        <select
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
          aria-label="Curso (acompanhamento)"
          className="rounded-2xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-semibold focus:border-[#8b5cf6] focus:outline-none"
        >
          <option value="todos">Todos os cursos</option>
          {c.porCurso.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>
        <select
          value={situacao}
          onChange={(e) => setSituacao(e.target.value as FiltroAcad)}
          aria-label="Situação no curso"
          className="rounded-2xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-semibold focus:border-[#8b5cf6] focus:outline-none"
        >
          <option value="todas">Todas as situações</option>
          {ORDEM_SITUACAO.map((s) => (
            <option key={s} value={s}>
              {SITUACAO_ACADEMICA[s].rotulo}
            </option>
          ))}
        </select>
        <label className="flex flex-1 items-center gap-2 rounded-2xl border-2 border-slate-200 px-3 py-2 focus-within:border-[#8b5cf6]">
          <Search className="size-4 shrink-0 text-slate-400" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Nome, e-mail, matrícula, RA, turma ou cidade"
            aria-label="Buscar aluno"
            className="w-full bg-transparent text-sm focus:outline-none"
          />
        </label>
      </div>

      {/* Visão geral */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
        <Tile rotulo="Matriculados" valor={String(total)} detalhe="inscrições pagas" />
        <Tile rotulo="Cursando" valor={String(c.conta("cursando") + c.conta("aguardando_inicio"))} detalhe={`${c.conta("aguardando_inicio")} aguardando início`} />
        <Tile rotulo="Em risco" valor={String(c.conta("em_risco"))} detalhe="parou ou está fora do ritmo" />
        <Tile rotulo="Concluíram" valor={String(c.conta("concluiu"))} detalhe={`taxa ${pct(c.conta("concluiu"), encerrados)} dos encerrados`} />
        <Tile rotulo="Não concluíram" valor={String(c.conta("nao_concluiu"))} detalhe="prazo da turma vencido" />
        <Tile
          rotulo="Cancelou / reembolso"
          valor={String(c.conta("cancelou") + c.conta("reembolsado"))}
          detalhe={`${c.conta("cancelou")} cancel. · ${c.conta("reembolsado")} reemb.`}
        />
      </div>

      <div className="flex flex-col gap-2 rounded-3xl border border-slate-200/70 bg-white px-4 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Progresso atualizado pela última vez em{" "}
          <b className="text-[#1a1333]">{dados.ultimaImportacao ? dataHora(dados.ultimaImportacao) : "nunca (importe o relatório)"}</b>.
          {" "}Prazos máximos: {prazos.join(" · ")}. Em risco: parou de avançar (MBA 30 dias, extensão 21, curso livre 7) ou
          está {ATRASO_RITMO_PP} pontos abaixo do progresso esperado para a data.
        </p>
        <button
          type="button"
          onClick={() => setMostrarImportar((v) => !v)}
          className="flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#1a1333] px-3 py-1.5 font-bold text-white hover:bg-[#6b21a8]"
        >
          <Upload className="size-3.5" />
          {mostrarImportar ? "Fechar importação" : "Importar progresso"}
        </button>
      </div>

      {mostrarImportar ? (
        <Cartao titulo="Importar relatório de progresso" icone={Upload}>
          <GiselleEstudantesImportar token={token} onImportado={onAtualizar} />
        </Cartao>
      ) : null}

      {/* Distribuição por curso */}
      <Cartao titulo="Distribuição por curso e situação no curso" icone={GraduationCap}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-[0.1em] text-slate-400 [&>th+th]:pl-3 [&>th]:whitespace-nowrap">
                <th className="pb-2">Curso</th>
                <th className="pb-2 text-right">Matric.</th>
                <th className="pb-2 text-right">Aguard.</th>
                <th className="pb-2 text-right">Cursando</th>
                <th className="pb-2 text-right">Em risco</th>
                <th className="pb-2 text-right">Concluiu</th>
                <th className="pb-2 text-right">Não concl.</th>
                <th className="pb-2 text-right">Cancel.</th>
                <th className="pb-2 text-right">Reemb.</th>
                <th className="pb-2 text-right">Progr. médio</th>
                <th className="pb-2 text-right">Conclusão</th>
              </tr>
            </thead>
            <tbody>
              {c.porCurso.map((p) => (
                <tr key={p.id} className="border-t border-slate-100 [&>td+td]:pl-3">
                  <td className="min-w-[220px] py-2.5 font-semibold">{p.nome}</td>
                  <td className="py-2.5 text-right font-bold tabular-nums">{p.total}</td>
                  <td className="py-2.5 text-right tabular-nums">{p.contagem.aguardando_inicio}</td>
                  <td className="py-2.5 text-right tabular-nums">{p.contagem.cursando}</td>
                  <td className="py-2.5 text-right font-bold tabular-nums" style={{ color: SITUACAO_ACADEMICA.em_risco.cor }}>
                    {p.contagem.em_risco}
                  </td>
                  <td className="py-2.5 text-right font-bold tabular-nums" style={{ color: SITUACAO_ACADEMICA.concluiu.cor }}>
                    {p.contagem.concluiu}
                  </td>
                  <td className="py-2.5 text-right tabular-nums">{p.contagem.nao_concluiu}</td>
                  <td className="py-2.5 text-right tabular-nums">{p.contagem.cancelou}</td>
                  <td className="py-2.5 text-right tabular-nums">{p.contagem.reembolsado}</td>
                  <td className="py-2.5 text-right tabular-nums">{p.progressoMedio === null ? "—" : `${p.progressoMedio}%`}</td>
                  <td className="py-2.5 text-right font-bold tabular-nums">
                    {p.taxaConclusao === null ? "—" : `${p.taxaConclusao.toFixed(1)}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11px] text-slate-400">
          Conclusão = concluíram ÷ (concluíram + não concluíram + cancelaram). Reembolsos ficam fora da conta.
        </p>
      </Cartao>

      <div className="grid gap-5 lg:grid-cols-2">
        <Cartao titulo="Situação no curso" icone={Users}>
          <Barras dados={c.porSituacao} cor="#2563eb" />
        </Cartao>
        <Cartao titulo="Funil de progresso (sem reembolsos)" icone={TrendingUp}>
          <Barras dados={c.funil} cor="#0f9d8f" />
        </Cartao>
        <Cartao titulo="Alunos por turma" icone={GraduationCap}>
          <Barras dados={c.porTurma} cor="#6b21a8" />
        </Cartao>
        <Cartao titulo="Alunos por estado" icone={MapPin}>
          <Barras dados={c.porUf} cor="#6b21a8" />
        </Cartao>
        <Cartao titulo="Concluintes por origem (utm_source)">
          <Barras dados={c.concluintesPorOrigem} cor="#0f9d8f" />
        </Cartao>
        <Cartao titulo="Em risco, não concluíram ou cancelaram, por origem">
          <Barras dados={c.evasaoPorOrigem} cor="#be123c" />
        </Cartao>
      </div>

      {/* Em risco: quem chamar primeiro */}
      <Cartao titulo={`Em risco agora (${c.emRisco.length})`} icone={AlertTriangle}>
        {c.emRisco.length === 0 ? (
          <p className="text-sm text-slate-400">Ninguém parado nem fora do ritmo.</p>
        ) : (
          <ul className="divide-y divide-slate-100 text-sm">
            {c.emRisco.slice(0, 50).map((a) => {
              const wa = linkWhatsApp(a.phone);
              return (
                <li key={a.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                  <button type="button" onClick={() => onAbrir(a.id)} className="min-w-0 text-left hover:text-[#6b21a8]">
                    <span className="font-semibold">{a.name || a.email}</span>
                    <span className="ml-2 text-xs text-slate-400">
                      {cursoVoomp(a.productId).codigo} · {a.acomp.turma.codigo} · {textoRisco(a.acomp, a.academico?.progressoPct)} ·
                      faltam {a.acomp.horas.faltam} h em {Math.max(0, a.acomp.diasAtePrazo)} dias
                    </span>
                  </button>
                  {wa ? (
                    <a href={wa} target="_blank" rel="noreferrer" className="text-xs font-bold text-[#0f766e] underline">
                      WhatsApp
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">{a.email}</span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Cartao>

      {/* Lista completa */}
      <Cartao
        titulo={`Alunos (${c.filtrados.length}${c.filtrados.length > 300 ? " · mostrando 300; a planilha leva todos" : ""})`}
        icone={Users}
      >
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => void exportar()}
            disabled={c.filtrados.length === 0}
            className="flex items-center gap-1.5 rounded-full bg-[#1a1333] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#6b21a8] disabled:opacity-40"
          >
            <Download className="size-3.5" />
            Exportar planilha de alunos
          </button>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <input type="checkbox" checked={cpfCompleto} onChange={(e) => setCpfCompleto(e.target.checked)} />
            incluir CPF completo
          </label>
        </div>
        {c.filtrados.length === 0 ? (
          <p className="text-sm text-slate-400">
            {c.alunos.length === 0
              ? "Ainda não há matrículas. Quem pagar aparece aqui com a turma e o prazo calculados."
              : "Nenhum aluno com esses filtros."}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-[0.1em] text-slate-400">
                  <th className="pb-2">Matrícula / RA</th>
                  <th className="pb-2">Aluno</th>
                  <th className="pb-2">Curso · turma</th>
                  <th className="pb-2">Situação</th>
                  <th className="pb-2">Progresso</th>
                  <th className="pb-2">Último avanço</th>
                  <th className="pb-2">Prazo</th>
                </tr>
              </thead>
              <tbody>
                {c.filtrados.slice(0, 300).map((a) => (
                  <tr
                    key={a.id}
                    onClick={() => onAbrir(a.id)}
                    className="cursor-pointer border-t border-slate-100 align-top hover:bg-violet-50/50"
                  >
                    <td className="py-2.5 text-xs">
                      <p className="font-mono font-bold">{a.matricula ?? "—"}</p>
                      {a.academico?.ra ? <p className="text-slate-400">RA {a.academico.ra}</p> : null}
                    </td>
                    <td className="py-2.5">
                      <p className="font-semibold">{a.name || "—"}</p>
                      <p className="text-xs text-slate-400">{a.email}</p>
                    </td>
                    <td className="py-2.5 text-xs">
                      <p className="font-semibold">{cursoVoomp(a.productId).codigo}</p>
                      <p className="text-slate-400">{a.acomp.turma.codigo}</p>
                    </td>
                    <td className="py-2.5">
                      <SeloAcademico situacao={a.acomp.situacao} />
                    </td>
                    <td className="py-2.5">
                      <BarraProgresso valor={a.academico?.progressoPct} />
                      {a.acomp.progressoEsperado !== null && a.acomp.situacao !== "concluiu" ? (
                        <p className="mt-0.5 text-[11px] text-slate-400">esperado hoje {a.acomp.progressoEsperado}%</p>
                      ) : null}
                    </td>
                    <td className="py-2.5 text-xs tabular-nums text-slate-500">
                      {a.academico?.ultimoAvancoAt ? data(a.academico.ultimoAvancoAt) : "—"}
                      {a.acomp.diasSemAvanco !== null ? <p className="text-slate-400">{a.acomp.diasSemAvanco} dias</p> : null}
                    </td>
                    <td className="py-2.5 text-xs tabular-nums text-slate-500">
                      {data(a.acomp.turma.prazo)}
                      {a.acomp.horas.porSemanaNecessario !== null && a.acomp.situacao !== "aguardando_inicio" ? (
                        <p className="text-slate-400">{String(a.acomp.horas.porSemanaNecessario).replace(".", ",")} h/sem.</p>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Cartao>
    </div>
  );
}
