import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

type StudentGateProps = {
  open: boolean;
  courseSlug: string;
  courseTitle: string;
  onClose: () => void;
  onRegistered: (data: { name: string; email: string }) => void;
};

const inputClass =
  "w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm text-[#1a1333] placeholder:text-slate-400 focus:border-[#8b5cf6] focus:outline-none";

export default function StudentGate({
  open,
  courseSlug,
  courseTitle,
  onClose,
  onRegistered,
}: StudentGateProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [role, setRole] = useState("");
  const [organization, setOrganization] = useState("");
  const [interestWorkshop, setInterestWorkshop] = useState(false);
  const [interestTalks, setInterestTalks] = useState(false);
  const [interestConsulting, setInterestConsulting] = useState(false);
  const [goals, setGoals] = useState("");
  const [consent, setConsent] = useState(false);

  const registerMutation = trpc.academy.register.useMutation({
    onSuccess: () => {
      toast.success("Perfil criado! Bons estudos 🎓");
      onRegistered({ name: name.trim(), email: email.trim().toLowerCase() });
    },
    onError: (error) => {
      toast.error(error.message || "Não foi possível criar seu perfil agora. Tente novamente.");
    },
  });

  const canSubmit = name.trim().length >= 2 && /\S+@\S+\.\S+/.test(email) && consent;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || registerMutation.isPending) return;
    registerMutation.mutate({
      name: name.trim(),
      email: email.trim(),
      whatsapp,
      role,
      organization,
      courseSlug,
      interestWorkshop,
      interestTalks,
      interestConsulting,
      goals,
      consent: true,
    });
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1226]/60 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-[0_25px_80px_rgba(26,19,51,0.3)] sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-violet-100 text-[#6b21a8]">
                <GraduationCap className="size-6" />
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:text-[#1a1333]"
              >
                <X className="size-4" />
              </button>
            </div>

            <h2 className="mt-4 font-baloo text-2xl font-bold text-[#1a1333]">
              Crie seu perfil gratuito
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Salve seu progresso em <strong className="text-[#6b21a8]">{courseTitle}</strong> e
              garanta seu certificado ao concluir.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <input
                className={inputClass}
                placeholder="Seu nome completo *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={160}
                required
              />
              <input
                className={inputClass}
                type="email"
                placeholder="Seu melhor e-mail *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={320}
                required
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className={inputClass}
                  placeholder="WhatsApp (opcional)"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  maxLength={40}
                />
                <input
                  className={inputClass}
                  placeholder="Cargo ou área"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  maxLength={160}
                />
              </div>
              <input
                className={inputClass}
                placeholder="Organização / empresa (opcional)"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                maxLength={200}
              />

              <div className="rounded-2xl border-2 border-violet-100 bg-violet-50/50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b21a8]">
                  O que mais te interessa? (opcional)
                </p>
                <div className="mt-3 space-y-2">
                  {[
                    {
                      checked: interestWorkshop,
                      set: setInterestWorkshop,
                      label: "Workshop presencial/online de Dados & IA",
                    },
                    {
                      checked: interestTalks,
                      set: setInterestTalks,
                      label: "Palestra da Giselle no meu evento ou empresa",
                    },
                    {
                      checked: interestConsulting,
                      set: setInterestConsulting,
                      label: "Solução de IA sob medida para minha operação",
                    },
                  ].map((item) => (
                    <label
                      key={item.label}
                      className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-600"
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={(e) => item.set(e.target.checked)}
                        className="mt-0.5 size-4 accent-[#6b21a8]"
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </div>

              <textarea
                className={`${inputClass} min-h-[70px] resize-y`}
                placeholder="O que você quer aprender ou resolver com dados e IA? (opcional)"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                maxLength={2000}
              />

              <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-slate-500">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 size-4 shrink-0 accent-[#6b21a8]"
                  required
                />
                Autorizo o contato da Giselle Falcão Academy sobre cursos, workshops e novidades.
                Seus dados não são compartilhados com terceiros (LGPD). *
              </label>

              <button
                type="submit"
                disabled={!canSubmit || registerMutation.isPending}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#6b21a8,#8b5cf6)] px-6 py-3.5 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {registerMutation.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Criando perfil...
                  </>
                ) : (
                  "Criar perfil e continuar"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
