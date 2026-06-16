import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line, OrbitControls } from "@react-three/drei";
import { Link } from "wouter";
import { ArrowUpRight, Crosshair, Menu, MoveRight } from "lucide-react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

type TimeZoneClockProps = {
  city: string;
  timeZone: string;
};

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
    <div className="grid gap-1 border-r border-black/10 px-4 py-3 last:border-r-0 sm:min-w-[150px]">
      <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-black/45">{city}</span>
      <span className="font-mono text-sm tracking-[0.22em] text-black">{time}</span>
    </div>
  );
}

function GeometryRig() {
  const group = useRef<THREE.Group>(null);
  const pulse = useRef(0);

  const layers = useMemo(() => {
    return [1.1, 1.45, 1.8].map((radius, index) => {
      const points = Array.from({ length: 7 + index }, (_, pointIndex) => {
        const angle = (pointIndex / (7 + index)) * Math.PI * 2;
        return new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * (0.7 + index * 0.12),
          (pointIndex % 2 === 0 ? 1 : -1) * 0.08 * index,
        );
      });
      points.push(points[0]);
      return points;
    });
  }, []);

  const labels = [
    { position: [-1.8, 1.1, 0], text: "ÁREA CALCULADA 145.23 M²" },
    { position: [1.55, 0.5, 0], text: "VÉRTICES 08" },
    { position: [-0.4, -1.5, 0], text: "MALHA GEOESPACIAL" },
  ] as const;

  useFrame((state, delta) => {
    pulse.current += delta * 1.7;

    if (!group.current) return;
    group.current.rotation.y = state.pointer.x * 0.45 + Math.sin(state.clock.elapsedTime * 0.22) * 0.18;
    group.current.rotation.x = state.pointer.y * 0.25 + Math.cos(state.clock.elapsedTime * 0.18) * 0.12;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.12) * 0.04;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.04;
  });

  return (
    <group ref={group}>
      {layers.map((points, index) => (
        <Line
          key={`polygon-${index}`}
          points={points}
          color={index === 1 ? "#000000" : "#5f5f5f"}
          lineWidth={1.1}
          transparent
          opacity={index === 1 ? 0.95 : 0.5}
        />
      ))}

      {Array.from({ length: 14 }).map((_, index) => {
        const angle = (index / 14) * Math.PI * 2;
        const radius = 2.2 + Math.sin(index * 0.8) * 0.18;
        const point = new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.65, Math.sin(angle * 2) * 0.3);

        return (
          <mesh key={`point-${index}`} position={point.toArray()}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.9 - (index % 3) * 0.15} />
          </mesh>
        );
      })}

      {Array.from({ length: 8 }).map((_, index) => {
        const baseAngle = (index / 8) * Math.PI * 2 + pulse.current * 0.02;
        const start = new THREE.Vector3(Math.cos(baseAngle) * 1.1, Math.sin(baseAngle) * 0.92, -0.2);
        const end = new THREE.Vector3(Math.cos(baseAngle) * 2.15, Math.sin(baseAngle) * 1.52, 0.2);

        return <Line key={`connector-${index}`} points={[start, end]} color="#9f9f9f" lineWidth={0.6} transparent opacity={0.45} />;
      })}

      {labels.map((item) => (
        <Html key={item.text} position={item.position as [number, number, number]} center>
          <div className="border border-black/15 bg-[#fafafa]/90 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-black shadow-[0_12px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm">
            {item.text}
          </div>
        </Html>
      ))}
    </group>
  );
}

function GeometryCanvas() {
  return (
    <div className="relative h-[420px] w-full border border-black/10 bg-white">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 34 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#fafafa"]} />
        <ambientLight intensity={1} />
        <GeometryRig />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 grid grid-cols-3 border-t border-black/10 bg-[#fafafa]/90 font-mono text-[10px] uppercase tracking-[0.26em] text-black/50">
        <div className="border-r border-black/10 px-4 py-3">Topo Mesh / V1</div>
        <div className="border-r border-black/10 px-4 py-3">Scroll Indexed Depth</div>
        <div className="px-4 py-3">Precision Geometry Module</div>
      </div>
    </div>
  );
}

export default function AiOsExperience() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const geometrySectionRef = useRef<HTMLElement>(null);
  const gridPlaneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !headlineRef.current || !panelRef.current || !geometrySectionRef.current || !gridPlaneRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        {
          y: -120,
          opacity: 0.22,
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
          y: -70,
          rotateX: 6,
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
    <main className="min-h-screen bg-[#fafafa] text-black">
      <section ref={heroRef} className="relative min-h-screen overflow-hidden border-b border-black/10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.07)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute inset-x-0 top-0 z-30 border-b border-black/10 bg-[#fafafa]/92 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr]">
            <div className="flex flex-wrap border-b border-black/10 lg:border-b-0 lg:border-r">
              <TimeZoneClock city="BHZ" timeZone="America/Sao_Paulo" />
              <TimeZoneClock city="LON" timeZone="Europe/London" />
              <TimeZoneClock city="NYC" timeZone="America/New_York" />
            </div>
            <div className="flex items-center justify-between px-4 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-black/55">
              <span>AI / OS Interface · Prototype 01</span>
              <span className="hidden sm:inline">Data · Inovação · Engenharia Matemática</span>
            </div>
          </div>
        </div>

        <div className="relative z-20 container grid min-h-screen grid-cols-1 pt-24 lg:grid-cols-[88px_minmax(0,1fr)] lg:pt-20">
          <aside className="hidden border-r border-black/10 lg:block">
            <div className="sticky top-20 flex h-[calc(100vh-5rem)] flex-col justify-between py-6">
              <div className="space-y-px border-y border-black/10">
                {[
                  "HOME",
                  "GEOMETRIA",
                  "VISION",
                  "MARÉS",
                  "CONTATO",
                ].map((item) => (
                  <div key={item} className="flex h-14 items-center justify-center border-b border-black/10 font-mono text-[11px] tracking-[0.32em] text-black/60 last:border-b-0 [writing-mode:vertical-rl] [transform:rotate(180deg)]">
                    {item}
                  </div>
                ))}
              </div>

              <div className="space-y-px border-y border-black/10">
                <div className="flex h-14 items-center justify-center border-b border-black/10 text-black">
                  <Menu className="size-4" />
                </div>
                <div className="flex h-14 items-center justify-center text-black/65">
                  <Crosshair className="size-4" />
                </div>
              </div>
            </div>
          </aside>

          <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[minmax(0,1.12fr)_minmax(300px,0.88fr)]">
            <div className="relative flex min-h-[70vh] items-end border-b border-black/10 px-0 pb-10 pt-16 sm:pb-14 lg:min-h-screen lg:border-b-0 lg:border-r lg:pt-24">
              <div ref={headlineRef} className="w-full">
                <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-black/55">
                  <span className="inline-block h-px w-16 bg-black" />
                  Sistema operacional moderno de IA
                </div>
                <h1 className="max-w-[12ch] font-sans text-[clamp(4rem,11vw,10rem)] font-black uppercase leading-[0.88] tracking-[-0.07em] text-black">
                  IA, dados e engenharia para decisões em camadas.
                </h1>
                <div className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
                  <p className="max-w-2xl text-lg leading-8 text-black/72 sm:text-xl">
                    Um protótipo institucional orientado por interface AI/OS: tipografia monumental, grid matemático, clocks operacionais, coordenadas de tela e módulos técnicos guiados por scroll.
                  </p>
                  <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-black/48">
                    [ Z-Depth / Scroll / System Layers ]
                  </div>
                </div>
                <div className="mt-10 flex flex-wrap gap-px border border-black/10 bg-black/10">
                  {[
                    "IA / Innovation Stack",
                    "Operational Intelligence",
                    "Mathematical Systems",
                    "Data-Led Interfaces",
                  ].map((item) => (
                    <div key={item} className="bg-[#fafafa] px-5 py-4 font-mono text-[11px] uppercase tracking-[0.26em] text-black/72">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div ref={panelRef} className="relative flex min-h-[45vh] flex-col justify-between px-0 py-12 sm:py-16 lg:min-h-screen lg:py-24">
              <div className="grid gap-px border border-black/10 bg-black/10">
                {[
                  ["COORD", "X 091 · Y 144 · Z 002"],
                  ["FOCUS", "GEOSPATIAL / DATA / AI"],
                  ["STATE", "INTERACTION LAYER STANDBY"],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[92px_1fr] bg-[#fafafa]">
                    <div className="border-r border-black/10 px-4 py-4 font-mono text-[10px] uppercase tracking-[0.26em] text-black/48">{label}</div>
                    <div className="px-4 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-black/82">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border border-black/10 p-6 lg:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/45">Interface brief</p>
                <p className="mt-4 max-w-md text-2xl leading-tight text-black">
                  A próxima camada inicia com <span className="font-semibold">Geometria de Precisão</span>, conectando topografia, polígonos, área calculada e leitura técnica em uma cena tridimensional limpa.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#geometria" className="inline-flex items-center gap-2 border border-black bg-black px-5 py-3 font-mono text-[11px] uppercase tracking-[0.26em] text-[#fafafa] transition hover:bg-[#1a1a1a]">
                    Ver primeiro módulo
                    <MoveRight className="size-4" />
                  </a>
                  <Link href="/giselle" className="inline-flex items-center gap-2 border border-black/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.26em] text-black transition hover:bg-black hover:text-[#fafafa]">
                    Voltar ao portfólio atual
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="geometria" ref={geometrySectionRef} className="relative overflow-hidden border-b border-black/10">
        <div ref={gridPlaneRef} className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:84px_84px]" />
        <div className="relative z-10 container grid gap-px py-10 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
          <div className="border border-black/10 bg-[#fafafa] p-6 sm:p-8 lg:p-10">
            <div className="border-b border-black/10 pb-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-black/45">Módulo 01</p>
              <h2 className="mt-4 max-w-[10ch] font-sans text-[clamp(3rem,7vw,6.5rem)] font-black uppercase leading-[0.9] tracking-[-0.06em] text-black">
                Geometria de precisão.
              </h2>
            </div>

            <div className="grid gap-px border-y border-black/10 py-8">
              {[
                ["Área Calculada", "145.23 m²"],
                ["Vértices", "08"],
                ["Conectores", "14 ativos"],
                ["Modo", "GeoSpatial Wireframe"],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[140px_1fr] border-b border-black/10 py-3 last:border-b-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-black/45">{label}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-black/90">{value}</span>
                </div>
              ))}
            </div>

            <p className="pt-8 text-lg leading-8 text-black/72">
              Nesta primeira transição, a cena 3D é reduzida ao essencial: malhas poligonais, pontos flutuantes, linhas de conexão e labels operacionais. A intenção é construir uma base visual científica, precisa e sem ruído decorativo.
            </p>
          </div>

          <div className="border border-black/10 bg-[#f3f3f0] p-4 sm:p-5 lg:p-6">
            <GeometryCanvas />
          </div>
        </div>
      </section>
    </main>
  );
}
