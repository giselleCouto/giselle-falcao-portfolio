import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, BookOpen, ChevronRight, ShoppingCart } from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { livro } from "@/lib/livroData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const accentClasses: Record<string, string> = {
  amber: "border-amber-200 hover:border-amber-400 hover:shadow-[0_18px_50px_rgba(180,120,10,0.15)]",
  yellow: "border-yellow-200 hover:border-yellow-400 hover:shadow-[0_18px_50px_rgba(200,160,0,0.15)]",
  teal: "border-teal-200 hover:border-teal-400 hover:shadow-[0_18px_50px_rgba(20,184,166,0.15)]",
  violet: "border-violet-200 hover:border-violet-400 hover:shadow-[0_18px_50px_rgba(107,33,168,0.15)]",
};

export default function GiselleLivroComprar() {
  return (
    <GiselleLayout>
      <section className="container max-w-2xl py-12 sm:py-16">
        {/* Cabeçalho compacto com capa */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="flex items-center gap-5"
        >
          <img
            src={livro.cover}
            alt={`Capa do livro ${livro.title}`}
            className="w-24 shrink-0 rounded-xl border border-slate-200/70 shadow-[0_12px_30px_rgba(26,19,51,0.2)] sm:w-28"
          />
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#6b21a8]">
              <ShoppingCart className="size-3" />
              Onde comprar
            </p>
            <h1 className="mt-2 font-baloo text-2xl font-bold leading-tight sm:text-3xl">
              {livro.title}
            </h1>
            <p className="mt-1 text-sm font-semibold text-[#6b21a8]">{livro.subtitle}</p>
            <p className="mt-1 text-xs text-slate-400">
              {livro.author} · {livro.publisher} · {livro.year} · {livro.pages}p
            </p>
          </div>
        </motion.div>

        {/* Lojas */}
        <div className="mt-8 space-y-4">
          {livro.buyLinks.map((store, i) => (
            <motion.a
              key={store.store}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.45, delay: 0.08 + i * 0.07 }}
              href={store.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-4 rounded-3xl border-2 bg-white p-5 shadow-[0_10px_40px_rgba(26,19,51,0.06)] transition duration-300 hover:-translate-y-0.5 ${accentClasses[store.accent] ?? accentClasses.violet}`}
            >
              <div className="min-w-0 flex-1">
                <p className="font-baloo text-lg font-bold text-[#1a1333]">{store.store}</p>
                <p className="text-sm leading-6 text-slate-500">{store.description}</p>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1a1333] text-white transition group-hover:bg-[#6b21a8]">
                <ArrowUpRight className="size-4" />
              </span>
            </motion.a>
          ))}
        </div>

        {/* Link para a página completa */}
        <div className="mt-8 text-center">
          <Link
            href="/giselle/livro"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#6b21a8] hover:underline"
          >
            <BookOpen className="size-4" />
            Conhecer a Metodologia CEOD em detalhes
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </section>
    </GiselleLayout>
  );
}
