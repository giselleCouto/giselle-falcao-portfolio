// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { installEventTracking } from "./eventos";

function pathsEnviados(fetchMock: ReturnType<typeof vi.fn>): string[] {
  return fetchMock.mock.calls.map(([, init]) => JSON.parse(init.body).json.path);
}

describe("installEventTracking", () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  let limpar: () => void;

  beforeEach(() => {
    sessionStorage.clear();
    window.history.pushState({}, "", "/bio?src=instagram&c=bio");
    fetchMock = vi.fn(() => Promise.resolve(new Response("{}")));
    vi.stubGlobal("fetch", fetchMock);
    limpar = installEventTracking();
  });

  afterEach(() => {
    limpar();
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("registra clique em link interno com a página de origem e deduplica", () => {
    document.body.innerHTML = `<a href="/lab?src=instagram&c=bio"><span id="t">Lab</span></a>`;
    document.getElementById("t")!.click();
    document.getElementById("t")!.click();
    expect(pathsEnviados(fetchMock)).toEqual(["/e/clique/bio>/lab"]);
    const corpo = JSON.parse(fetchMock.mock.calls[0][1].body).json;
    expect(corpo.source).toBe("instagram");
    expect(corpo.campaign).toBe("bio");
  });

  it("usa data-cta e host externo como rótulo", () => {
    document.body.innerHTML = `<a data-cta="WhatsApp Consultoria" href="https://wa.me/1">x</a><a href="https://www.linkedin.com/in/a">y</a>`;
    (document.querySelector("[data-cta]") as HTMLElement).click();
    (document.querySelectorAll("a")[1] as HTMLElement).click();
    expect(pathsEnviados(fetchMock)).toEqual([
      "/e/clique/bio>whatsapp-consultoria",
      "/e/clique/bio>linkedin.com",
    ]);
  });

  it("marca início e envio de formulário uma vez por página", () => {
    document.body.innerHTML = `<form><input id="n" /><input id="e" /></form>`;
    document.getElementById("n")!.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    document.getElementById("e")!.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    document.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    expect(pathsEnviados(fetchMock)).toEqual(["/e/form-inicio/bio", "/e/form-envio/bio"]);
  });

  it("ignora âncoras da mesma página", () => {
    document.body.innerHTML = `<a href="#candidatura">ir</a>`;
    document.querySelector("a")!.click();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
