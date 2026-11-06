// Exporta cada escena de mockups.html a assets/img/diseno/<marca>/mockup-N.jpg
// (los de software usan data-salida="../software/<proyecto>/mockup-N").
// Uso: node generar.mjs [filtro]   (necesita Edge). Antes, una vez: python preparar_recursos.py
// Con filtro solo exporta las escenas cuya salida lo contiene, p. ej. node generar.mjs markdown
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const DESTINO = path.join(AQUI, "..", "..", "assets", "img", "diseno");
const FILTRO = process.argv[2];
const edge = spawn("C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", [
  "--headless=new", "--disable-gpu", "--remote-debugging-port=9338",
  `--user-data-dir=${path.join(process.env.TEMP, "edge-mockups")}`, "about:blank",
]);
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
let pag;
for (let i = 0; i < 40 && !pag; i++) {
  await espera(250);
  try { pag = (await (await fetch("http://127.0.0.1:9338/json")).json()).find((t) => t.type === "page"); } catch {}
}
const ws = new WebSocket(pag.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let n = 0; const pend = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id) pend.get(d.id)?.(d); };
const cdp = (method, params = {}) => new Promise((r) => { pend.set(++n, r); ws.send(JSON.stringify({ id: n, method, params })); });
const js = async (e) => (await cdp("Runtime.evaluate", { expression: e, returnByValue: true })).result.result.value;

await cdp("Page.enable");
await cdp("Emulation.setDeviceMetricsOverride", { width: 1600, height: 1067, deviceScaleFactor: 1, mobile: false });
await cdp("Page.navigate", { url: "file:///" + path.join(AQUI, "mockups.html").replace(/\\/g, "/").replace(/ /g, "%20") });
await espera(3000);
const rotas = await js("[...document.images].filter(i => !i.naturalWidth).map(i => i.getAttribute('src'))");
if (rotas.length) console.log("IMÁGENES ROTAS:", rotas);
const todas = await js("[...document.querySelectorAll('.escena')].map(e => ({ salida: e.dataset.salida, y: e.offsetTop }))");
const escenas = todas.filter((e) => !FILTRO || e.salida.includes(FILTRO));
for (const e of escenas) {
  const r = await cdp("Page.captureScreenshot", {
    format: "jpeg", quality: 88, captureBeyondViewport: true,
    clip: { x: 0, y: e.y, width: 1600, height: 1067, scale: 1 },
  });
  const archivo = path.join(DESTINO, e.salida + ".jpg");
  mkdirSync(path.dirname(archivo), { recursive: true });
  writeFileSync(archivo, Buffer.from(r.result.data, "base64"));
}
ws.close(); edge.kill();
console.log(escenas.length, "mockups en", DESTINO);
process.exit(0);
