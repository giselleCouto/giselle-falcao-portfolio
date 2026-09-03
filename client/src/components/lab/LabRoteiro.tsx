import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, FileText, MessageCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { CHECKLIST_S3, ROTEIRO_STORAGE_KEY, waLink } from "@/lib/labData";

type RoteiroState = {
  tarefa: string;
  sistemas: string;
  numeroHoje: string;
  s3: boolean[];
  numeroDepois: string;
  quebrou: string;
  aprendi: string;
};

const VAZIO: RoteiroState = {
  tarefa: "",
  sistemas: "",
  numeroHoje: "",
  s3: CHECKLIST_S3.map(() => false),
  numeroDepois: "",
  quebrou: "",
  aprendi: "",
};

function carregar(): RoteiroState {
  try {
    const raw = localStorage.getItem(ROTEIRO_STORAGE_KEY);
    if (!raw) return VAZIO;
    const parsed = JSON.parse(raw) as Partial<RoteiroState>;
    return { ...VAZIO, ...parsed, s3: Array.isArray(parsed.s3) ? CHECKLIST_S3.map((_, i) => !!parsed.s3?.[i]) : VAZIO.s3 };
  } catch {
    return VAZIO;
  }
}

const inputClass =
  "w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-[#1a1333] placeholder:text-slate-400 focus:border-[#14b8a6] focus:outline-none";

export default function LabRoteiro() {
  const [dados, setDados] = useState<RoteiroState>(VAZIO);
  const [relatorio, setRelatorio] = useState(false);

  useEffect(() => {
    setDados(carregar());
  }, []);

  const salvar = (next: RoteiroState) => {
    setDados(next);
    try {
      localStorage.setItem(ROTEIRO_STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* modo anônimo — segue funcionando sem salvar */
    }
  };

  const set = (campo: keyof RoteiroState) => (valor: string) => salvar({ ...dados, [campo]: valor });

  const limpar = () => {
    salvar(VAZIO);
    setRelatorio(false);
    toast.success("Roteiro limpo — pronto para um novo ciclo.");
  };

  const s3Feitos = dados.s3.filter(Boolean).length;
  const s3Completa = s3Feitos === CHECKLIST_S3.length;
  const cicloCompleto = !!dados.tarefa && !!dados.numeroHoje && s3Completa && !!dados.numeroDepois;
  // Primeira semana sem dado — mas quem chegou ao número de depois não "travou"
  // numa semana anterior: concluiu com pendência.
  const semanaParada = !dados.tarefa ? 1 : !dados.numeroHoje ? 2 : !s3Completa ? 3 : !dados.numeroDepois ? 4 : 0;
  const statusHonesto = cicloCompleto
    ? "Status: ciclo completo. 🎉"
    : dados.numeroDepois && !s3Completa
      ? `Status honesto: concluí o ciclo com pendência na semana 3 (versão feia ${s3Feitos}/${CHECKLIST_S3.length}).`
      : `Status honesto: travei na semana ${semanaParada}.`;

  const textoRelatorio = [
    "MEU CICLO DE 30 DIAS — Laboratório da Decisão",
    "",
    `Tarefa escolhida: ${dados.tarefa || "(não preenchi)"}${dados.sistemas ? ` · atravessa ${dados.sistemas} sistemas` : ""}`,
    `O número de antes: ${dados.numeroHoje || "(não medi)"}`,
    `Versão feia: ${s3Feitos}/${CHECKLIST_S3.length} passos concluídos`,
    `O número de depois: ${dados.numeroDepois || "(ainda não cheguei)"}`,
    dados.quebrou ? `O que quebrou: ${dados.quebrou}` : null,
    dados.aprendi ? `O que aprendi: ${dados.aprendi}` : null,
    "",
    statusHonesto,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const copiarRelatorio = async () => {
    try {
      await navigator.clipboard.writeText(textoRelatorio);
      toast.success("Relatório copiado — pronto para mandar para o chefe.");
    } catch {
      toast.error("Não consegui copiar. Selecione o texto manualmente.");
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm leading-7 text-slate-500">
        Um ciclo de 4 semanas, salvo <strong className="text-[#1a1333]">no seu celular</strong>. Preencha ao
        longo do mês e gere o relatório no final.
      </p>

      {/* Semana 1 */}
      <div className="rounded-3xl border border-slate-200/70 bg-white p-5">
        <p className="font-baloo text-base font-bold text-[#1a1333]">Semana 1 · Escolher</p>
        <p className="mt-0.5 text-xs font-medium text-slate-400">Uma tarefa só. A que atravessa mais sistemas.</p>
        <label className="mt-3 block text-xs font-bold text-slate-500" htmlFor="lab-tarefa">
          A tarefa que eu escolhi
        </label>
        <input
          id="lab-tarefa"
          className={`mt-1 ${inputClass}`}
          maxLength={200}
          placeholder="Ex.: consolidar o relatório semanal de vendas"
          value={dados.tarefa}
          onChange={(e) => set("tarefa")(e.target.value)}
        />
        <label className="mt-3 block text-xs font-bold text-slate-500" htmlFor="lab-sistemas">
          Quantos sistemas ela atravessa?
        </label>
        <select
          id="lab-sistemas"
          className={`mt-1 ${inputClass}`}
          value={dados.sistemas}
          onChange={(e) => set("sistemas")(e.target.value)}
        >
          <option value="">Selecione...</option>
          {["2", "3", "4 ou mais"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Semana 2 */}
      <div className="rounded-3xl border-2 border-teal-300 bg-white p-5">
        <p className="font-baloo text-base font-bold text-[#1a1333]">Semana 2 · Medir</p>
        <p className="mt-0.5 text-xs font-medium text-teal-600">
          Sem medir, é achismo. Esse número é o campo mais importante do kit.
        </p>
        <label className="mt-3 block text-xs font-bold text-slate-500" htmlFor="lab-numero">
          O número de hoje (tempo, erros ou custo)
        </label>
        <input
          id="lab-numero"
          className={`mt-1 ${inputClass}`}
          maxLength={120}
          placeholder="Ex.: 3h por semana · 2 retrabalhos por mês"
          value={dados.numeroHoje}
          onChange={(e) => set("numeroHoje")(e.target.value)}
        />
      </div>

      {/* Semana 3 */}
      <div className="rounded-3xl border border-slate-200/70 bg-white p-5">
        <p className="font-baloo text-base font-bold text-[#1a1333]">Semana 3 · Versão feia</p>
        <p className="mt-0.5 text-xs font-medium text-slate-400">Versão feia, com gente do lado.</p>
        <div className="mt-3 space-y-2">
          {CHECKLIST_S3.map((item, i) => (
            <label key={item} className="flex cursor-pointer items-start gap-3">
              <button
                type="button"
                role="checkbox"
                aria-checked={dados.s3[i]}
                aria-label={item}
                onClick={() => salvar({ ...dados, s3: dados.s3.map((v, j) => (j === i ? !v : v)) })}
                className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg border-2 transition ${
                  dados.s3[i] ? "border-teal-500 bg-teal-500 text-white" : "border-slate-300 text-transparent"
                }`}
              >
                <Check className="size-4" />
              </button>
              <span className={`text-sm leading-6 ${dados.s3[i] ? "text-slate-400 line-through" : "text-slate-600"}`}>
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Semana 4 */}
      <div className="rounded-3xl border border-slate-200/70 bg-white p-5">
        <p className="font-baloo text-base font-bold text-[#1a1333]">Semana 4 · Mostrar</p>
        <p className="mt-0.5 text-xs font-medium text-slate-400">Antes, depois, o que quebrou.</p>
        <label className="mt-3 block text-xs font-bold text-slate-500" htmlFor="lab-depois">
          O número de depois
        </label>
        <input
          id="lab-depois"
          className={`mt-1 ${inputClass}`}
          maxLength={120}
          placeholder="Ex.: 40 min por semana"
          value={dados.numeroDepois}
          onChange={(e) => set("numeroDepois")(e.target.value)}
        />
        <label className="mt-3 block text-xs font-bold text-slate-500" htmlFor="lab-quebrou">
          O que quebrou no caminho
        </label>
        <input
          id="lab-quebrou"
          className={`mt-1 ${inputClass}`}
          maxLength={300}
          placeholder="Seja honesto(a) — é isso que dá credibilidade"
          value={dados.quebrou}
          onChange={(e) => set("quebrou")(e.target.value)}
        />
        <label className="mt-3 block text-xs font-bold text-slate-500" htmlFor="lab-aprendi">
          O que eu aprendi
        </label>
        <input
          id="lab-aprendi"
          className={`mt-1 ${inputClass}`}
          maxLength={300}
          placeholder="Uma frase basta"
          value={dados.aprendi}
          onChange={(e) => set("aprendi")(e.target.value)}
        />
      </div>

      <button
        type="button"
        onClick={() => setRelatorio(true)}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1a1333] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#6b21a8]"
      >
        <FileText className="size-4" />
        Gerar meu relatório de 30 dias
      </button>

      {relatorio ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border-2 border-slate-200 bg-[#f7f8fc] p-6"
        >
          <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-[#1a1333]">{textoRelatorio}</pre>
          <div className="mt-4 flex flex-col gap-2.5">
            <a
              href={waLink(textoRelatorio)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a1333] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#6b21a8]"
            >
              <MessageCircle className="size-4" />
              Mandar para a Giselle
            </a>
            <button
              type="button"
              onClick={copiarRelatorio}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-violet-200 px-5 py-3.5 text-sm font-bold text-[#6b21a8] transition hover:bg-violet-50"
            >
              <Copy className="size-4" />
              Copiar para mandar para o chefe
            </button>
          </div>
          {semanaParada !== 0 && !dados.numeroDepois ? (
            <p className="mt-3 text-center text-xs leading-5 text-slate-500">
              Travou na semana {semanaParada}? Manda assim mesmo — “travei na semana {semanaParada}” é um dos
              melhores pontos de partida de conversa.
            </p>
          ) : null}
        </motion.div>
      ) : null}

      <button
        type="button"
        onClick={limpar}
        className="mx-auto flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-rose-500"
      >
        <Trash2 className="size-3.5" />
        Limpar e começar novo ciclo
      </button>
    </div>
  );
}
