import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import { Link } from "wouter";
import { ArrowUpRight, Crosshair, Menu, MoveRight } from "lucide-react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const brandPalette = {
  bg: "#04050a",
  bgSoft: "#090b14",
  surface: "rgba(10, 12, 22, 0.76)",
  panel: "rgba(14, 16, 28, 0.92)",
  line: "rgba(173, 186, 255, 0.16)",
  text: "#edf2ff",
  muted: "rgba(226, 232, 255, 0.64)",
  violet: "#8f14d8",
  lavender: "#c6a8ff",
  cyan: "#58d7f7",
  aqua: "#0da8c6",
} as const;

type TimeZoneClockProps = {
  city: string;
  timeZone: string;
};

type GeometryRigProps = {
  variant?: "hero" | "module";
};

type HeroHeadlineLinesProps = {
  mode: "back" | "front";
  className?: string;
};

const heroHeadlineLines = ["IA,", "DADOS E", "ENGENHARIA", "PARA", "DECISÕES", "EM", "CAMADAS."] as const;

function TimeZoneClock({ city, timeZone }: TimeZoneClockProps) {
  const [time, setTime] = useState(() =>
    new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone,
      hour12: false,
    }).format(new Date()),
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime(
        new Intl.DateTimeFormat("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone,
          hour12: false,
        }).format(new Date()),
      );
    }, 1000);

    return () => window.clearInterval(interval);
  }, [timeZone]);

  return (
    <div className="grid gap-1 border-r border-white/10 px-4 py-3 last:border-r-0 sm:min-w-[150px]">
      <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-white/45">{city}</span>
      <span className="font-mono text-sm tracking-[0.22em] text-white">{time}</span>
    </div>
  );
}

function HeroHeadlineLines({ mode, className = "" }: HeroHeadlineLinesProps) {
  const isFront = mode === "front";

  return (
    <div
      className={`${className} max-w-[12ch]`}
      style={
        isFront
          ? {
              maskImage: "linear-gradient(180deg, transparent 0%, black 14%, black 86%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 14%, black 86%, transparent 100%)",
              clipPath: "polygon(34% 0%, 100% 0%, 100% 100%, 16% 100%, 26% 58%)",
              opacity: 0.98,
            }
          : undefined
      }
    >
      {heroHeadlineLines.map((line, index) => {
        const useGradient = index === 1 || index === 4 || index === 6;

        return (
          <div
            key={`${mode}-${line}`}
            className="font-sans text-[clamp(4rem,11vw,10rem)] font-black uppercase leading-[0.88] tracking-[-0.07em]"
            style={
              isFront
                ? useGradient
                  ? {
                      color: "transparent",
                      backgroundImage: "linear-gradient(90deg, #8f14d8 0%, #c6a8ff 48%, #58d7f7 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 0 22px rgba(88,215,247,0.14))",
                    }
                  : {
                      color: "transparent",
                      WebkitTextStroke: "1.2px rgba(198, 168, 255, 0.92)",
                      textShadow: "0 0 26px rgba(143,20,216,0.14)",
                    }
                : {
                    color: brandPalette.text,
                  }
            }
          >
            {line}
          </div>
        );
      })}
    </div>
  );
}

function GeometryRig({ variant = "module" }: GeometryRigProps) {
  const group = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Mesh[]>([]);

  const config =
    variant === "hero"
      ? {
          scale: 1.34,
          lineOpacity: 0.78,
          connectorOpacity: 0.5,
          pointScale: 1.2,
          labelOpacity: 0.92,
        }
      : {
          scale: 1,
          lineOpacity: 0.96,
          connectorOpacity: 0.58,
          pointScale: 1,
          labelOpacity: 0.98,
        };

  const layers = useMemo(() => {
    return [1.05, 1.42, 1.88, 2.18].map((radius, index) => {
      const total = 7 + index;
      const points = Array.from({ length: total }, (_, pointIndex) => {
        const angle = (pointIndex / total) * Math.PI * 2;
        return new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * (0.62 + index * 0.12),
          Math.sin(angle * 2.6) * 0.18 * (index + 1),
        );
      });
      points.push(points[0]);
      return points;
    });
  }, []);

  const labels =
    variant === "hero"
      ? [
          { position: [-2.5, 1.3, 0.4], text: "Z-LAYER 03 · HERO GRID" },
          { position: [2.2, -0.15, 0.3], text: "CROSSING OBJECT / ACTIVE" },
          { position: [-0.15, -1.85, 0.55], text: "DEPTH INDEX / LIVE" },
        ]
      : [
          { position: [-1.8, 1.15, 0], text: "ÁREA CALCULADA 145.23 M²" },
          { position: [1.55, 0.5, 0], text: "VÉRTICES 08" },
          { position: [-0.4, -1.5, 0], text: "MALHA GEOESPACIAL" },
        ];

  useFrame((state) => {
    if (!group.current) return;

    const elapsed = state.clock.elapsedTime;
    group.current.rotation.y = state.pointer.x * 0.4 + Math.sin(elapsed * 0.28) * 0.22;
    group.current.rotation.x = state.pointer.y * 0.22 + Math.cos(elapsed * 0.22) * 0.13;
    group.current.rotation.z = Math.sin(elapsed * 0.16) * 0.05;
    group.current.position.x = Math.sin(elapsed * 0.35) * 0.08;
    group.current.position.y = Math.cos(elapsed * 0.42) * 0.07;

    pointsRef.current.forEach((mesh, index) => {
      const drift = Math.sin(elapsed * 1.3 + index * 0.8) * 0.06;
      mesh.position.z = drift;
      mesh.scale.setScalar(config.pointScale + Math.sin(elapsed * 1.7 + index) * 0.08);
    });
  });

  return (
    <group ref={group} scale={config.scale}>
      {layers.map((points, index) => (
        <Line
          key={`polygon-${variant}-${index}`}
          points={points}
          color={index % 2 === 0 ? brandPalette.cyan : brandPalette.lavender}
          lineWidth={1.2}
          transparent
          opacity={config.lineOpacity - index * 0.12}
        />
      ))}

      {Array.from({ length: variant === "hero" ? 18 : 14 }).map((_, index) => {
        const angle = (index / (variant === "hero" ? 18 : 14)) * Math.PI * 2;
        const radius = (variant === "hero" ? 2.5 : 2.15) + Math.sin(index * 0.8) * 0.18;
        const point = new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.68,
          Math.sin(angle * 2.2) * 0.32,
        );

        return (
          <mesh
            key={`point-${variant}-${index}`}
            position={point.toArray() as [number, number, number]}
            ref={(node) => {
              if (node) pointsRef.current[index] = node;
            }}
          >
            <sphereGeometry args={[0.048, 16, 16]} />
            <meshBasicMaterial color={index % 2 === 0 ? brandPalette.cyan : brandPalette.violet} transparent opacity={0.9} />
          </mesh>
        );
      })}

      {Array.from({ length: variant === "hero" ? 12 : 8 }).map((_, index) => {
        const baseAngle = (index / (variant === "hero" ? 12 : 8)) * Math.PI * 2;
        const start = new THREE.Vector3(Math.cos(baseAngle) * 1.08, Math.sin(baseAngle) * 0.9, -0.26);
        const end = new THREE.Vector3(Math.cos(baseAngle) * 2.4, Math.sin(baseAngle) * 1.5, 0.36);
        return (
          <Line
            key={`connector-${variant}-${index}`}
            points={[start, end]}
            color={index % 2 === 0 ? brandPalette.aqua : brandPalette.lavender}
            lineWidth={0.75}
            transparent
            opacity={config.connectorOpacity}
          />
        );
      })}

      {labels.map((item) => (
        <Html key={`${variant}-${item.text}`} position={item.position as [number, number, number]} center>
          <div
            className="border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] shadow-[0_14px_34px_rgba(0,0,0,0.28)] backdrop-blur-sm"
            style={{
              borderColor: "rgba(198, 168, 255, 0.22)",
              background: "rgba(7, 9, 18, 0.86)",
              color: "rgba(237, 242, 255, 0.92)",
              opacity: config.labelOpacity,
            }}
          >
            {item.text}
          </div>
        </Html>
      ))}
    </group>
  );
}

function HeroDepthCanvas() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[15vh] z-20 h-[60vh]">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 32 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <ambientLight intensity={1.1} />
        <GeometryRig variant="hero" />
      </Canvas>
    </div>
  );
}

function GeometryCanvas() {
  return (
    <div className="relative h-[420px] w-full overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(143,20,216,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(88,215,247,0.16),transparent_24%),linear-gradient(180deg,rgba(7,9,18,0.98),rgba(11,14,25,0.98))]">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 34 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <ambientLight intensity={1} />
        <GeometryRig />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 grid grid-cols-3 border-t border-white/10 bg-[rgba(7,9,18,0.88)] font-mono text-[10px] uppercase tracking-[0.26em] text-white/50">
        <div className="border-r border-white/10 px-4 py-3">Topo Mesh / V2</div>
        <div className="border-r border-white/10 px-4 py-3">Scroll Indexed Depth</div>
        <div className="px-4 py-3">Precision Geometry Module</div>
      </div>
    </div>
  );
}

export default function AiOsExperience() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineBackRef = useRef<HTMLDivElement>(null);
  const headlineFrontRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const geometrySectionRef = useRef<HTMLElement>(null);
  const gridPlaneRef = useRef<HTMLDivElement>(null);
  const depthCanvasRef = useRef<HTMLDivElement>(null);
  const orbitBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !heroRef.current ||
      !headlineBackRef.current ||
      !headlineFrontRef.current ||
      !panelRef.current ||
      !geometrySectionRef.current ||
      !gridPlaneRef.current ||
      !depthCanvasRef.current ||
      !orbitBadgeRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineBackRef.current,
        { y: 0, opacity: 0.92 },
        {
          y: -132,
          opacity: 0.24,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        headlineFrontRef.current,
        { y: 18, x: 0, opacity: 0.98 },
        {
          y: -62,
          x: 42,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        depthCanvasRef.current,
        { yPercent: 0, scale: 0.96, rotateZ: -2 },
        {
          yPercent: -16,
          scale: 1.08,
          rotateZ: 4,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        panelRef.current,
        { y: 0, rotateX: 0 },
        {
          y: -76,
          rotateX: 8,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.to(orbitBadgeRef.current, {
        yPercent: -16,
        xPercent: 8,
        rotation: 14,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        gridPlaneRef.current,
        { yPercent: -4 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: geometrySectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[#04050a] text-[var(--aios-text)]" style={{ ["--aios-text" as string]: brandPalette.text }}>
      <section ref={heroRef} className="relative min-h-screen overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(143,20,216,0.24),transparent_28%),radial-gradient(circle_at_88%_16%,rgba(88,215,247,0.20),transparent_26%),linear-gradient(180deg,#04050a_0%,#070913_35%,#090b14_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(173,186,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(173,186,255,0.10)_1px,transparent_1px)] bg-[size:72px_72px] opacity-45" />
        <div className="absolute inset-x-0 top-0 z-40 border-b border-white/10 bg-[rgba(4,5,10,0.86)] backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr]">
            <div className="flex flex-wrap border-b border-white/10 lg:border-b-0 lg:border-r lg:border-white/10">
              <TimeZoneClock city="BHZ" timeZone="America/Sao_Paulo" />
              <TimeZoneClock city="LON" timeZone="Europe/London" />
              <TimeZoneClock city="NYC" timeZone="America/New_York" />
            </div>
            <div className="flex items-center justify-between px-4 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-white/52">
              <span>AI / OS Interface · Prototype 01</span>
              <span className="hidden sm:inline">Data · Inovação · Engenharia Matemática</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 container grid min-h-screen grid-cols-1 pt-24 lg:grid-cols-[88px_minmax(0,1fr)] lg:pt-20">
          <aside className="hidden border-r border-white/10 lg:block">
            <div className="sticky top-20 flex h-[calc(100vh-5rem)] flex-col justify-between py-6">
              <div className="space-y-px border-y border-white/10">
                {["HOME", "GEOMETRIA", "VISION", "MARÉS", "CONTATO"].map((item, index) => (
                  <div
                    key={item}
                    className="flex h-14 items-center justify-center border-b border-white/10 font-mono text-[11px] tracking-[0.32em] text-white/56 last:border-b-0 [writing-mode:vertical-rl] [transform:rotate(180deg)]"
                    style={{ color: index % 2 === 0 ? "rgba(198, 168, 255, 0.72)" : "rgba(88, 215, 247, 0.66)" }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="space-y-px border-y border-white/10">
                <div className="flex h-14 items-center justify-center border-b border-white/10 text-white">
                  <Menu className="size-4" />
                </div>
                <div className="flex h-14 items-center justify-center text-white/65">
                  <Crosshair className="size-4" />
                </div>
              </div>
            </div>
          </aside>

          <div className="relative grid min-h-screen grid-cols-1 lg:grid-cols-[minmax(0,1.12fr)_minmax(300px,0.88fr)]">
            <div className="relative flex min-h-[78vh] items-end border-b border-white/10 pb-10 pt-16 sm:pb-14 lg:min-h-screen lg:border-b-0 lg:border-r lg:border-white/10 lg:pt-24">
              <div ref={depthCanvasRef} className="absolute inset-0">
                <HeroDepthCanvas />
              </div>

              <div className="relative z-10 w-full">
                <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-white/55">
                  <span className="inline-block h-px w-16 bg-[linear-gradient(90deg,#8f14d8,#58d7f7)]" style={{ backgroundImage: "linear-gradient(90deg, #8f14d8, #58d7f7)" }} />
                  Sistema operacional moderno de IA
                </div>

                <div ref={headlineBackRef} className="relative z-10">
                  <HeroHeadlineLines mode="back" />
                </div>

                <div ref={headlineFrontRef} className="pointer-events-none absolute inset-x-0 bottom-[3.8rem] z-30 hidden lg:block">
                  <HeroHeadlineLines mode="front" className="translate-x-[6%]" />
                </div>

                <div className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
                  <p className="max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                    Um protótipo institucional orientado por interface AI/OS: tipografia monumental, grid matemático, clocks operacionais, coordenadas de tela e módulos técnicos guiados por scroll.
                  </p>
                  <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/48">[ Z-Depth / Scroll / System Layers ]</div>
                </div>

                <div className="mt-10 flex flex-wrap gap-px border border-white/10 bg-white/8">
                  {[
                    "IA / Innovation Stack",
                    "Operational Intelligence",
                    "Mathematical Systems",
                    "Data-Led Interfaces",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="px-5 py-4 font-mono text-[11px] uppercase tracking-[0.26em] text-white/76"
                      style={{
                        background:
                          index % 2 === 0
                            ? "linear-gradient(180deg, rgba(143,20,216,0.20), rgba(8,9,18,0.82))"
                            : "linear-gradient(180deg, rgba(88,215,247,0.14), rgba(8,9,18,0.82))",
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div
                ref={orbitBadgeRef}
                className="pointer-events-none absolute right-[6%] top-[18%] z-30 hidden h-28 w-28 rounded-full border lg:block"
                style={{
                  borderColor: "rgba(88, 215, 247, 0.5)",
                  boxShadow: "0 0 0 1px rgba(143,20,216,0.22), inset 0 0 28px rgba(88,215,247,0.12)",
                }}
              >
                <div className="absolute inset-2 rounded-full border border-white/10" />
                <div className="absolute left-1/2 top-1/2 h-px w-16 -translate-x-1/2 -translate-y-1/2 bg-[rgba(198,168,255,0.9)]" />
                <div className="absolute left-1/2 top-1/2 h-16 w-px -translate-x-1/2 -translate-y-1/2 bg-[rgba(88,215,247,0.9)]" />
              </div>
            </div>

            <div ref={panelRef} className="relative z-30 flex min-h-[45vh] flex-col justify-between py-12 sm:py-16 lg:min-h-screen lg:py-24">
              <div className="grid gap-px border border-white/10 bg-white/8">
                {[
                  ["COORD", "X 091 · Y 144 · Z 002"],
                  ["FOCUS", "GEOSPATIAL / DATA / AI"],
                  ["STATE", "INTERACTION LAYER STANDBY"],
                ].map(([label, value], index) => (
                  <div key={label} className="grid grid-cols-[92px_1fr] bg-[rgba(10,12,22,0.9)]">
                    <div className="border-r border-white/10 px-4 py-4 font-mono text-[10px] uppercase tracking-[0.26em] text-white/45">{label}</div>
                    <div
                      className="px-4 py-4 font-mono text-[11px] uppercase tracking-[0.22em]"
                      style={{ color: index === 1 ? brandPalette.cyan : brandPalette.text }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border border-white/10 bg-[linear-gradient(180deg,rgba(143,20,216,0.14),rgba(9,11,20,0.92)_32%,rgba(88,215,247,0.10))] p-6 lg:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">Interface brief</p>
                <p className="mt-4 max-w-md text-2xl leading-tight text-white">
                  A próxima camada inicia com <span style={{ color: brandPalette.lavender }} className="font-semibold">Geometria de Precisão</span>, conectando topografia, polígonos, área calculada e leitura técnica em uma cena tridimensional limpa.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#geometria"
                    className="inline-flex items-center gap-2 border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.26em] text-white transition"
                    style={{
                      borderColor: "rgba(88,215,247,0.35)",
                      background: "linear-gradient(90deg, rgba(143,20,216,0.92), rgba(88,215,247,0.88))",
                    }}
                  >
                    Ver primeiro módulo
                    <MoveRight className="size-4" />
                  </a>
                  <Link href="/giselle" className="inline-flex items-center gap-2 border border-white/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.26em] text-white transition hover:bg-white/10">
                    Voltar ao portfólio atual
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="geometria" ref={geometrySectionRef} className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,#090b14,#060810)]">
        <div ref={gridPlaneRef} className="absolute inset-0 bg-[linear-gradient(rgba(173,186,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(173,186,255,0.08)_1px,transparent_1px)] bg-[size:84px_84px] opacity-55" />
        <div className="relative z-10 container grid gap-px py-10 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
          <div className="border border-white/10 bg-[linear-gradient(180deg,rgba(143,20,216,0.12),rgba(7,9,18,0.96)_18%,rgba(7,9,18,0.98))] p-6 sm:p-8 lg:p-10">
            <div className="border-b border-white/10 pb-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/45">Módulo 01</p>
              <h2 className="mt-4 max-w-[10ch] font-sans text-[clamp(3rem,7vw,6.5rem)] font-black uppercase leading-[0.9] tracking-[-0.06em] text-white">
                Geometria de precisão.
              </h2>
            </div>

            <div className="grid gap-px border-y border-white/10 py-8">
              {[
                ["Área Calculada", "145.23 m²"],
                ["Vértices", "08"],
                ["Conectores", "14 ativos"],
                ["Modo", "GeoSpatial Wireframe"],
              ].map(([label, value], index) => (
                <div key={label} className="grid grid-cols-[140px_1fr] border-b border-white/10 py-3 last:border-b-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/42">{label}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: index === 0 ? brandPalette.cyan : index === 1 ? brandPalette.lavender : brandPalette.text }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <p className="pt-8 text-lg leading-8 text-white/72">
              Nesta primeira transição, a cena 3D é reduzida ao essencial: malhas poligonais, pontos flutuantes, linhas de conexão e labels operacionais. A intenção é construir uma base visual científica, precisa e sem ruído decorativo.
            </p>
          </div>

          <div className="border border-white/10 bg-[rgba(8,10,18,0.96)] p-4 sm:p-5 lg:p-6">
            <GeometryCanvas />
          </div>
        </div>
      </section>
    </main>
  );
}
