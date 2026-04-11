import { experienceTimeline, projects, publications } from "./portfolioData";

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
    expect(logisticsProject?.approach.pt).toContain("API Type 4");
    expect(logisticsProject?.approach.pt).toContain("Gantt interativo");
    expect(logisticsProject?.impact.pt).toContain("USD 96 mil por mês");
    expect(logisticsProject?.impact.pt).toContain("60% para 87%");
    expect(logisticsProject?.impact.pt).toContain("22%");
    expect(logisticsProject?.stack).toContain("multitenancy");
    expect(logisticsExperience?.focus.pt).toContain("roteirização naval");
    expect(logisticsExperience?.focus.pt).toContain("SVG");
  });
});
