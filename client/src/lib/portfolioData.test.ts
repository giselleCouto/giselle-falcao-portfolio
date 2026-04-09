import { describe, expect, it } from "vitest";

import { publications } from "./portfolioData";

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
