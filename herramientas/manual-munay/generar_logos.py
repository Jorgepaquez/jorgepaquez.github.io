"""Genera las versiones del logo de Munay para el manual de marca.

Parte del logo original (Logo-Munay.jpg, 1079x1079): una M blanca con sombra
sobre un cuadrado violeta. Separa la letra y la sombra del fondo para poder
armar las versiones sobre otros fondos. Deja todo en logos/.
"""
from pathlib import Path

from PIL import Image, ImageChops

AQUI = Path(__file__).parent
FUENTE = Path.home() / "Documents" / "Munay" / "Cotizador" / "Logo-Munay.jpg"
SALIDA = AQUI / "logos"

VIOLETA = (139, 117, 255)
VIOLETA_FUERTE = (111, 85, 242)
SOMBRA = (113, 82, 185)
# Canal verde de cada zona en el original: fondo 115, letra 255, sombra ~82
G_FONDO, G_LETRA, G_SOMBRA = 115, 255, 82


def mascaras():
    g = Image.open(FUENTE).convert("RGB").getchannel("G")
    letra = g.point(lambda v: max(0, min(255, round((v - G_FONDO) * 255 / (G_LETRA - G_FONDO)))))
    sombra = g.point(lambda v: max(0, min(255, round((G_FONDO - v) * 255 / (G_FONDO - G_SOMBRA)))))
    return letra, sombra


def componer(color_letra, color_sombra=None, fondo=None):
    letra, sombra = mascaras()
    img = Image.new("RGBA", letra.size, (fondo + (255,)) if fondo else (0, 0, 0, 0))
    if color_sombra:
        capa = Image.new("RGBA", letra.size, color_sombra[:3] + (0,))
        alfa = sombra if len(color_sombra) == 3 else sombra.point(lambda v: v * color_sombra[3] // 255)
        capa.putalpha(alfa)
        img.alpha_composite(capa)
    capa = Image.new("RGBA", letra.size, color_letra + (0,))
    capa.putalpha(letra)
    img.alpha_composite(capa)
    return img


if __name__ == "__main__":
    SALIDA.mkdir(exist_ok=True)
    Image.open(FUENTE).convert("RGB").save(SALIDA / "principal.png")
    versiones = {
        # letra blanca y sombra translúcida, para apoyar sobre el degradé o una foto
        "blanco-transparente": componer((255, 255, 255), (60, 30, 130, 110)),
        "positivo": componer(VIOLETA, None, (255, 255, 255)),
        "positivo-transparente": componer(VIOLETA),
        "mono-negro": componer((0, 0, 0)),
        "mono-blanco": componer((255, 255, 255)),
        "error-color": componer((255, 255, 255), (20, 110, 60), (47, 158, 110)),
    }
    for nombre, img in versiones.items():
        img.save(SALIDA / f"{nombre}.png")
        print(nombre, img.size)
    letra, sombra = mascaras()
    print("caja de la letra:", letra.point(lambda v: 255 if v > 128 else 0).getbbox())
    print("caja de la sombra:", sombra.point(lambda v: 255 if v > 128 else 0).getbbox())
