// Genera las propuestas de logo «JP»: SVG, PNG y una hoja de vista previa.
// Uso: node generar.mjs   (necesita Edge para exportar los PNG)
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const SALIDA = path.join(AQUI, "salida");
const TINTA = "#1c1b19";
const PAPEL = "#faf9f7";
const ACENTO = "#b4532a";
const ACENTO_CLARO = "#e88a5c";

// Cada propuesta recibe el color de las letras y el del acento.
const PROPUESTAS = {
  "1-ligadura": {
    nombre: "Ligadura",
    idea: "La J y la P comparten el mismo trazo vertical. El punto dentro de la P es un lente.",
    svg: (c, a) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-7 9.5 240 240">
  <g fill="none" stroke="${c}" stroke-width="30" stroke-linejoin="round">
    <path d="M124 44 V160 A40 40 0 0 1 44 160 V142"/>
    <path d="M124 59 H142 A40 40 0 0 1 142 139 H124"/>
  </g>
  <circle cx="147" cy="99" r="11" fill="${a}"/>
</svg>`,
  },
  "2-visor": {
    nombre: "Visor",
    idea: "Las iniciales dentro de las esquinas de un visor de cámara.",
    svg: (c, a) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
  <g fill="none" stroke="${a}" stroke-width="7" stroke-linecap="square">
    <path d="M16 44 V16 H44"/><path d="M196 16 H224 V44"/><path d="M224 196 V224 H196"/><path d="M44 224 H16 V196"/>
  </g>
  <g fill="none" stroke="${c}" stroke-width="24" stroke-linejoin="round" transform="translate(8 0)">
    <path d="M96 60 V140 A28 28 0 0 1 40 140 V132"/>
    <path d="M134 60 V180"/>
    <path d="M134 72 H158 A27 27 0 0 1 158 126 H134"/>
  </g>
</svg>`,
  },
  "3-minusculas": {
    nombre: "Minúsculas",
    idea: "«jp» en minúsculas, redondo y cercano. El punto de la j lleva el color.",
    svg: (c, a) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 3 240 240">
  <g fill="none" stroke="${c}" stroke-width="28" stroke-linejoin="round">
    <path d="M84 70 V166 A26 26 0 0 1 32 166 V160"/>
    <path d="M128 70 V206"/>
    <circle cx="162" cy="118" r="34"/>
  </g>
  <circle cx="84" cy="36" r="17" fill="${a}"/>
</svg>`,
  },
};

mkdirSync(SALIDA, { recursive: true });
const tarjetas = [];
for (const [id, p] of Object.entries(PROPUESTAS)) {
  writeFileSync(path.join(SALIDA, `jp-${id}.svg`), p.svg(TINTA, ACENTO) + "\n");
  writeFileSync(path.join(SALIDA, `jp-${id}-negativo.svg`), p.svg(PAPEL, ACENTO_CLARO) + "\n");
  writeFileSync(path.join(SALIDA, `jp-${id}-una-tinta.svg`), p.svg(TINTA, TINTA) + "\n");
  tarjetas.push(`<div class="prop"><h2>${id[0]} · ${p.nombre}</h2><p>${p.idea}</p>
    <div class="fila"><div class="l claro">${p.svg(TINTA, ACENTO)}</div><div class="l oscuro">${p.svg(PAPEL, ACENTO_CLARO)}</div></div>
    <div class="fila chicos"><div class="l claro">${p.svg(TINTA, TINTA)}</div><div class="l acento">${p.svg(PAPEL, PAPEL)}</div>
      <div class="mini claro">${p.svg(TINTA, ACENTO)}<span>JP · Fotografía, software y diseño</span></div></div></div>`);
}
const hoja = `<!DOCTYPE html><html lang="es"><meta charset="utf-8"><style>
  body{margin:0;padding:36px;background:#efece6;font-family:"Segoe UI",sans-serif;color:${TINTA};display:grid;grid-template-columns:repeat(3,1fr);gap:28px;width:1740px;box-sizing:border-box}
  h2{margin:0 0 4px;font-size:22px} p{margin:0 0 14px;font-size:14px;color:#66625c;min-height:40px}
  .fila{display:flex;gap:12px;margin-bottom:12px} .l{flex:1;border-radius:14px;display:flex;align-items:center;justify-content:center;aspect-ratio:1}
  .l svg{width:74%} .claro{background:${PAPEL}} .oscuro{background:${TINTA}} .acento{background:${ACENTO}}
  .chicos .l{flex:none;width:110px} .mini{flex:1;border-radius:14px;display:flex;align-items:center;gap:10px;padding:0 16px;font-size:14px}
  .mini svg{width:34px;flex:none}
</style>${tarjetas.join("")}</html>`;
writeFileSync(path.join(SALIDA, "_hoja.html"), hoja);

// Exportación a PNG con Edge
const edge = spawn("C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", [
  "--headless=new", "--disable-gpu", "--remote-debugging-port=9336",
  `--user-data-dir=${path.join(process.env.TEMP, "edge-logo-jp")}`, "about:blank",
]);
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
let destino;
for (let i = 0; i < 40 && !destino; i++) {
  await espera(250);
  try { destino = (await (await fetch("http://127.0.0.1:9336/json")).json()).find((t) => t.type === "page"); } catch {}
}
const ws = new WebSocket(destino.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let n = 0; const pend = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id) pend.get(d.id)?.(d); };
const cdp = (method, params = {}) => new Promise((r) => { pend.set(++n, r); ws.send(JSON.stringify({ id: n, method, params })); });
const url = (f) => "file:///" + path.join(SALIDA, f).replace(/\\/g, "/").replace(/ /g, "%20");
async function png(origen, salida, ancho, alto, transparente) {
  await cdp("Emulation.setDeviceMetricsOverride", { width: ancho, height: alto, deviceScaleFactor: 1, mobile: false });
  await cdp("Emulation.setDefaultBackgroundColorOverride", transparente ? { color: { r: 0, g: 0, b: 0, a: 0 } } : {});
  await cdp("Page.navigate", { url: url(origen) }); await espera(700);
  const r = await cdp("Page.captureScreenshot", { format: "png" });
  writeFileSync(path.join(SALIDA, salida), Buffer.from(r.result.data, "base64"));
}
await cdp("Page.enable");
for (const id of Object.keys(PROPUESTAS)) {
  await png(`jp-${id}.svg`, `jp-${id}.png`, 1024, 1024, true);
  await png(`jp-${id}-negativo.svg`, `jp-${id}-negativo.png`, 1024, 1024, true);
}
await png("_hoja.html", "vista-previa.png", 1740, 560, false);
ws.close(); edge.kill();
console.log("listo:", SALIDA);
process.exit(0);
