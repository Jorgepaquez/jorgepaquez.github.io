// Genera todas las versiones del logo «jp» (SVG y PNG) en logos/.
// Uso: node generar_logos.mjs   (necesita Edge para exportar los PNG)
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const SALIDA = path.join(AQUI, "logos");

export const AZUL = "#1e40af";
export const AMBAR = "#ffb000";
export const NEGRO = "#0e1116";
export const BLANCO = "#ffffff";

// El dibujo: trazo de 28 de grosor. La caja ajustada al logo es 18 19 192 187.
const dibujo = (letras, punto) => `<g fill="none" stroke="${letras}" stroke-width="28" stroke-linejoin="round">
    <path d="M84 70 V166 A26 26 0 0 1 32 166 V160"/>
    <path d="M128 70 V206"/>
    <circle cx="162" cy="118" r="34"/>
  </g>
  <circle cx="84" cy="36" r="17" fill="${punto}"/>`;

const logo = (letras, punto) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="18 19 192 187">
  ${dibujo(letras, punto)}
</svg>
`;

// Ícono: el logo al 72 % centrado en un cuadrado de esquinas redondeadas (radio 22 %).
const icono = (fondo, letras, punto) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
  <rect width="240" height="240" rx="53" fill="${fondo}"/>
  <g transform="translate(37.92 39) scale(0.72)">
  ${dibujo(letras, punto)}
  </g>
</svg>
`;

const ARCHIVOS = {
  // letras + punto
  "jp-azul": logo(AZUL, AMBAR),
  "jp-ambar": logo(AMBAR, BLANCO),
  "jp-blanco": logo(BLANCO, AMBAR),
  "jp-negro": logo(NEGRO, AMBAR),
  // para apoyar sobre ámbar, donde el punto ámbar no se vería
  "jp-azul-punto-blanco": logo(AZUL, BLANCO),
  "jp-negro-punto-blanco": logo(NEGRO, BLANCO),
  "jp-ambar-punto-azul": logo(AMBAR, AZUL),
  // una tinta
  "jp-mono-azul": logo(AZUL, AZUL),
  "jp-mono-ambar": logo(AMBAR, AMBAR),
  "jp-mono-blanco": logo(BLANCO, BLANCO),
  "jp-mono-negro": logo(NEGRO, NEGRO),
  // íconos
  "jp-icono-azul": icono(AZUL, BLANCO, AMBAR),
  "jp-icono-ambar": icono(AMBAR, AZUL, BLANCO),
  "jp-icono-negro": icono(NEGRO, BLANCO, AMBAR),
  "jp-icono-blanco": icono(BLANCO, AZUL, AMBAR),
  // solo para la página de usos incorrectos del manual
  "_error-color": logo("#2f9e6e", "#d9488a"),
};

mkdirSync(SALIDA, { recursive: true });
for (const [nombre, svg] of Object.entries(ARCHIVOS)) writeFileSync(path.join(SALIDA, nombre + ".svg"), svg);

const edge = spawn("C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", [
  "--headless=new", "--disable-gpu", "--remote-debugging-port=9337",
  `--user-data-dir=${path.join(process.env.TEMP, "edge-marca-jp")}`, "about:blank",
]);
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
let destino;
for (let i = 0; i < 40 && !destino; i++) {
  await espera(250);
  try { destino = (await (await fetch("http://127.0.0.1:9337/json")).json()).find((t) => t.type === "page"); } catch {}
}
const ws = new WebSocket(destino.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let n = 0; const pend = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id) pend.get(d.id)?.(d); };
const cdp = (method, params = {}) => new Promise((r) => { pend.set(++n, r); ws.send(JSON.stringify({ id: n, method, params })); });
await cdp("Page.enable");
await cdp("Emulation.setDefaultBackgroundColorOverride", { color: { r: 0, g: 0, b: 0, a: 0 } });
async function png(nombre, ancho, alto, salida) {
  await cdp("Emulation.setDeviceMetricsOverride", { width: ancho, height: alto, deviceScaleFactor: 1, mobile: false });
  await cdp("Page.navigate", { url: "file:///" + path.join(SALIDA, nombre + ".svg").replace(/\\/g, "/").replace(/ /g, "%20") });
  await espera(500);
  const r = await cdp("Page.captureScreenshot", { format: "png" });
  writeFileSync(path.join(SALIDA, (salida || nombre) + ".png"), Buffer.from(r.result.data, "base64"));
}
for (const nombre of Object.keys(ARCHIVOS)) {
  if (nombre.startsWith("_")) continue;
  if (nombre.includes("icono")) await png(nombre, 1024, 1024);
  else await png(nombre, 1536, 1496);
}
for (const lado of [16, 32, 48, 180, 512]) await png("jp-icono-azul", lado, lado, `_favicon-${lado}`);
ws.close(); edge.kill();
console.log("listo:", Object.keys(ARCHIVOS).length, "versiones en", SALIDA);
process.exit(0);
