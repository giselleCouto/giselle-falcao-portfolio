import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("site favicon", () => {
  it("declara o favicon PNG no HTML base", () => {
    const indexHtmlPath = path.resolve(import.meta.dirname, "..", "index.html");
    const faviconPath = path.resolve(import.meta.dirname, "..", "public", "favicon.png");
    const indexHtml = readFileSync(indexHtmlPath, "utf8");

    expect(existsSync(faviconPath)).toBe(true);
    expect(indexHtml).toContain('<link rel="icon" type="image/png" href="/favicon.png" />');
    expect(indexHtml).toContain('<link rel="apple-touch-icon" href="/favicon.png" />');
  });
});
