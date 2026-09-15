// Gráficos do diagnóstico — SVG inline, sem biblioteca (§5), animados de zero.

import { motion } from "framer-motion";
import { KIT } from "./KitShell";

export type EixoValor = { key: string; nome: string; valor: number; max: number };

const CX = 150;
const CY = 128;
const R = 82;

function ponto(idx: number, total: number, fator: number): [number, number] {
  const ang = -Math.PI / 2 + (idx * 2 * Math.PI) / total;
  return [CX + Math.cos(ang) * R * fator, CY + Math.sin(ang) * R * fator];
}

/** Radar de 6 eixos com a peça fraca marcada em --danger. */
export function KitRadar({ eixos, fraco }: { eixos: EixoValor[]; fraco: string }) {
  const n = eixos.length;
  const pontos = eixos
    .map((e, i) => ponto(i, n, Math.max(0.04, e.valor / e.max)).join(","))
    .join(" ");

  return (
    <svg viewBox="0 0 300 256" role="img" aria-label="Radar das seis competências" className="w-full">
      {/* anéis de referência */}
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon
          key={f}
          points={eixos.map((_, i) => ponto(i, n, f).join(",")).join(" ")}
          fill="none"
          stroke={KIT.border}
          strokeWidth={1}
        />
      ))}
      {/* raios */}
      {eixos.map((e, i) => {
        const [x, y] = ponto(i, n, 1);
        return <line key={e.key} x1={CX} y1={CY} x2={x} y2={y} stroke={KIT.border} strokeWidth={1} />;
      })}
      {/* área respondida — anima de zero */}
      <motion.polygon
        points={pontos}
        fill={`${KIT.accent}33`}
        stroke={KIT.accent}
        strokeWidth={2}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />
      {/* rótulos */}
      {eixos.map((e, i) => {
        const [x, y] = ponto(i, n, 1.22);
        const ehFraco = e.key === fraco;
        return (
          <g key={e.key}>
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fontWeight={700}
              fill={ehFraco ? KIT.danger : KIT.muted}
            >
              {e.nome}
            </text>
            {ehFraco ? (
              <text
                x={x}
                y={y + 13}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fill={KIT.danger}
              >
                é aqui que eu começaria
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

export type BarraValor = { key: string; nome: string; valor: number; max: number };

/** Barras horizontais dos 4M com o M travando em --danger. */
export function KitBarras({ barras, fraco }: { barras: BarraValor[]; fraco: string }) {
  return (
    <div className="space-y-3" role="img" aria-label="Pontuação por M do método 4M">
      {barras.map((b) => {
        const ehFraco = b.key === fraco;
        return (
          <div key={b.key}>
            <div
              className="flex justify-between text-xs font-bold"
              style={{ color: ehFraco ? KIT.danger : KIT.muted }}
            >
              <span>{b.nome}</span>
              <span>
                {b.valor}/{b.max}
              </span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-[#262A36]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(b.valor / b.max) * 100}%` }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="h-full rounded-full"
                style={{ background: ehFraco ? KIT.danger : KIT.accent2 }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
