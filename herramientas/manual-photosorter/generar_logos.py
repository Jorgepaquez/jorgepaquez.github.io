"""Reconstruye el logo de PhotoSorter en alta resolución para el manual de marca.

El logo fuente mide 287x410 px. El marco y el broche son formas simples y se
redibujan con sus medidas originales; el monograma «PS» se amplía y se
suaviza a partir del original. Genera las versiones en logos/.
"""
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter

AQUI = Path(__file__).parent
FUENTE = Path.home() / "Documents" / "Photosorter" / "Photosorter" / "src" / "photosorter" / "resources" / "source" / "Logo-Photosorter.png"
SALIDA = AQUI / "logos"

ESCALA = 8          # tamaño final respecto del original
SUPER = 2           # sobremuestreo para bordes suaves
CAJA = (40, 25, 248, 385)   # zona ocupada por la marca en el original

MAGENTA = (190, 11, 95)
NEGRO = (0, 0, 0)
GRAFITO = (42, 42, 42)
CLARO = (242, 245, 248)
BLANCO = (255, 255, 255)
FONDO_APP = (7, 17, 31)


def mascara_letras(k):
    """Máscara del monograma ampliada k veces, con el borde suavizado."""
    src = Image.open(FUENTE).convert("RGBA")
    alfa = src.getchannel("A")
    r, g, b, _ = src.split()
    oscuro = ImageChops.invert(ImageChops.lighter(ImageChops.lighter(r, g), b))
    letras = ImageChops.multiply(alfa, oscuro)
    interior = Image.new("L", src.size, 0)
    interior.paste(letras.crop((54, 81, 234, 368)), (54, 81))
    grande = interior.resize((src.width * k, src.height * k), Image.BICUBIC)
    grande = grande.filter(ImageFilter.GaussianBlur(k * 0.45))
    return grande.point(lambda v: 255 if v > 128 else 0)


def dibujar(color_letras, color_marco, color_broche, fondo=None):
    k = ESCALA * SUPER
    lienzo = Image.new("RGBA", (287 * k, 410 * k), (0, 0, 0, 0))
    d = ImageDraw.Draw(lienzo)
    e = lambda *v: [round(n * k) for n in v]

    # Marco doble: trazo de 2 px en el original
    d.rectangle(e(40, 64, 248, 385), outline=color_marco, width=2 * k)
    d.rectangle(e(50, 77, 238, 372), outline=color_marco, width=2 * k)

    lienzo.paste(Image.new("RGBA", lienzo.size, color_letras + (255,)), (0, 0), mascara_letras(k))

    # Broche: cuerpo y, encima, el resorte como contorno más claro
    d.rounded_rectangle(e(135, 25, 151, 105), radius=round(1.6 * k), fill=color_broche)
    tinte = tuple(round(c + (255 - c) * 0.55) for c in color_broche) if color_broche != color_letras else None
    if tinte:
        capa = Image.new("RGBA", lienzo.size, (0, 0, 0, 0))
        ImageDraw.Draw(capa).rounded_rectangle(e(133, 51, 155, 78), radius=round(1.2 * k), outline=tinte + (215,), width=round(1.3 * k))
        lienzo.alpha_composite(capa)
    else:
        d.rounded_rectangle(e(133, 51, 155, 78), radius=round(1.2 * k), outline=color_broche, width=round(1.3 * k))

    marca = lienzo.crop(e(*CAJA))
    marca = marca.resize((marca.width // SUPER, marca.height // SUPER), Image.LANCZOS)
    if fondo:
        base = Image.new("RGBA", marca.size, fondo + (255,))
        base.alpha_composite(marca)
        marca = base
    return marca


def icono(marca, lado=1024):
    """Ícono de aplicación: marca en negativo sobre cuadrado redondeado (radio 22 %, margen 12 %)."""
    k = 2
    lienzo = Image.new("RGBA", (lado * k, lado * k), (0, 0, 0, 0))
    ImageDraw.Draw(lienzo).rounded_rectangle((0, 0, lado * k - 1, lado * k - 1), radius=round(lado * k * 0.22), fill=FONDO_APP + (255,))
    util = lado * k * (1 - 2 * 0.12)
    f = min(util / marca.width, util / marca.height)
    m = marca.resize((round(marca.width * f), round(marca.height * f)), Image.LANCZOS)
    lienzo.alpha_composite(m, ((lado * k - m.width) // 2, (lado * k - m.height) // 2))
    return lienzo.resize((lado, lado), Image.LANCZOS)


if __name__ == "__main__":
    SALIDA.mkdir(exist_ok=True)
    versiones = {
        "positivo": dibujar(NEGRO, GRAFITO, MAGENTA),
        "negativo": dibujar(CLARO, CLARO, MAGENTA),
        "mono-negro": dibujar(NEGRO, NEGRO, NEGRO),
        "mono-blanco": dibujar(BLANCO, BLANCO, BLANCO),
        "error-broche-verde": dibujar(NEGRO, GRAFITO, (30, 160, 90)),
    }
    for nombre, img in versiones.items():
        img.save(SALIDA / f"{nombre}.png")
        print(nombre, img.size)
    icono(versiones["negativo"]).save(SALIDA / "icono.png")

    letras = mascara_letras(1).crop(CAJA)
    print("caja de la marca (px del original):", CAJA[2] - CAJA[0], "x", CAJA[3] - CAJA[1])
    print("caja de las letras dentro de la marca:", letras.getbbox())
