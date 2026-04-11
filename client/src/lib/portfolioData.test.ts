import { describe, expect, it } from "vitest";

import { contact, experienceTimeline, projects, publications } from "./portfolioData";

describe("portfolio publications", () => {
  it("expõe links públicos e DOI para todas as publicações listadas", () => {
    expect(publications.length).toBeGreaterThan(0);

    for (const publication of publications) {
      expect(publication.link).toMatch(/^https?:\/\//);
      expect(publication.doi).toMatch(/^https:\/\/doi\.org\//);
      expect(publication.title.pt.length).toBeGreaterThan(10);
      expect(publication.venue.pt.length).toBeGreaterThan(5);
    }
  });
});

describe("portfolio logistics experience", () => {
  it("expõe o case logístico com métricas e vocabulário técnico no portfólio", () => {
    const logisticsProject = projects.find(project => project.category === "Logística");
    const logisticsExperience = experienceTimeline.find(item => item.org === "Logística marítima e otimização operacional");

    expect(logisticsProject).toBeDefined();
    expect(logisticsExperience).toBeDefined();

    expect(logisticsProject?.title.pt).toContain("VRP");
    expect(logisticsProject?.approach.pt).toContain("meta-heurística");
    expect(logisticsProject?.approach.pt).toContain("APIs Type 4");
    expect(logisticsProject?.approach.pt).toContain("Gantt interativo");
    expect(logisticsProject?.impact.pt).toContain("USD 96 mil por mês");
    expect(logisticsProject?.impact.pt).toContain("60% para 87%");
    expect(logisticsProject?.impact.pt).toContain("22%");
    expect(logisticsProject?.stack).toContain("multitenancy");
    expect(logisticsExperience?.focus.pt).toContain("roteirização naval");
    expect(logisticsExperience?.focus.pt).toContain("SVG");
  });
});

describe("portfolio featured projects curation", () => {
  it("remove os cases internos solicitados e preserva o novo case do Wealthy Audit Flow AI", () => {
    const projectTitlesPt = projects.map(project => project.title.pt);

    expect(projectTitlesPt).not.toContain("SEO básico por rota e integração institucional de presença digital");
    expect(projectTitlesPt).not.toContain("Captação de leads com persistência em banco e notificações internas ao proprietário");
    expect(projectTitlesPt).not.toContain("Persona Jade com posicionamento próprio e coerência de marca-mãe");
    expect(projectTitlesPt).not.toContain("Portfólio premium de Giselle para autoridade científica, IA, educação e modelagem");
    expect(projectTitlesPt).not.toContain("Hub Couto Falcão com seletor de identidades e arquitetura editorial por rota");

    const wealthyProject = projects.find(
      project => project.title.pt === "Wealthy Audit Flow AI / AuditMed para auditoria de contas médicas e recuperação de glosas",
    );

    expect(wealthyProject).toBeDefined();
    expect(wealthyProject?.sector.pt).toBe("Auditoria médica e recuperação financeira");
    expect(wealthyProject?.stack).toContain("Base44");
    expect(wealthyProject?.link).toBe("https://wealthy-audit-flow-ai.base44.app");
    expect(wealthyProject?.tags).toContain("multi-tenant");
    expect(wealthyProject?.tags).toContain("TISS/TUSS");
  });

  it("não expõe currículo como link do portfólio, mantendo apenas canais profissionais e acadêmicos", () => {
    const contactLabels = contact.links.map(link => link.label);

    expect(contactLabels).not.toContain("CV");
    expect(contactLabels).toContain("LinkedIn");
    expect(contactLabels).toContain("Google Scholar");
    expect(contactLabels).toContain("Lattes");
  });
});
