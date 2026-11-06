"""Prepara fotos para las galerías del portfolio.

Uso:
    python herramientas/importar_fotos.py                      -> solo regenera assets/js/fotos.js
    python herramientas/importar_fotos.py <galeria> <carpeta>  -> importa las fotos y regenera

<galeria> es la ruta dentro de assets/img/fotografia, por ejemplo "naturaleza"
o "eventos/street-car-meet-3". Es el mismo valor que va en "galeria" en data.js.

Cada foto se guarda en dos tamaños (ampliada y miniatura), sin metadatos EXIF.
Los originales no se modifican. Requiere Pillow.
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
FOTOGRAFIA = RAIZ / "assets" / "img" / "fotografia"
SALIDA_JS = RAIZ / "assets" / "js" / "fotos.js"
EXTENSIONES = {".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp"}
LADO_GRANDE = 2000
LADO_MINI = 720


def guardar(img, destino, lado, calidad):
    copia = img.copy()
    copia.thumbnail((lado, lado), Image.LANCZOS)
    copia.save(destino, "JPEG", quality=calidad, optimize=True, progressive=True,
               icc_profile=img.info.get("icc_profile"))


def importar(galeria, origen):
    destino = FOTOGRAFIA / galeria
    (destino / "mini").mkdir(parents=True, exist_ok=True)
    existentes = [int(p.stem) for p in destino.glob("*.jpg") if p.stem.isdigit()]
    numero = max(existentes, default=0)
    archivos = sorted(p for p in Path(origen).iterdir() if p.suffix.lower() in EXTENSIONES)
    for i, archivo in enumerate(archivos, 1):
        numero += 1
        with Image.open(archivo) as img:
            # draft() hace que los JPEG grandes se decodifiquen ya reducidos
            img.draft("RGB", (LADO_GRANDE, LADO_GRANDE))
            img = ImageOps.exif_transpose(img).convert("RGB")
            guardar(img, destino / f"{numero:03d}.jpg", LADO_GRANDE, 84)
            guardar(img, destino / "mini" / f"{numero:03d}.jpg", LADO_MINI, 78)
        print(f"[{galeria}] {i}/{len(archivos)} {archivo.name}", flush=True)


def regenerar_indice():
    indice = {}
    for carpeta in sorted(p for p in FOTOGRAFIA.rglob("*") if p.is_dir() and p.name != "mini"):
        fotos = []
        for foto in sorted(carpeta.glob("*.jpg")):
            with Image.open(foto) as img:
                ancho, alto = img.size
            base = foto.parent.relative_to(RAIZ).as_posix()
            mini = foto.parent / "mini" / foto.name
            fotos.append({
                "src": f"{base}/{foto.name}",
                "mini": f"{base}/mini/{foto.name}" if mini.exists() else f"{base}/{foto.name}",
                "w": ancho,
                "h": alto,
            })
        if fotos:
            indice[carpeta.relative_to(FOTOGRAFIA).as_posix()] = fotos
    SALIDA_JS.write_text(
        "// Archivo generado por herramientas/importar_fotos.py. No editar a mano.\n"
        "window.FOTOS = " + json.dumps(indice, indent=1) + ";\n",
        encoding="utf-8",
    )
    for clave, fotos in indice.items():
        print(f"{clave}: {len(fotos)} fotos")


if __name__ == "__main__":
    if len(sys.argv) == 3:
        importar(sys.argv[1], sys.argv[2])
    elif len(sys.argv) != 1:
        sys.exit(__doc__)
    regenerar_indice()
